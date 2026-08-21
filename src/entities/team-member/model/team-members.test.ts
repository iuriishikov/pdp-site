import { accessSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { teamMemberPath } from './routes'
import { findTeamMember, teamMembers } from './team-members'

describe('team roster', () => {
  it('has three members', () => {
    expect(teamMembers).toHaveLength(3)
  })

  it('uses unique slugs', () => {
    const slugs = teamMembers.map((member) => member.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('keeps the published URLs stable', () => {
    // These paths are shared publicly. Changing one silently breaks inbound
    // links, so they are asserted verbatim rather than derived.
    expect(teamMembers.map((member) => teamMemberPath(member.slug))).toEqual([
      '/team/members/yelena-baryshnikova',
      '/team/members/irina-kondratova',
      '/team/members/marzhan-nazarova',
    ])
  })

  it('points every portrait at a file that exists in public/', () => {
    for (const member of teamMembers) {
      const file = join(process.cwd(), 'public', member.photo.src)

      expect(() => accessSync(file), `${member.slug}: ${member.photo.src}`).not.toThrow()
    }
  })

  it('gives every member the copy each page needs', () => {
    for (const member of teamMembers) {
      expect(member.name.length, member.slug).toBeGreaterThan(0)
      expect(member.role.length, member.slug).toBeGreaterThan(0)
      expect(member.summary.length, member.slug).toBeGreaterThan(0)
      expect(member.bio.length, member.slug).toBeGreaterThan(0)
      expect(member.seo.description.length, member.slug).toBeGreaterThan(0)
    }
  })

  it('uses an absolute contact URL for every member', () => {
    for (const member of teamMembers) {
      expect(() => new URL(member.contactUrl), member.slug).not.toThrow()
    }
  })

  describe('findTeamMember', () => {
    it('resolves a known slug', () => {
      expect(findTeamMember('irina-kondratova')?.name).toBe('Irina Kondratova')
    })

    it('returns undefined for an unknown slug', () => {
      expect(findTeamMember('nobody')).toBeUndefined()
    })
  })
})
