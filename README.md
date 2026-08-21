# PDP — pdp.group

Marketing site for PDP (Performance Development Partners): a homepage and three
team member CV pages.

Next.js 16 · React 19 · TypeScript · pnpm · Feature-Sliced Design · Docker +
Caddy · GitHub Actions.

---

## Getting started

Requires **Node 24** (or ≥ 22.13) and **pnpm 11**. `packageManager` in
`package.json` pins the exact pnpm version, so `corepack enable pnpm` is enough.

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

### Everyday commands

| Command                 | What it does                                                   |
| ----------------------- | -------------------------------------------------------------- |
| `pnpm dev`              | Dev server (Turbopack)                                         |
| `pnpm build`            | Production build                                               |
| `pnpm build:standalone` | Build, then complete the standalone bundle so it can be served |
| `pnpm start`            | Serve the standalone bundle — what the container runs          |
| `pnpm lint`             | ESLint                                                         |
| `pnpm lint:fsd`         | Architecture boundaries (Steiger / Feature-Sliced Design)      |
| `pnpm typecheck`        | `next typegen` then `tsc --noEmit`                             |
| `pnpm test`             | Unit tests (Vitest)                                            |
| `pnpm test:e2e`         | End-to-end tests (Playwright, against the standalone bundle)   |
| `pnpm format`           | Prettier, write                                                |
| `pnpm verify`           | Everything CI runs, in one command                             |

`pnpm start` needs `pnpm build:standalone` first. Plain `next start` is not used
— it is unsupported with `output: 'standalone'`.

---

## Architecture

