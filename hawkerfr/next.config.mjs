/** @type {import('next').NextConfig} */

const { withNetlify } = require('@netlify/next');

const nextConfig = {
  images: {
    domains: ["example.com", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

// Export the configuration
module.exports = withNetlify(nextConfig);