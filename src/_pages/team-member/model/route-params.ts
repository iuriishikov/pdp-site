/**
 * Props Next.js passes to `/team/members/[slug]`.
 *
 * `params` is a Promise: dynamic route parameters became asynchronous in
 * Next.js 15 and synchronous access was removed in 16.
 */
export type TeamMemberPageProps = {
  readonly params: Promise<{ readonly slug: string }>
}
