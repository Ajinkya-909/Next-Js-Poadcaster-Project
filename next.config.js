/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns:[
      {
        protocol:'https',
        hostname:"lovely-flamingo-139.convex.cloud" 
      },
      {
        protocol:'https',
        hostname:"agile-cheetah-700.convex.cloud" 
      },
      {
        protocol:'https',
        hostname:"img.clerk.com"
      },
    ]
  },
};

module.exports = nextConfig;
