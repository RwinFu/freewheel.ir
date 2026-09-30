import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the sandbox's proxied preview hostname to load Next dev assets.
  allowedDevOrigins: ["**.e2b.app"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
