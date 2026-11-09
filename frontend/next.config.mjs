/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  env: {
    AI_MICROSERVICE_URL: process.env.AI_MICROSERVICE_URL || 'http://localhost:8000/api/v1',
  },
};

export default nextConfig;
