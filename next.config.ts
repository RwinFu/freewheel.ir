import type { NextConfig } from 'next'

/**
 * The site is fully static (every dynamic route ships generateStaticParams),
 * so it is built as a static export and served from GitHub Pages.
 *
 * `DEPLOY_TARGET=github-pages` is set by the deploy workflow and switches on
 * the Pages specifics: the repo is hosted under /<repo-name>/, and folder
 * URLs (/about/) work on any static host without rewrite rules.
 */
const onGitHubPages = process.env.DEPLOY_TARGET === 'github-pages'

const nextConfig: NextConfig = {
  output: 'export',
  // Image optimization needs a Node server; the site only serves local
  // assets, so pass them through untouched.
  images: { unoptimized: true },
  ...(onGitHubPages && {
    basePath: '/freewheel.ir',
    trailingSlash: true,
  }),
}

export default nextConfig
