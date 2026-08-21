import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /**
   * Emit a self-contained server bundle with only the traced dependencies.
   * The Dockerfile copies `.next/standalone` and runs `server.js` from it.
   */
  output: 'standalone',

  /** Strip the `X-Powered-By: Next.js` response header. */
  poweredByHeader: false,

  /** Serve `/about` and `/about/` as one canonical URL. */
  trailingSlash: false,

  turbopack: {
    /**
     * SVG imports.
     *
     * Turbopack is the default bundler from Next 16 on and ignores `webpack()`
     * config outright, so the previous `@svgr/webpack` rule had to move here.
     *
     * The rule is opt-IN via a `?component` query rather than matching every
     * `*.svg`. Turbopack has no `issuer` condition, so a blanket rule would
     * also rewrite SVGs referenced from CSS `url()` into JavaScript modules —
     * silently, with a successful build and a broken background image. Opting
     * in leaves `next/image` and CSS handling of `.svg` untouched.
     *
     * `as: '*.js'` is required: without it Turbopack feeds SVGR's JavaScript
     * output back into the static-image pipeline and the build fails with
     * "Source code does not contain a <svg> root element".
     */
    rules: {
      '*.svg': {
        condition: {
          all: [{ not: 'foreign' }, { query: /(^|[?&])component(&|$)/ }],
        },
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              titleProp: true,
              ref: true,
              // The logos size themselves from CSS (`height` + `width: auto`),
              // so baked-in width/height attributes would fight the stylesheet.
              dimensions: false,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    // Without viewBox the logos cannot scale at all.
                    params: { overrides: { removeViewBox: false } },
                  },
                ],
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },

  images: {
    // Modern formats first; both are widely supported by the browser floor
    // Next 16 targets.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
