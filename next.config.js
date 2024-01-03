/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        FRONT_HOST: process.env.FRONT_HOST,
        API_HOST: process.env.API_HOST_EXT,
        API_HOST_INTER: process.env.API_HOST_EXT,
    },
    images: {
        remotePatterns: [
            {
              //protocol: 'https',
              hostname: 'localhost',
              //port: '',
              //pathname: '/image/upload/**',
            },{
              //protocol: 'https',
              hostname: process.env.API_HOST_EXT.split('/')[2],
              //port: '',
              //pathname: '/image/upload/**',
            },
          ],
    }
}

module.exports = nextConfig
