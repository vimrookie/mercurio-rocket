import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static site generation
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Use relative paths for assets to work on any domain (CloudFront or custom domain)
  assetPrefix: '',
};

export default nextConfig;
