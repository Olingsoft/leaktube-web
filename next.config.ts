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
        hostname: 'leaktubeservice.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'unite-kenya-backend.onrender.com', // Added just in case
      },
    ],
  },
};

export default nextConfig;
