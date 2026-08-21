'use client'

import type { ChangeEventHandler } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import styles from './text-field.module.css'

type TextFieldProps = {
  readonly value: string
  readonly onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  /** Doubles as the accessible name — the design has no visible labels. */
  readonly placeholder: string
  /** Render an auto-growing textarea instead of a single-line input. */
  readonly multiline?: boolean
  readonly name?: string
  readonly required?: boolean
}

/**
 * Underlined text input used by the contact form.
 *
 * The design deliberately shows no labels, so the placeholder is mirrored into
 * `aria-label` to keep the field announced by screen readers.
 */
export function TextField({
  value,
  onChange,
  placeholder,
  multiline = false,
  name,
  required,
}: TextFieldProps) {
  const shared = {
    value,
    placeholder,
    'aria-label': placeholder,
    name,
    required,
    className: styles.native_input,
  }

  return (
    <div className={styles.container}>
      {multiline ? (
        <TextareaAutosize {...shared} onChange={onChange} />
      ) : (
        <input {...shared} type="text" onChange={onChange} />
      )}
    </div>
  )
}
