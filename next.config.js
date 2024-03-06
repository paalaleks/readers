/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/my-library",
        destination: "/my-library/books",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
