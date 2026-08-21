import type { Client } from '../../model/clients'

import styles from './client-logo.module.css'

type ClientLogoProps = {
  readonly client: Client
}

/**
 * One client's logo, sized to the row height.
 *
 * The SVGs carry no text, so each is given `role="img"` and an accessible
 * name; without one, screen readers announce nothing at all here.
 */
export function ClientLogo({ client: { name, Logo } }: ClientLogoProps) {
  return (
    <div className={styles.project_card}>
      <Logo className={styles.project_logo} role="img" aria-label={name} />
    </div>
  )
}
