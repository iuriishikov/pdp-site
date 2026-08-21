import Link from 'next/link'

import { ContactForm } from '@/features/contact-via-email'
import { contacts, siteConfig } from '@/shared/config'

import styles from './site-footer.module.css'

/**
 * Site-wide footer: contact routes, a message form and site credits.
 *
 * A server component; only the form itself is interactive.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <h1>Contact Us</h1>

      <a href={`mailto:${contacts.email}`} className={styles.footer_email}>
        {contacts.email}
      </a>

      {contacts.phones.map(({ region, number }) => (
        <a key={number} href={`tel:${number}`} className={styles.footer_email}>
          {region} {number}
        </a>
      ))}

      <ContactForm />

      <Link href="/" className={styles.footer_item}>
        Home
      </Link>

      <div className={styles.footer_item}>{siteConfig.copyright}</div>

      <a href={siteConfig.credit.href} className={`${styles.footer_item} ${styles.footer_credit}`}>
        {siteConfig.credit.label}
      </a>
    </footer>
  )
}
