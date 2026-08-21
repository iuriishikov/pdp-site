'use client'

import { useState } from 'react'

import { contacts } from '@/shared/config'
import { Button } from '@/shared/ui/button'
import { TextField } from '@/shared/ui/text-field'

import { buildMailtoUrl } from '../lib/build-mailto-url'

import styles from './contact-form.module.css'

/**
 * Composes a message and hands it to the visitor's mail client.
 *
 * Nothing is sent from the browser — there is no backend — so this is a
 * `mailto:` handoff. Navigating rather than `window.open`ing avoids popup
 * blockers and leaves the site in the current tab.
 */
export function ContactForm() {
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const isComplete = author !== '' && subject !== '' && body !== ''

  function sendEmail() {
    window.location.href = buildMailtoUrl({
      to: contacts.email,
      subject,
      body,
      from: author,
    })
  }

  return (
    <div className={styles.contact_form}>
      <TextField
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        placeholder="Who are you?"
      />

      <TextField
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        placeholder="Subject"
      />

      <TextField
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Text"
        multiline
      />

      <Button onClick={sendEmail} disabled={!isComplete}>
        Send
      </Button>
    </div>
  )
}
