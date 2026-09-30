import type { MetadataRoute } from "next";

import { SITE } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    // در robots.txt مقدار Host باید فقط نام میزبان باشد، نه آدرس کامل.
    host: new URL(SITE.url).host,
  };
}
