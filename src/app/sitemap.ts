import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codigofacil.com'
  
  // Obtener todos los posts para generar URLs dinámicamente
  const posts = getAllPosts()
  
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.9 : 0.7,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly', 
      priority: 0.8,
    },
    ...blogUrls
  ]
}