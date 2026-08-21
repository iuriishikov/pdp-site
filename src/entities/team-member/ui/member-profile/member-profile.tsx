import Image from 'next/image'
import type { ReactNode } from 'react'

import type { TeamMember } from '../../model/types'

import { MemberBio } from './member-bio'
import styles from './member-profile.module.css'

type MemberProfileProps = {
  readonly member: TeamMember
  /**
   * Call-to-action controls rendered under the biography.
   *
   * Injected rather than built here: the actions are interactions, which live
   * on the Features layer, and an entity may not import from a layer above it.
   */
  readonly actions?: ReactNode
}

/**
 * A team member's full page: role, biography, actions and portrait.
 *
 * A server component — only whatever is passed as `actions` ships JavaScript.
 */
export function MemberProfile({ member, actions }: MemberProfileProps) {
  return (
    <article className={styles.container}>
      <div className={styles.about}>
        <h1>{member.role}</h1>

        <div className={styles.bio}>
          <MemberBio blocks={member.bio} />
        </div>

        {actions !== undefined && <div className={styles.contact_buttons}>{actions}</div>}
      </div>

      <div className={styles.worker}>
        <div className={styles.worker_name}>{member.name}</div>

        <div className={styles.worker_photo}>
          <Image
            src={member.photo.src}
            alt={member.photo.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            priority
          />
        </div>
      </div>
    </article>
  )
}
