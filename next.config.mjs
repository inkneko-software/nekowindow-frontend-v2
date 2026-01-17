/** @type {import('next').NextConfig} */
import { env } from 'process';

const nextConfig = {
  reactStrictMode: true,
  rewrites: async function () {
    if (env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://10.200.0.10:3080/api/:path*',
        },
        {
          source: '/swagger/:path*',
          destination: 'http://10.200.0.10:3080/swagger/:path*',
        },
        {
          source: '/v3/:path*',
          destination: 'http://10.200.0.10:3080/v3/:path*',
        },
        {
          source: '/webjars/:path*',
          destination: 'http://10.200.0.10:3080/webjars/:path*',
        },
      ]
    }

    return [];
  }
};

export default nextConfig;
