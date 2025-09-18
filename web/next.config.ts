const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Pin the correct project root for Turbopack to avoid multi-lockfile mis-detection
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
