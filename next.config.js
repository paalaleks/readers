/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "covers.openlibrary.org",
      },
      {
        hostname: "vsyzqqadqvjdaddmucyn.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/my-library/books",
        permanent: true,
      },
      {
        source: "/dashboard/my-library",
        destination: "/dashboard/my-library/books",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
