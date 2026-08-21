import type { ReactNode } from 'react'

import { fontVariables } from '@/shared/fonts'
import { SiteFooter } from '@/widgets/site-footer'

import '../styles/globals.css'

import styles from './root-layout.module.css'

type RootLayoutProps = {
  readonly children: ReactNode
}

/**
 * The shell every page renders inside: a centred, max-width column with the
 * site footer beneath the page content.
 *
 * A server component — the whole shell renders to static HTML. Previously
 * this was a `'use client'` wrapper around a UI-kit provider, which pulled
 * every page into the client bundle.
 */
export function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        {/*
          Scroll-reveal blocks start at `opacity: 0` and are faded in by an
          IntersectionObserver. Without JavaScript that observer never runs, so
          the copy would stay invisible — this pins it visible instead. The text
          itself is always in the HTML either way.
        */}
        <noscript>
          <style>{'[data-reveal]{opacity:1 !important;}'}</style>
        </noscript>
      </head>

      <body>
        <div className={styles.root}>
          <div className={styles.container}>
            {children}

            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  )
}
