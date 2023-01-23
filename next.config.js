/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.IMAGE_DOMAIN,
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
