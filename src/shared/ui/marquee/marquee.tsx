'use client'

import type { ReactNode } from 'react'
import FastMarquee from 'react-fast-marquee'

import { usePrefersReducedMotion } from '@/shared/lib/use-prefers-reduced-motion'

type MarqueeProps = {
  readonly children: ReactNode
  /** Pixels per second. */
  readonly speed?: number
}

/**
 * Continuously scrolls its children sideways, repeating them to fill the row.
 *
 * Holds still for visitors who ask for reduced motion — an endlessly moving
 * strip is a vestibular trigger and cannot be paused by the reader.
 */
export function Marquee({ children, speed = 100 }: MarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <FastMarquee autoFill speed={speed} play={!prefersReducedMotion}>
      {children}
    </FastMarquee>
  )
}
