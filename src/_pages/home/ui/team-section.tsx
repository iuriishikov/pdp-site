import { MemberSummary, teamMembers } from '@/entities/team-member'

import { teamHeading } from '../model/intro'

import styles from './team-section.module.css'

/** The roster, each line linking through to a full CV. */
export function TeamSection() {
  return (
    <div className={styles.about}>
      <h1>{teamHeading}</h1>

      {teamMembers.map((member) => (
        <MemberSummary key={member.slug} member={member} />
      ))}
    </div>
  )
}
