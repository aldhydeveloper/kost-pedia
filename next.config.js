/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    domains: ['localhost', 'https://api.themoviedb.org/'],
  },
  headers: () => [
    {
      // Create glob to target specific pages you want
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
}

module.exports = nextConfig
