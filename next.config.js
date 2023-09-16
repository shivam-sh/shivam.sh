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
  redirects: async () => {
    return (
      [
        { // redirect /content/* to {GHOST_URL}/content/*
          source: '/content/:slug*',
          destination: `${process.env.GHOST_URL}/content/:slug*`,
          permanent: true,
        },
        { //redirects to the correct link when clicking on the title of the page in the nav bar
          source: '/slug/:path*',
          destination: '/posts/:path*',
          permanent: true
        },
        { // redirect /ghost to {GHOST_URL}/ghost
          source: '/ghost',
          destination: `${process.env.GHOST_URL}/ghost`,
          permanent: true,
        },
        { // redirect /[year]/[slug] to /posts/[slug] but only if [year] is a number
          source: '/:year(\\d+)/:slug',
          destination: '/posts/:slug',
          permanent: true,
        },
      ]
    )
  },
};

module.exports = nextConfig;
