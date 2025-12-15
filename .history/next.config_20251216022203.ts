/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🛠️ REQUIRED for static output to the 'out' directory
  output: "export",

  // Optional: Set trailing slash for compatibility with static exports
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
