/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { hostname: "covers.openlibrary.org" },
      { hostname: "vsyzqqadqvjdaddmucyn.supabase.co" },
      { hostname: "cdn.sanity.io" },
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
      {
        source: "/authenticate",
        destination: "/authenticate/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
