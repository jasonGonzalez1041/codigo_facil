"use client"
import { FAQSchema, nextjsFAQs, ecommerceFAQs, seoFAQs } from '@/components/ui/faq-schema'

interface BlogPost {
  title: string
  content: string
  excerpt: string
  publishedAt: string
  lastUpdated: string
  readTime: string
  category: string
  image: string
  keywords: string[]
}

interface BlogPostClientProps {
  post: BlogPost
  slug: string
}

export function BlogPostClient({ post, slug }: BlogPostClientProps) {
  // Get appropriate FAQs based on post
  const getFAQs = (slug: string) => {
    if (slug.includes('nextjs')) return nextjsFAQs
    if (slug.includes('ecommerce')) return ecommerceFAQs
    if (slug.includes('seo')) return seoFAQs
    return nextjsFAQs // default
  }

  const currentFAQs = getFAQs(slug)

  return (
    <>
      <FAQSchema faqs={currentFAQs} title={post.title} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {post.readTime} de lectura
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                📚 Guía Práctica
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span>Publicado: {post.publishedAt}</span>
              <span>Actualizado: {post.lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-12"
            />
            
            <div 
              className="prose prose-lg max-w-none dark:prose-invert
                prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 
                prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100"
              dangerouslySetInnerHTML={{ __html: post.content.split('\n').join('<br/>').replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>') }}
            />
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para Implementar lo Aprendido?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Convierte este conocimiento en un proyecto real para tu negocio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const message = `¡Hola! He leído la guía "${post.title}" y me interesa implementar un proyecto profesional.

🎯 *Mi proyecto necesita:*
• [Describe brevemente tu idea]

📚 *Basado en:* ${post.title}

¿Podrían ayudarme a convertir esto en realidad?`;
                
                const whatsappUrl = `https://wa.me/56995022549?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              💬 Implementar con Expertos
            </button>
            <button 
              onClick={() => window.location.href = '/blog'}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              📚 Más Guías
            </button>
          </div>
        </div>
      </section>
    </>
  )
}