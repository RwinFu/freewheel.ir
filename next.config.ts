import type { NextConfig } from "next";

const staticPreview = process.env.PAGES_EXPORT === "1";

const nextConfig: NextConfig = {
  // GitHub Pages can only serve files. The regular build still keeps its API routes.
  ...(staticPreview
    ? {
        output: "export",
        basePath: "/freewheel.ir",
        trailingSlash: true,
        // فایل‌های `public/` (کات‌اوت‌ها، ویدیوها، پوسترها) رشته‌اند و Next
        // پیشوند basePath را خودش اضافه نمی‌کند؛ با این متغیر و `asset()`
        // در `src/lib/asset.ts` همان پیشوند دستی اضافه می‌شود.
        env: { NEXT_PUBLIC_BASE_PATH: "/freewheel.ir" },
      } as const
    : { env: { NEXT_PUBLIC_BASE_PATH: "" } }),
  // Allow the sandbox's proxied preview hostname to load Next dev assets.
  allowedDevOrigins: ["**.e2b.app"],
  // Keep the development-only Next.js badge out of the public-facing preview.
  devIndicators: false,
  images: {
    ...(staticPreview ? { unoptimized: true } : {}),
    // تصاویر کاربردها به‌صورت فایل محلی در `src/assets/images` هستند؛ هیچ
    // میزبان بیرونی لازم نیست و بهینه‌سازی تصویر آفلاین هم کار می‌کند.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
