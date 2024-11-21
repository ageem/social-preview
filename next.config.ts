import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/social-preview',
  images: {
    unoptimized: true,
  },
  // Keep any existing config options you have
};

export default nextConfig;