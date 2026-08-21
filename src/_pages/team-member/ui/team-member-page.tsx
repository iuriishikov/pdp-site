import { notFound } from 'next/navigation'

import { findTeamMember, MemberProfile } from '@/entities/team-member'
import { SharePageButton } from '@/features/share-current-page'
import { Button } from '@/shared/ui/button'

import type { TeamMemberPageProps } from '../model/route-params'

/**
 * A single team member's CV page.
 *
 * One route serves all members; `generateStaticParams` prerenders one HTML
 * file per slug at build time, so this replaces the three hand-written page
 * files without changing any URL.
 */
export async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params
  const member = findTeamMember(slug)

  if (member === undefined) {
    notFound()
  }

  return (
    <MemberProfile
      member={member}
      actions={
        <>
          <Button href={member.contactUrl}>Contact</Button>

          <SharePageButton>Resend</SharePageButton>
        </>
      }
    />
  )
}
