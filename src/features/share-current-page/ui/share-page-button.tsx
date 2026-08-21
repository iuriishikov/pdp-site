'use client'

import type { ReactNode } from 'react'

import { Button } from '@/shared/ui/button'

type SharePageButtonProps = {
  readonly children: ReactNode
}

/**
 * Shares the current URL.
 *
 * Prefers the operating system's share sheet, which is what mobile visitors
 * expect. `navigator.share` does not exist on most desktop browsers and used
 * to throw a bare TypeError there, leaving the button visibly dead — so the
 * URL is copied to the clipboard instead.
 */
export function SharePageButton({ children }: SharePageButtonProps) {
  async function share() {
    const url = window.location.href

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ url })
        return
      } catch (error) {
        // Dismissing the share sheet rejects; that is not a failure.
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
        // Anything else (permission policy, unsupported payload) falls through
        // to the clipboard.
      }
    }

    await navigator.clipboard?.writeText(url)
  }

  return <Button onClick={share}>{children}</Button>
}
