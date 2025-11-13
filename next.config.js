/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizado para Vercel (modo estándar Next.js)
  // output: 'export', // Comentado - Vercel prefiere el modo estándar
  trailingSlash: true,
  
  // Optimización de imágenes para Vercel
  images: {
    // unoptimized: true, // Comentado - Vercel tiene optimización nativa
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Configuración de TypeScript para builds
  typescript: {
    ignoreBuildErrors: false, // Habilitado para producción
  },
  
  // Optimizaciones para Vercel
  experimental: {
    // optimizeCss: true, // Deshabilitado - requiere critters module
    scrollRestoration: true,
  },
  
  // Variables de entorno para Vercel
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://codigofacil.com',
  },
  
  // Configuración de headers para SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ],
      },
    ];
  },
  
  // Configuración de rewrites para mejor SEO
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
};

export default nextConfig;