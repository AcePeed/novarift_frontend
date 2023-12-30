/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        FRONT_HOST: process.env.FRONT_HOST,
        API_HOST: process.env.API_HOST_EXT,
    },
    images: {
        remotePatterns: [
            {
              //protocol: 'https',
              hostname: 'localhost',
              //port: '',
              //pathname: '/image/upload/**',
            },
          ],
    }
}

module.exports = nextConfig
