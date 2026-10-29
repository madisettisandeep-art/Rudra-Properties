/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Native Gzip & Brotli compression for HTML, CSS, JS, and JSON API payloads
  compress: true,
  swcMinify: true,
  
  // High-performance image optimization (WebP/AVIF generation and caching)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache for optimized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },

  // Tree-shake and split heavy libraries into optimized subpath imports
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // CDN & Server-side caching headers
  async headers() {
    return [
      {
        // Cache static video and image assets at the CDN edge for 1 year immutable
        source: '/(images|videos)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Security & performance headers across the entire app
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/rudraproperties/admin',
        destination: '/admin',
      },
    ];
  },
};

export default nextConfig;
