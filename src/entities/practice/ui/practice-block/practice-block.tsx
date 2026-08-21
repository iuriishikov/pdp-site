import { Prose } from '@/shared/ui/prose'

import type { Practice } from '../../model/practices'

type PracticeBlockProps = {
  readonly practice: Practice
}

/**
 * One practice: a heading followed by its copy.
 *
 * Emits a fragment, not a wrapper — the enclosing column styles the heading
 * and the copy as siblings via `:nth-child`.
 */
export function PracticeBlock({ practice }: PracticeBlockProps) {
  return (
    <>
      <h1>{practice.title}</h1>

      <Prose blocks={practice.blocks} />
    </>
  )
}
