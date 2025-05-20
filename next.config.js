/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add Cloudflare specific settings
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    runtime: 'edge',
  }
};

module.exports = nextConfig;
