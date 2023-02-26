// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  images: {
    domains: ['cdn.shivam.sh', 'dev-cdn.shivam.sh'],
  },
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
