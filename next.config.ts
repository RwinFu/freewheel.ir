import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the sandbox's proxied preview hostname to load Next dev assets.
  allowedDevOrigins: ["**.e2b.app"],
  images: {
    // تصاویر کاربردها به‌صورت فایل محلی در `src/assets/images` هستند؛ هیچ
    // میزبان بیرونی لازم نیست و بهینه‌سازی تصویر آفلاین هم کار می‌کند.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
