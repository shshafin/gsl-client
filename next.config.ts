/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // Trailing slash is good practice for static exports
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
