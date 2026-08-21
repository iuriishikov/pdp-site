'use client'

import type { ReactNode } from 'react'

import { useInViewport } from '@/shared/lib/use-in-viewport'

import styles from './reveal.module.css'

type RevealProps = {
  readonly children: ReactNode
  readonly className?: string
}

/**
 * Fades its children in the first time they scroll into view.
 *
 * The children are always present in the DOM and are hidden with `opacity`
 * alone, so the copy ships in the server-rendered HTML and is readable by
 * crawlers and by anyone with JavaScript disabled. (The previous
 * implementation unmounted the children until the observer fired, which left
 * the page body empty in the initial HTML.)
 */
export function Reveal({ children, className }: RevealProps) {
  const { ref, hasEntered } = useInViewport<HTMLDivElement>({ threshold: 0.3 })

  return (
    <div ref={ref} className={styles.root} data-visible={hasEntered}>
      {/* `data-reveal` is the stable hook the <noscript> rule in the root
          layout uses to force these blocks visible without JavaScript. */}
      <div data-reveal="" className={className ? `${styles.inner} ${className}` : styles.inner}>
        {children}
      </div>
    </div>
  )
}
