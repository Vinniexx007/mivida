import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this project so Next doesn't infer it from a
  // lockfile higher up the tree (e.g. the home directory).
  turbopack: {
    root: path.resolve(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
