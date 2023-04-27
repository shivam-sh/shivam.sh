// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  images: {
    domains: ['shivam.sh', 'images.unsplash.com'],
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
