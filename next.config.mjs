/** @type {import('next').NextConfig} */
import { env } from './config';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: `/users/:path*`,
        destination: `${env.users_api}/users/:path*`,
      },
      {
        source: `/auth/:path*`,
        destination: `${env.users_api}/auth/:path*`,
      },
      {
        source: `/matches/:path*`,
        destination: `${env.matches_api}/matches/:path*`,
      },
      {
        source: `/fields/:path*`,
        destination: `${env.fields_api}/fields/:path*`,
      },
    ];
  },
};

export default nextConfig;
