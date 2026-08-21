'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(QUERY)
  mediaQuery.addEventListener('change', onChange)

  return () => {
    mediaQuery.removeEventListener('change', onChange)
  }
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot(): boolean {
  // The preference is unknowable while rendering on the server. Assuming
  // "no preference" matches the majority and keeps the markup stable.
  return false
}

/**
 * Tracks the visitor's reduced-motion preference, updating if it changes while
 * the page is open.
 *
 * A media query is an external store, so it is read through
 * `useSyncExternalStore` rather than mirrored into state from an effect: that
 * avoids the extra render pass on mount and gives React a defined value to use
 * during server rendering.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
