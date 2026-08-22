import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone is for Docker/self-hosted builds. On Vercel, the platform adapter
  // handles output tracing — standalone + adapter breaks on Next.js 16.3+ (ENOENT next-server.js.nft.json).
  output: process.env.VERCEL ? undefined : "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
