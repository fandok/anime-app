/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.myanimelist.net",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
