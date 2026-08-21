/**
 * The canonical URL of a team member's page.
 *
 * These paths are shared publicly, so the shape is fixed and must not change.
 * Deriving it here keeps the homepage links, the sitemap and
 * `generateStaticParams` from drifting apart.
 */
export function teamMemberPath(slug: string): string {
  return `/team/members/${slug}`
}
