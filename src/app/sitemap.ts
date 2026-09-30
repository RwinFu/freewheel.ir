import type { MetadataRoute } from "next";

import { APPLICATIONS } from "@/content/applications";
import { ARTICLES } from "@/content/articles";
import { BRANDS } from "@/content/brands";
import { RINGSPANN_SERIES } from "@/content/ringspann";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1, lastModified: now },
    { url: `${base}/ringspann`, changeFrequency: "monthly", priority: 0.9, lastModified: now },
    { url: `${base}/brands`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    {
      url: `${base}/applications`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },
    { url: `${base}/articles`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.5, lastModified: now },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6, lastModified: now },
  ];

  return [
    ...staticRoutes,
    ...RINGSPANN_SERIES.map((series) => ({
      url: `${base}/ringspann/${series.slug}`,
      changeFrequency: "monthly" as const,
      priority: series.slug === "fgr-r" ? 0.95 : 0.75,
      lastModified: now,
    })),
    ...BRANDS.map((brand) => ({
      url: `${base}/brands/${brand.slug}`,
      changeFrequency: "monthly" as const,
      priority: brand.slug === "ringspann" ? 0.85 : 0.6,
      lastModified: now,
    })),
    ...APPLICATIONS.map((application) => ({
      url: `${base}/applications/${application.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: now,
    })),
    ...ARTICLES.map((article) => ({
      url: `${base}/articles/${article.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      lastModified: now,
    })),
  ];
}
