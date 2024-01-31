const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // static export app dir
  // output: 'export',
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
  experimental: {
    // mdxRs: true,
  },
}

module.exports = withMDX(nextConfig)
