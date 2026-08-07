import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ship a self-contained server.js so the runtime image carries no bun/npm and
  // no dev dependencies.
  output: "standalone",
  // Don't advertise the framework. Security headers live in the Caddy site
  // block, which fronts every request.
  poweredByHeader: false,
};

export default nextConfig;
