export type MailtoDraft = {
  readonly to: string
  readonly subject: string
  readonly body: string
  /** Free-text identification of the sender, carried through as-is. */
  readonly from: string
}

/**
 * Builds a `mailto:` URL from a contact-form draft.
 *
 * Every value is escaped with `encodeURIComponent`, not `encodeURI`: the
 * latter leaves `&`, `?` and `=` untouched, so a subject like
 * "Pricing & terms" would truncate the body and inject a bogus parameter.
 */
export function buildMailtoUrl({ to, subject, body, from }: MailtoDraft): string {
  const query = new URLSearchParams({ subject, body, from })

  // URLSearchParams encodes spaces as "+", which mail clients render literally
  // in the subject line; mailto expects percent-encoding.
  return `mailto:${to}?${query.toString().replaceAll('+', '%20')}`
}
