import type { Metadata } from 'next'

import { findTeamMember, teamMemberPath } from '@/entities/team-member'

import type { TeamMemberPageProps } from '../model/route-params'

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params
  const member = findTeamMember(slug)

  if (member === undefined) {
    return {}
  }

  const path = teamMemberPath(member.slug)

  return {
    title: member.name,
    description: member.seo.description,
    keywords: member.seo.keywords === undefined ? undefined : [...member.seo.keywords],
    alternates: { canonical: path },
    openGraph: {
      title: member.name,
      description: member.seo.ogDescription,
      url: path,
      type: 'profile',
      // Relative — resolved against `metadataBase` from the root layout.
      images: [
        {
          url: member.photo.src,
          width: member.photo.width,
          height: member.photo.height,
          alt: member.seo.ogImageAlt,
        },
      ],
    },
  }
}
