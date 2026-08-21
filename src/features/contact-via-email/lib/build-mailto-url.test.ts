import { describe, expect, it } from 'vitest'

import { buildMailtoUrl } from './build-mailto-url'

describe('buildMailtoUrl', () => {
  it('addresses the message to the given recipient', () => {
    const url = buildMailtoUrl({ to: 'info@pdp.group', subject: 'Hi', body: 'Hello', from: 'Ada' })

    expect(url.startsWith('mailto:info@pdp.group?')).toBe(true)
  })

  it('carries subject, body and sender through', () => {
    const url = buildMailtoUrl({
      to: 'info@pdp.group',
      subject: 'Hi',
      body: 'Hello',
      from: 'Ada',
    })
    const query = new URLSearchParams(url.slice(url.indexOf('?') + 1))

    expect(query.get('subject')).toBe('Hi')
    expect(query.get('body')).toBe('Hello')
    expect(query.get('from')).toBe('Ada')
  })

  it('escapes characters that would otherwise split the query', () => {
    // The regression this guards: `encodeURI` leaves & ? and = untouched, so a
    // subject like this used to truncate the body and inject a parameter.
    const url = buildMailtoUrl({
      to: 'info@pdp.group',
      subject: 'Pricing & terms?',
      body: 'a=1&b=2',
      from: 'Ada',
    })

    expect(url).not.toContain('terms?&')
    const query = new URLSearchParams(url.slice(url.indexOf('?') + 1))
    expect(query.get('subject')).toBe('Pricing & terms?')
    expect(query.get('body')).toBe('a=1&b=2')
  })

  it('percent-encodes spaces rather than using "+"', () => {
    // Mail clients render a literal "+" in the subject line.
    const url = buildMailtoUrl({
      to: 'info@pdp.group',
      subject: 'two words',
      body: 'more words',
      from: 'Ada Lovelace',
    })

    expect(url).toContain('two%20words')
    expect(url).not.toContain('+')
  })

  it('keeps newlines in the body intact', () => {
    const url = buildMailtoUrl({
      to: 'info@pdp.group',
      subject: 'S',
      body: 'line one\nline two',
      from: 'Ada',
    })
    const query = new URLSearchParams(url.slice(url.indexOf('?') + 1))

    expect(query.get('body')).toBe('line one\nline two')
  })
})
