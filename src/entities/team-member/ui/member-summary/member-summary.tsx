import Link from 'next/link'

import { teamMemberPath } from '../../model/routes'
import type { TeamMember } from '../../model/types'

import styles from './member-summary.module.css'

type MemberSummaryProps = {
  readonly member: TeamMember
}

/**
 * One line of the homepage roster: a short introduction ending in a link to
 * the member's full CV.
 */
export function MemberSummary({ member }: MemberSummaryProps) {
  return (
    <div className={styles.about_item}>
      <span>{member.summary}</span>

      <span> </span>

      <Link href={teamMemberPath(member.slug)}>there</Link>

      <span>.</span>
    </div>
  )
}
