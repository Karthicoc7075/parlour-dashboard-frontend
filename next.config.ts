import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode:false,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/parlour-dashboard-frontend' : '',
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;