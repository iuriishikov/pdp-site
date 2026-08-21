import type { ProseBlock } from '@/shared/ui/prose'

export type Practice = {
  /** Heading rendered above the copy. */
  readonly title: string
  readonly blocks: readonly ProseBlock[]
}

/**
 * PDP's service practices, in the order they appear on the homepage.
 *
 * The homepage alternates alignment between consecutive blocks, so reordering
 * this list flips which practices sit left and which sit right.
 */
export const practices = [
  {
    title: 'Organizational Effectiveness Practice',
    blocks: [
      {
        kind: 'paragraph',
        emphasis: 'italic',
        value: '«Culture eats strategy for breakfast»  Peter Drucker',
      },
      {
        kind: 'paragraph',
        value:
          'We are engaged in management consulting, including the development and implementation of strategies, increasing government and organizational effectiveness, optimizing organizational structures and management changes. It is important to us to bring value to our clients. We work with our clients to design optimal organizational structures, roles and responsibilities.',
      },
    ],
  },
  {
    title: 'Executive Search Practice',
    blocks: [
      {
        kind: 'span',
        value:
          'Connecting the right people with the right roles drives productivity, happiness and retention. Understand what really motivates your people, and try new ways of hiring to meet your changing business needs. The world has changed. People are struggling to cope with the level of disruption and uncertainty we face every day. And more change is likely to come. We need leaders who can bring us out the other side. Not just so we survive, but so we thrive. We help to hire the right people to the right positions.',
      },
    ],
  },
  {
    title: 'Talent Management Practice',
    blocks: [
      {
        kind: 'span',
        value:
          'We help managers to reveal untapped capability in their people. We work with leaders to remove bureaucracy and create value through a clear and present focus on accountability. And we help organizations build teams and strengthen relationships so that each level adds value, is appropriately rewarded, and contributes to the resilience of the whole. Organizations need to champion and develop the leaders we need now. Inclusive leaders, from diverse backgrounds and perspectives. Game-changers. Implementers. We help organizations better understand people and create the conditions for each leader to unleash their potential.',
      },
    ],
  },
  {
    title: 'Remuniration Practice',
    blocks: [
      {
        kind: 'span',
        value:
          'Our salary research gives your HR team the confidence to create sound compensation structures, determine salary premiums for in-demand work, and implement other important aspects related to employee compensation. No matter the size or scope of your data needs, we can help you understand current salary research trends in the market to set you apart from your competitors.',
      },
    ],
  },
] as const satisfies readonly Practice[]
