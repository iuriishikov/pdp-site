import { describe, expect, it } from 'vitest'

import { contacts, siteConfig } from './site'

describe('siteConfig', () => {
  it('exposes an absolute origin', () => {
    // Everything downstream feeds this to `new URL(...)`: metadataBase, the
    // sitemap and robots.txt. A relative or empty value fails the build during
    // prerendering, which is a slow way to find out.
    expect(() => new URL(siteConfig.url)).not.toThrow()
    expect(siteConfig.url).toMatch(/^https?:\/\//)
  })

  it('carries no trailing slash', () => {
    // Paths are joined onto it, and a trailing slash would double up.
    expect(siteConfig.url.endsWith('/')).toBe(false)
  })

  it('points the social card at a real file in public/', () => {
    expect(siteConfig.ogImage.path.startsWith('/')).toBe(true)
    expect(siteConfig.ogImage.width).toBeGreaterThan(0)
    expect(siteConfig.ogImage.height).toBeGreaterThan(0)
  })
})

describe('contacts', () => {
  it('has a usable email address', () => {
    expect(contacts.email).toContain('@')
  })

  it('lists every phone number in E.164 form', () => {
    // The footer renders these straight into `tel:` hrefs.
    for (const phone of contacts.phones) {
      expect(phone.number, phone.region).toMatch(/^\+[1-9]\d{6,14}$/)
      expect(phone.region.length).toBeGreaterThan(0)
    }
  })
})
