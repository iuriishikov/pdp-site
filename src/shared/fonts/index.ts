import localFont from 'next/font/local'

/**
 * Self-hosted webfonts.
 *
 * `next/font/local` fingerprints and serves each file from `/_next/static`
 * with an immutable cache header, emits the `@font-face` rule at build time
 * and injects a `<link rel="preload">` for the faces marked `preload`.
 *
 * Each font exposes a CSS custom property so stylesheets can refer to it by
 * name (`font-family: var(--font-martin-mono)`) without knowing the hashed
 * family name Next generates.
 */

/** Body and headings — used on every page, so it is preloaded. */
export const martinMono = localFont({
  src: '../assets/fonts/martin-mono.woff2',
  variable: '--font-martin-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
})

/** The italic display face in the homepage headline. */
export const dmSerifDisplayItalic = localFont({
  src: '../assets/fonts/dm-serif-display-italic.woff2',
  variable: '--font-dm-serif-display-italic',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

/**
 * The upright display face, used only for the name on team member pages.
 * Not preloaded: it would be an unused preload on the homepage.
 */
export const dmSerifDisplayRegular = localFont({
  src: '../assets/fonts/dm-serif-display-regular.woff2',
  variable: '--font-dm-serif-display-regular',
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

/** Every font variable, ready to drop onto a root element's className. */
export const fontVariables = [
  martinMono.variable,
  dmSerifDisplayItalic.variable,
  dmSerifDisplayRegular.variable,
].join(' ')
