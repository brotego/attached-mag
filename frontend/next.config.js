/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['attatchedconsole.duckdns.org', '104.131.79.104'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'attatchedconsole.duckdns.org',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '104.131.79.104',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://104.131.79.104:1337/api/:path*', // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig; 