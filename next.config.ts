import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Enable static site generation
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Use relative paths for assets to work on any domain (CloudFront or custom domain)
  assetPrefix: '',
  // Pin the workspace root — the monorepo has multiple lockfiles, so Turbopack
  // would otherwise infer the parent directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
