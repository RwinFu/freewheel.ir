import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { TopBanner } from '@/components/layout/TopBanner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { PageTransition } from '@/components/motion/PageTransition'
import { JsonLd } from '@/components/seo/JsonLd'
import { AppErrorBoundary } from '@/components/AppErrorBoundary'
import { site, SHOPS } from '@/data/site'
import { BASE_URL, ORG_ID, WEBSITE_ID } from '@/lib/seo'

/* Self-hosted, subset. `npm run fonts` regenerates the woff2 cuts from
   the upstream variable font — no Google Fonts request is ever made. */
const vazirText = localFont({
  src: [{ path: '../../public/fonts/Vazirmatn-Text.woff2', weight: '100 700', style: 'normal' }],
  variable: '--font-vazir-text',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Tahoma', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

const vazirDisplay = localFont({
  src: [{ path: '../../public/fonts/Vazirmatn-Display.woff2', weight: '700 900', style: 'normal' }],
  variable: '--font-vazir-display',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Tahoma', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: site.title,
    template: `%s | ${site.shortTitle}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: BASE_URL }],
  creator: site.name,
  alternates: { canonical: '/' },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: BASE_URL,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  category: 'industrial',
}

export const viewport: Viewport = {
  themeColor: '#0e1012',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirText.variable} ${vazirDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          پرش به محتوای اصلی
        </a>

        <SmoothScroll />
        <PageTransition />
        <TopBanner />
        <Header />
        <AppErrorBoundary>
          <main id="main">{children}</main>
        </AppErrorBoundary>
        <Footer />

        <JsonLd
          data={[
            {
              '@type': 'Organization',
              '@id': ORG_ID,
              name: site.name,
              url: BASE_URL,
              description: site.description,
              areaServed: 'IR',
              knowsAbout: ['Freewheel', 'Overrunning clutch', 'Backstop', 'Indexing freewheel'],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'sales',
                  areaServed: 'IR',
                  url: `${BASE_URL}/contact`,
                },
              ],
            },
            {
              '@type': 'WebSite',
              '@id': WEBSITE_ID,
              url: BASE_URL,
              name: site.name,
              inLanguage: 'fa-IR',
              publisher: { '@id': ORG_ID },
            },
            {
              '@type': 'ItemList',
              name: 'فروشگاه‌های مرتبط',
              itemListElement: [
                { '@type': 'WebSite', name: SHOPS.bearing.host, url: SHOPS.bearing.href },
                { '@type': 'WebSite', name: SHOPS.automation.host, url: SHOPS.automation.href },
              ],
            },
          ]}
        />
      </body>
    </html>
  )
}
