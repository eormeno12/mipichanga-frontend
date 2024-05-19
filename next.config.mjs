/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: `/users/:path*`,
        destination: `${process.env.NEXT_PUBLIC_USERS_API}/users/:path*`,
      },
      {
        source: `/auth/:path*`,
        destination: `${process.env.NEXT_PUBLIC_USERS_API}/auth/:path*`,
      },
      {
        source: `/matches/:path*`,
        destination: `${process.env.NEXT_PUBLIC_MATCHES_API}/matches/:path*`,
      },
      {
        source: `/fields/:path*`,
        destination: `${process.env.NEXT_PUBLIC_FIELDS_API}/fields/:path*`,
      },
    ];
  },
};

export default nextConfig;
