/**
 * Single source of truth for every piece of site-wide, non-visual content:
 * identity, canonical URLs and the contact details rendered in the footer.
 *
 * Anything that appears in more than one place (metadata + markup) lives here
 * so the two can never drift apart.
 */

const DEFAULT_URL = 'https://pdp-consulting.com'

/**
 * Resolves the public origin.
 *
 * Treats an empty or whitespace-only value as unset, not as a valid origin:
 * `docker build` without the corresponding build argument defines the variable
 * as `''`, and `??` would happily accept that — leaving `new URL('')` to throw
 * midway through prerendering. Any trailing slash is dropped so joined paths
 * never double up.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const candidate = configured === undefined || configured === '' ? DEFAULT_URL : configured

  try {
    return new URL(candidate).origin
  } catch {
    return DEFAULT_URL
  }
}

export const siteConfig = {
  name: 'PDP',
  title: 'PDP (Performance Development Partners)',
  description:
    'PDP was created in 2004 and is operating now in 3 continents. More than 20 years we help our clients to make the world a better place by making the structure of their companies and management principals more equitable.',
  /**
   * Public origin. Overridable per environment so preview deployments emit
   * correct absolute URLs in metadata, sitemap and robots.txt.
   */
  url: resolveSiteUrl(),
  ogImage: {
    /** Served from `public/`, so the URL stays stable across deployments. */
    path: '/corporate-photo.jpg',
    width: 2000,
    height: 1333,
    alt: 'PDP (Performance Development Partners)',
  },
  copyright: '©2004-2024 PDP',
  credit: {
    label: 'Site created by S.Y.V',
    href: 'https://t.me/yurrriiiyyy',
  },
} as const

export type PhoneContact = {
  /** Region label shown before the number. */
  readonly region: string
  /** E.164 number, used for the `tel:` href. */
  readonly number: string
}

export const contacts = {
  email: 'info@pdp.group',
  phones: [
    { region: 'N-America', number: '+16147495620' },
    { region: 'Europe', number: '+79057762787' },
    { region: 'Central Asia', number: '+77068415555' },
  ],
} as const satisfies {
  email: string
  phones: readonly PhoneContact[]
}
