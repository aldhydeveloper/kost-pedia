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
}

module.exports = nextConfig
