// FILE: next.config.js - JAVASCRIPT VERSION (not TypeScript)
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // For static export if needed
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  }
};

module.exports = nextConfig;