/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/social-preview',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;