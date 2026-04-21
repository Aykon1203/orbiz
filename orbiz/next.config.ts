import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["@prisma/client", ".prisma"],
};
module.exports = {
  allowedDevOrigins: ['192.168.0.113'],
}

export default nextConfig;
