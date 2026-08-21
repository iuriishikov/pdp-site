import { Fragment } from 'react'

import type { BioBlock } from '../../model/types'

type MemberBioProps = {
  readonly blocks: readonly BioBlock[]
}

/**
 * Renders a member's biography.
 *
 * `text` blocks emit a bare text node rather than a paragraph. That is
 * deliberate: two of the three biographies are authored as one run of prose
 * with newlines inside it, which HTML collapses to spaces. Wrapping them in
 * `<p>` would split them into separate visual blocks.
 */
export function MemberBio({ blocks }: MemberBioProps) {
  return (
    <>
      {blocks.map((block, index) => (
        <Fragment key={index}>
          {block.kind === 'text' && block.value}

          {block.kind === 'paragraph' && <p>{block.value}</p>}

          {block.kind === 'list' && (
            <ul>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </>
  )
}