The project follows [Feature-Sliced Design](https://feature-sliced.design)
(v2.1). Layers may only import from layers **below** them, and only through a
slice's `index.ts`. `pnpm lint:fsd` enforces both rules.

```
app/                        Next.js App Router — routing only, thin re-exports
├── layout.tsx              → src/_app
├── page.tsx                → src/_pages/home
├── team/members/[slug]/    → src/_pages/team-member  (one route, three pages)
├── api/health/route.ts     liveness probe for Docker, Compose and Caddy
├── robots.ts, sitemap.ts   → src/_app/seo
└── not-found.tsx

src/
├── _app/                   App layer: root layout, global styles, base metadata, SEO routes
├── _pages/                 Page compositions
│   ├── home/               hero · story · team · clients  (+ page-local copy in model/)
│   └── team-member/        one slice serving all three member pages
├── widgets/
│   └── site-footer/        on every page: contact routes, form, credits
├── features/
│   ├── contact-via-email/  the mailto contact form
│   └── share-current-page/ share-sheet button with a clipboard fallback
├── entities/
│   ├── team-member/        ★ the team data, types, routes and member UI
│   ├── practice/           the four service practices
│   └── client/             the client logos shown in the marquee
└── shared/
    ├── config/             site identity, canonical URL, contact details
    ├── fonts/              next/font/local declarations
    ├── assets/             fonts (woff2), logos (svg), animations (json)
    ├── lib/                framework-agnostic hooks
    └── ui/                 button · text-field · prose · reveal · marquee · lottie-scene
```

### Where the content lives

All copy is data, in one place per concern. Nothing is hardcoded in a component.

| Content                        | File                                             |
| ------------------------------ | ------------------------------------------------ |
| Team members (all of it)       | `src/entities/team-member/model/team-members.ts` |
| Service practices              | `src/entities/practice/model/practices.ts`       |
| Client logos                   | `src/entities/client/model/clients.ts`           |
| Homepage headline & intro copy | `src/_pages/home/model/intro.ts`                 |
| Contacts, URL, copyright       | `src/shared/config/site.ts`                      |

Adding a team member means adding one object to `team-members.ts`. The page,
its metadata, the homepage roster entry and the sitemap all follow — no route
file to create.

### Two layer names carry an underscore

`src/_app` and `src/_pages` are prefixed because Next.js claims both `app/` and
`pages/` inside `src/`: it would shadow the first and try to route the second.
[The official FSD guide](https://feature-sliced.design/docs/guides/tech/with-nextjs)
prescribes exactly this. Steiger 0.6 does not strip the prefix, so three of its
rules are scoped off for those two directories — see the comments in
`steiger.config.ts`.

---

## Notable technical choices

**Server-first rendering.** Every page is static HTML. Only the butterfly
animation, the scroll-reveal observers, the logo marquee and the contact form
ship JavaScript. Previously the whole tree sat behind a `'use client'` UI-kit
provider, and the homepage was rendered on demand rather than prerendered.

**SVG logos under Turbopack.** Turbopack is the default bundler in Next 16 and
ignores `webpack()` config outright, so the SVGR rule lives in
`turbopack.rules`. It is opt-**in** via a `?component` query rather than
matching every `*.svg`: Turbopack has no `issuer` condition, so a blanket rule
would also rewrite SVGs referenced from CSS `url()` into JavaScript modules —
silently, with a green build and a dead background image.

**Fonts.** Converted from TTF to WOFF2 (58–65 % smaller, glyph-for-glyph
identical) and declared through `next/font/local`, which fingerprints them,
emits preload hints and supplies metric-matched fallbacks. The unused Inter
face was dropped.

**Pinned below latest, deliberately.** Two dependencies are held back because
the newest release breaks the toolchain:

- `typescript@~6.0.3` — TypeScript 7.0 is the Go port and ships no compiler
  API, so `typescript-eslint` throws `does not support TS 7.0` at load and
  linting dies silently. Tracked in typescript-eslint#10940.
- `eslint-config-next` is **not used**. It pins `eslint-plugin-react@7.37.x`,
  which calls the `context.getFilename()` API ESLint 10 removed. Staying on
  ESLint 9 is not an option either — it is past end of life. So
  `eslint.config.mjs` wires `@next/eslint-plugin-next` and the other plugins up
  directly, and keeps the same rule sets.

There is also one dependency override: `zod-validation-error` is pinned to `^4`
because `eslint-plugin-react-hooks` imports a subpath that only exists there.

---

## Deployment

The image is built in GitHub Actions and published to GHCR; the server only
pulls. That keeps build tooling off the production host, makes every deploy
reproducible from a digest, and means a failed build never touches the server.

```
push to main → CI (lint, architecture, types, unit, e2e, build)
             → build image, push to ghcr.io, attest provenance
             → ssh: docker compose pull && up -d --wait
             → verify https://pdp.group/api/health
```

Deploys pin the **digest**, not a tag, so the server runs exactly the image CI
built. `docker compose up -d --wait` blocks on healthchecks, so a broken image
fails the deploy instead of quietly serving errors, and Caddy's
`lb_try_duration` holds requests while the container is swapped.

### One-time server setup

1. Point `pdp.group` and `www.pdp.group` (A/AAAA) at the host, and open ports
   80 and 443 (TCP **and** UDP 443 for HTTP/3).
2. Install Docker Engine ≥ 28 with the Compose plugin.
3. Copy `compose.yaml`, `caddy/Caddyfile` and `.env` into a directory — that
   path becomes the `DEPLOY_PATH` secret.
4. `cp .env.example .env` and fill it in. `ACME_EMAIL` is mandatory: Compose
   refuses to run any command without it.
5. `docker compose up -d --wait`

Certificates are issued automatically on first start and live in the
`caddy_data` volume. Do not delete that volume — re-issuing burns ACME rate
limits.

### Repository secrets and variables

| Secret           | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `DEPLOY_HOST`    | Server hostname or IP                          |
| `DEPLOY_USER`    | SSH user (must be in the `docker` group)       |
| `DEPLOY_SSH_KEY` | Private key for that user                      |
| `DEPLOY_PORT`    | SSH port — optional, defaults to 22            |
| `DEPLOY_PATH`    | Directory holding `compose.yaml` on the server |
| `GHCR_USERNAME`  | GitHub username used to pull from GHCR         |
| `GHCR_PAT`       | Personal access token with `read:packages`     |

`GITHUB_TOKEN` cannot be reused on the server: it is scoped to the workflow run
and expires with it. Hence the separate PAT.

| Variable   | Purpose                                         |
| ---------- | ----------------------------------------------- |
| `SITE_URL` | Public origin — defaults to `https://pdp.group` |

### Building the image locally

```bash
docker build -t pdp-site:local .
docker run --rm -p 3000:3000 pdp-site:local
```

### Manual rollback

Images are tagged with the full commit SHA, so any previous build can be pinned:

```bash
# on the server, in DEPLOY_PATH
sed -i 's|^IMAGE=.*|IMAGE=ghcr.io/iuriishikov/pdp-site:sha-<commit>|' .env
docker compose up -d --wait
```

---

## Hardening still worth doing

- **Pin GitHub Actions by SHA** rather than by major tag. Dependabot is
  configured and can maintain SHA pins.
- **Content-Security-Policy.** Not set: the app currently relies on inline
  styles that a strict policy would need a nonce for.
- **Rate limiting** at Caddy, if the contact form ever gains a backend. Today
  it hands off to `mailto:` and there is nothing to abuse.
