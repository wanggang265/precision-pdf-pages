import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = repoName === "precision-pdf-pages" ? "/precision-pdf-pages" : undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
