import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
      },
      {
        hostname: "img.youtube.com",
      },
    ],
    minimumCacheTTL: 600, // cache images at least 10 minutes to prevent re-fetching from github
  },
};

export default nextConfig;
