import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",   // allow ALL external hosts
      },
      {
        protocol: "http",
        hostname: "**",   // allow ALL http as well
      },
    ],
  },
};
export default nextConfig;
