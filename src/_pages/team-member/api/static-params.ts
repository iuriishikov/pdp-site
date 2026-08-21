import { teamMembers } from '@/entities/team-member'

/**
 * Prerenders one static page per team member at build time.
 *
 * Combined with `dynamicParams = false` in the route, any other slug is a 404
 * rather than an attempt to render an unknown member.
 */
export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }))
}
