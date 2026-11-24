import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "lenis"],
  },
};

export default nextConfig;
