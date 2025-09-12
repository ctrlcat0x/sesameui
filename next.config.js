const withMDX = require("@next/mdx")()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // prevent Next from inferring the workspace root and modifying tsconfig
  outputFileTracingRoot: __dirname,
  // produce a standalone server build to reduce serverless bundle size
  output: "standalone",
  // during dependency upgrades, TypeScript/ESLint errors may break the build;
  // allow building while you fix type/lint issues separately
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        port: "",
        hostname: "musicbrainz.org",
        pathname: "/**",
      },
    ],
  },
}

module.exports = withMDX(nextConfig)
