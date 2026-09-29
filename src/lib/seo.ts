import type { Metadata } from 'next'
import { site } from '@/data/site'

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://freewheel.ir'

/** Persian numbers for meta, Latin for URLs and OpenGraph. */
export const toEnDigits = (s: string) =>
  s
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))

export function buildMetadata(input: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
}): Metadata {
  const url = `${BASE_URL}${input.path === '/' ? '' : input.path}`
  const title = toEnDigits(input.title)
  const description = toEnDigits(input.description)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: toEnDigits(site.name),
      locale: site.locale,
      type: input.type ?? 'website',
      images: [{ url: input.image ?? '/og.png', width: 1200, height: 630, alt: title }],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [input.image ?? '/og.png'],
    },
  }
}

/** Absolute URL for a public asset. */
export const asset = (p: string) => `${BASE_URL}${p.startsWith('/') ? p : `/${p}`}`

export const ORG_ID = `${BASE_URL}/#organization`
export const WEBSITE_ID = `${BASE_URL}/#website`
