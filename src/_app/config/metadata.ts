import type { Metadata, Viewport } from 'next'

import { siteConfig } from '@/shared/config'

/**
 * Defaults inherited by every route.
 *
 * `metadataBase` resolves the relative image paths used here and in the
 * per-page metadata into absolute URLs; without it Next.js fails the build
 * for any relative metadata URL.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage.path,
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
}

/**
 * `viewport` is a separate export from `metadata` — `themeColor`, `viewport`
 * and `colorScheme` are rejected inside the metadata object.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}
