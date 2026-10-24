import type { NextConfig } from "next";

const staticPreview = process.env.PAGES_EXPORT === "1";

// هدرهای امنیتی پاسخ — فقط برای سرور Node (خروجی استاتیک GitHub Pages هدر
// سفارشی ندارد؛ بنابراین فقط در شاخه‌ی غیراستاتیک اعمال می‌شود).
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    // خط پایه‌ی سازگار با Next (اسکریپت‌های inline هیدراتاسیون و JSON-LD)؛
    // قسمت‌های سخت‌گیرانه (object-src، frame-ancestors، form-action، base-uri)
    // بخش بزرگی از سطح حمله را می‌بندند. سخت‌گیری بیشتر با nonce مرحله‌ی بعد است.
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "media-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

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
    : {
        // خروجی standalone برای استقرار روی VPS: یک سرور Node خودکفا در
        // `.next/standalone` می‌سازد که بدون node_modules اصلی اجرا می‌شود.
        // بعد از بیلد، `node scripts/prepare-standalone.mjs` را اجرا کنید
        // (یا به‌جای `npm run build` از `npm run build:standalone`).
        output: "standalone",
        env: { NEXT_PUBLIC_BASE_PATH: "" },
        poweredByHeader: false,
        headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
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
