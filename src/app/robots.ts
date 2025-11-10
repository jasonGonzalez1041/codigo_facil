import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/_next/', '/admin/'],
      }
    ],
    sitemap: 'https://codigofacil-site.pages.dev/sitemap.xml',
  }
}