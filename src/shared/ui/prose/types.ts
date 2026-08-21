/**
 * Content model for editorial copy.
 *
 * The element each block renders as is part of the data rather than a styling
 * detail, because the type scale keys off element position:
 * `.text_item > :nth-child(even)::first-letter` enlarges the first letter of
 * every second child. Changing a `span` into a `p` would therefore change the
 * visual output, so authors pick the element explicitly.
 */
export type ProseBlock =
  | {
      readonly kind: 'paragraph'
      readonly value: string
      readonly emphasis?: 'italic'
    }
  | {
      readonly kind: 'span'
      readonly value: string
    }
