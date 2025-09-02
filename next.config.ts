import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static site generation
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Optimize for CDN deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://mercuriohub.io' : '',
};

export default nextConfig;
