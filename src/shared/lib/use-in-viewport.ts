'use client'

import { useEffect, useRef, useState } from 'react'

type UseInViewportOptions = {
  /** Fraction of the element that must be visible before it counts. */
  readonly threshold?: number
}

/**
 * Reports whether an element has *ever* entered the viewport.
 *
 * Latches to `true` on the first intersection and disconnects the observer, so
 * a reveal animation plays once and never replays on scroll-back.
 */
export function useInViewport<T extends Element>({ threshold = 0.3 }: UseInViewportOptions = {}) {
  const ref = useRef<T>(null)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (element === null || hasEntered) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [hasEntered, threshold])

  return { ref, hasEntered } as const
}
