import type { MetadataRoute } from 'next'
import { R_SERIES } from '@/data/ringspann'
import { BRANDS } from '@/data/brands'
import { ARTICLES } from '@/data/articles'
import { BASE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/ringspann`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/applications`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/brands`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/articles`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]

  const models: MetadataRoute.Sitemap = R_SERIES.map((s) => ({
    url: `${BASE_URL}/ringspann/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const brands: MetadataRoute.Sitemap = BRANDS.map((b) => ({
    url: `${BASE_URL}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  const articles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE_URL}/articles/${a.slug}`,
    lastModified: new Date(toGregorian(a.date)),
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...statics, ...models, ...brands, ...articles]
}

/** Jalali to Gregorian. Year + 621; months and days line up. Digits in
 *  the article data are Persian, so they are folded to ASCII first. */
function toGregorian(fa: string) {
  const ascii = fa.replace(/[\u06F0-\u06F9]/g, (c) => String(c.charCodeAt(0) - 0x06f0))
  const [y, m, d] = ascii.split('/').map(Number)
  return new Date(Date.UTC(y + 621, m - 1, d))
}
