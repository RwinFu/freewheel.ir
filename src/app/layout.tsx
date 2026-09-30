import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SITE } from "@/content/site";
import "./globals.css";

const vazir = localFont({
  src: [
    {
      path: "../../public/fonts/Vazirmatn-Text.woff2",
      weight: "100 700",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s | freewheel.ir",
  },
  description: SITE.description,
  applicationName: "freewheel.ir",
  keywords: [
    "فری‌ویل",
    "کلچ یک‌سره",
    "RINGSPANN",
    "FGR R",
    "بک‌استاپ",
    "نوار نقاله",
    "بلبرینگ",
    "freewheel",
  ],
  alternates: { canonical: "/" },
    openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: "freewheel.ir",
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    images: [
      {
        url: "/og-freewheel.jpg",
        width: 1200,
        height: 630,
        alt: "نقاشی خطی فری‌ویل اسپراگ — نمای انفجادی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "freewheel.ir",
    url: SITE.url,
    inLanguage: "fa-IR",
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: "freewheel.ir",
      url: SITE.url,
    },
  };

  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="min-h-dvh bg-base font-sans text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          رفتن به محتوای اصلی
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
