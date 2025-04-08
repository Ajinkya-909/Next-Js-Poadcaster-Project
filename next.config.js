/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns:[
      {
        protocol:'https',
        hostname:"lovely-flamingo-139.convex.cloud" 
      }
    ]
  },
};

module.exports = nextConfig;
