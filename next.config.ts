import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'mega.nz',
      },
      {
        protocol: 'https',
        hostname: 'mega.io',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'https',
        hostname: 'c05c4189af96.ngrok-free.app',
      },
    ],
  },
};

export default nextConfig;
