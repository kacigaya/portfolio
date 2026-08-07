import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework. Security headers live in the Caddy site
  // block, which fronts every request.
  poweredByHeader: false,
};

export default nextConfig;
