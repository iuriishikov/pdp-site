'use client'

import dynamic from 'next/dynamic'

import { usePrefersReducedMotion } from '@/shared/lib/use-prefers-reduced-motion'

/**
 * `LottieLight` is the SVG-only renderer without expression support — the
 * smallest engine `lottie-react` ships. Verified sufficient for the animations
 * used here: they declare no expressions and no effects.
 *
 * Loaded lazily and client-side only: the player touches `document` on import,
 * and keeping it out of the initial chunk costs nothing for a decoration.
 */
const LottieLight = dynamic(() => import('lottie-react').then((module) => module.LottieLight), {
  ssr: false,
})

type LottieSceneProps = {
  /** A parsed Lottie animation document. */
  readonly animation: object
  readonly className?: string
}

/**
 * Plays a looping decorative Lottie animation.
 *
 * Purely ornamental, so it is hidden from assistive technology and holds on
 * its first frame for visitors who ask for reduced motion.
 */
export function LottieScene({ animation, className }: LottieSceneProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className={className} aria-hidden="true">
      <LottieLight
        src={animation}
        autoplay={!prefersReducedMotion}
        loop={!prefersReducedMotion}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
