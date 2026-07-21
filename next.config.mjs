/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  experimental: {
    webpackBuildWorker: false,
  },
};

export default nextConfig;
