/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.dibubaron.com',
      },
      {
        protocol: 'https',
        hostname: 'lightpink-gnu-805963.hostingersite.com',
      },
      {
        protocol: 'https',
        hostname: '*.hostingersite.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
