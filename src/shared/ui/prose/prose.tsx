import { Fragment } from 'react'

import type { ProseBlock } from './types'

type ProseProps = {
  readonly blocks: readonly ProseBlock[]
}

/**
 * Renders editorial copy.
 *
 * Deliberately returns a fragment with no wrapper element: the surrounding
 * stylesheet targets these blocks with `:nth-child`, so an extra DOM node
 * would shift every selector by one.
 */
export function Prose({ blocks }: ProseProps) {
  return (
    <>
      {blocks.map((block, index) => (
        <Fragment key={index}>
          {block.kind === 'paragraph' ? (
            <p style={block.emphasis === 'italic' ? { fontStyle: 'italic' } : undefined}>
              {block.value}
            </p>
          ) : (
            <span>{block.value}</span>
          )}
        </Fragment>
      ))}
    </>
  )
}
