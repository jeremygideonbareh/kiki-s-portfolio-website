import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  ...(isGhPages && {
    output: 'export',
    basePath,
    assetPrefix: basePath,
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
