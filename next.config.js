/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "demarketplace-production.up.railway.app",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
