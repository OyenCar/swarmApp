/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ['127.0.0.1:3000', '127.0.0.1','127.0.0.1:3306'],
};

export default nextConfig;