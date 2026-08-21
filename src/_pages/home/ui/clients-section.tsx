import { ClientLogo, clients } from '@/entities/client'
import { Marquee } from '@/shared/ui/marquee'

import { clientsHeading } from '../model/intro'

import styles from './clients-section.module.css'

/** Client logos scrolling continuously across the page. */
export function ClientsSection() {
  return (
    <div className={styles.projects}>
      <h1>{clientsHeading}</h1>

      <Marquee speed={100}>
        {clients.map((client) => (
          <ClientLogo key={client.name} client={client} />
        ))}
      </Marquee>
    </div>
  )
}
