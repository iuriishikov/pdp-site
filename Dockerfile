# syntax=docker/dockerfile:1.19
#
# Multi-stage build for the Next.js standalone server.
#
# The final image carries only the traced runtime dependencies — no pnpm store,
# no dev dependencies, no source. Install happens inside the container so
# platform-specific optional binaries (sharp's libvips, the SWC binaries)
# resolve for musl/linux rather than for whatever built the image.

ARG NODE_VERSION=24.14.1
ARG ALPINE_VERSION=3.22

# ---------- base ----------
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Node 24 still bundles corepack; it is removed from Node 25 onwards, so this
# line needs revisiting before moving to a newer base image.
RUN corepack enable pnpm
WORKDIR /app

# ---------- deps ----------
FROM base AS deps
# Copy only the manifests first so this layer survives source-only changes.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* .npmrc* ./
# The cache mount keeps the pnpm store between local builds. It is a no-op on
# GitHub-hosted runners — cache-mount contents live outside the layer
# filesystem and no cache exporter carries them.
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline

# ---------- builder ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Baked into the client bundle at build time, so it has to be present here and
# not only at run time.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
RUN --mount=type=cache,id=next-cache,target=/app/.next/cache \
    pnpm run build

# ---------- runner ----------
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# Bind all interfaces; the default loopback bind is unreachable from outside
# the container.
ENV HOSTNAME=0.0.0.0

# `--ingroup nodejs` matters: without it the user lands in `nogroup`, and the
# group half of the `--chown=nextjs:nodejs` copies below grants nothing.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nextjs

# `output: 'standalone'` emits server.js, package.json and a traced
# node_modules — but never `public/` or `.next/static`, which are copied
# separately below. The destination paths are exact: the server resolves
# static assets relative to its own directory.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Alpine has busybox wget but no curl; Node's own fetch avoids depending on
# either, and on a shell.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "server.js"]
