/** @type {import('next').NextConfig} */

// Import the Netlify plugin
const nextOnNetlify = require('@netlify/next');

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
module.exports = nextConfig;