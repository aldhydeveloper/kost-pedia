/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost:3000',
                port: '3000',
                pathname: '/uploads/**',
            },
        ],
  }
}

module.exports = nextConfig
