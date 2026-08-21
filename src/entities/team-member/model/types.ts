/**
 * A single block of a team member's biography.
 *
 * The variants exist because the three current biographies are authored
 * differently and must keep rendering exactly as they do today:
 *  - `text`      a bare text node (line breaks collapse, as in HTML)
 *  - `paragraph` a `<p>` element
 *  - `list`      a `<ul>` of `<li>` elements
 */
export type BioBlock =
  | { readonly kind: 'text'; readonly value: string }
  | { readonly kind: 'paragraph'; readonly value: string }
  | { readonly kind: 'list'; readonly items: readonly string[] }

export type TeamMemberPhoto = {
  /** Path under `public/`. Kept public so social-card URLs stay stable. */
  readonly src: string
  readonly width: number
  readonly height: number
  readonly alt: string
}

export type TeamMember = {
  /** URL segment under `/team/members/`. Must never change: these are shared links. */
  readonly slug: string
  /** Display name, rendered next to the portrait. */
  readonly name: string
  /** Role within PDP, rendered as the page heading. */
  readonly role: string
  /**
   * One-line introduction used in the homepage roster.
   *
   * Worded independently of `role`, and intentionally so — the homepage
   * describes seniority ("Managing Partner") where the member page states the
   * formal title ("CEO").
   */
  readonly summary: string
  /** Destination of the "Contact" button (Telegram, LinkedIn, ...). */
  readonly contactUrl: string
  readonly photo: TeamMemberPhoto
  readonly bio: readonly BioBlock[]
  /**
   * Per-member search/social metadata. Kept separate from `bio` because the
   * two are worded differently and are allowed to diverge.
   */
  readonly seo: {
    readonly description: string
    readonly ogDescription: string
    readonly ogImageAlt: string
    readonly keywords?: readonly string[]
  }
}
