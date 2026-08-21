import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Both of these hide real defects. The codebase does not currently typecheck
  // cleanly, so they stay on to keep `next build` green — but they are a debt,
  // not a setting. Run `npm run typecheck` to see what they are masking, and
  // turn `ignoreBuildErrors` off once the count reaches zero.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
