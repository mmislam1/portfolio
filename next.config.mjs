/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    webpackBuildWorker: false,
  },
};

export default nextConfig;
