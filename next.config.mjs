/** @type {import('next').NextConfig} */
import { env } from 'process';

/**
 * 获取API服务器
 * @returns 如果环境变量中定义了API_SERVER，则使用该值，否则使用空串，即当前访问的服务器
 */
const getBasePath = () => {
  if (env.API_SERVER !== undefined && typeof (env.API_SERVER) === 'string') {
    return env.API_SERVER;
  }

  return '';
}

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
  env: {
    basePath: getBasePath()
  }
};

export default nextConfig;
