/** @type {import('next').NextConfig} */
import { env } from 'process';

const nextConfig = {
  reactStrictMode: true,
  rewrites: async function () {
    if (env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost/api/:path*',
        },
        {
          source: '/swagger/:path*',
          destination: 'http://localhost/swagger/:path*',
        },
        {
          source: '/v3/:path*',
          destination: 'http://localhost/v3/:path*',
        },
        {
          source: '/webjars/:path*',
          destination: 'http://localhost/webjars/:path*',
        },
      ]
    }

    return [];
  },
};

export default nextConfig;
