import type { ProseBlock } from '@/shared/ui/prose'

/**
 * The headline above the fold, split into runs so alternate runs can be set
 * in the italic display face.
 *
 * Spacing is carried inside the strings rather than added between them, which
 * is how the original markup read.
 */
export const headlineRuns = [
  { text: 'We ', style: 'italic' },
  { text: ' want to influence ', style: 'regular' },
  { text: 'positive ', style: 'italic' },
  { text: 'change in the world', style: 'regular' },
] as const satisfies readonly { text: string; style: 'italic' | 'regular' }[]

/** Trailing space is intentional — it is in the rendered heading today. */
export const introTitle = 'PDP (Performance Development Partners) '

export const introBlocks = [
  {
    kind: 'paragraph',
    value:
      'was created in 2004 and is operating now in 3 continents. More than 20 years we help our clients to make the world a better place by making the structure of their companies and management principals more equitable.',
  },
  {
    kind: 'paragraph',
    value:
      'We are a values-driven organization and work to meet the highest professional and ethical standards.',
  },
  {
    kind: 'paragraph',
    value:
      'We want to influence positive change in the world and help our clients in a rapidly changing world. We accelerate sustainable and inclusive growth and help our clients create meaningful and lasting change. Our mission is to help organizations, teams and people unlock their potential and achieve outstanding results.',
  },
] as const satisfies readonly ProseBlock[]

export const practicesHeading = 'PRACTISES'
export const teamHeading = 'Our team'
export const clientsHeading = 'Our clients'
