import type { MetadataRoute } from 'next'

import { teamMemberPath, teamMembers } from '@/entities/team-member'
import { siteConfig } from '@/shared/config'

/**
 * Enumerates every route on the site.
 *
 * Built from the team roster rather than a hand-written list, so adding a
 * member cannot leave the sitemap stale.
 */
export function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...teamMembers.map((member) => ({
      url: new URL(teamMemberPath(member.slug), siteConfig.url).toString(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ]
}
