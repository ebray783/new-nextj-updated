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
  // Cloudflare Pages specific settings
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Changed to 'export' for static site generation
  env: {
    // Explicitly disable Cloudflare authentication
    CLOUDFLARE_AUTH_ENABLED: 'false',
    CLOUDFLARE_ACCESS_REQUIRED: 'false',
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL
  }
};

module.exports = nextConfig;
