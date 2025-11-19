import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog-data';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generar páginas estáticas para todos los posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generar metadata para SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog no encontrado - CodigoFacil.com',
    };
  }

  return {
    title: `${post.title} | CodigoFacil.com`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog no encontrado</h1>
          <a href="/blog" className="text-blue-600 hover:underline">Volver al blog</a>
        </div>
      </div>
    );
  }

  // Por ahora usar contenido placeholder hasta implementar MDX completo
  const content = `
# ${post.title}

${post.excerpt}

## 🎯 Contenido Completo Disponible Próximamente

Este blog post está en proceso de migración desde nuestros archivos MDX. 

Mientras tanto, puedes:

1. **📱 Contactarnos directamente** vía WhatsApp para consultas específicas
2. **🎯 Solicitar consultoría** personalizada sobre este tema  
3. **📚 Explorar otros posts** disponibles en el blog

## 🚀 ¿Necesitas Ayuda Inmediata?

Nuestro equipo puede ayudarte a implementar estas estrategias específicamente para tu proyecto.

**¿Qué incluye?**
- ✅ Análisis personalizado de tu caso
- ✅ Implementación práctica paso a paso  
- ✅ Seguimiento y optimización continua
- ✅ Soporte técnico especializado

---

*Este contenido está siendo migrado desde nuestros archivos MDX. Pronto estará disponible la versión completa.*
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Inicio</a>
              <span>/</span>
              <a href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</a>
              <span>/</span>
              <span className="text-gray-900 dark:text-white">{post.title}</span>
            </nav>

            {/* Post Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {post.readTime} de lectura
                </span>
                {post.evergreen && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    📚 Guía Atemporal
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <span>Publicado: {post.publishedAt}</span>
                <span>•</span>
                <span>Actualizado: {post.lastUpdated}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
              {/* Content formatted as markdown-like */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                  {content}
                </pre>
              </div>
            </article>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  ¿Quieres Implementar lo Aprendido?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Convierte este conocimiento en resultados reales para tu negocio
                </p>
                <a
                  href={`https://wa.me/56950225491?text=${encodeURIComponent(
                    `¡Hola! He leído la guía "${post.title}" y me interesa implementar estas estrategias. ¿Podrían ayudarme?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  💬 Aplicar Conocimiento con Expertos
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex justify-between items-center">
              <a
                href="/blog"
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                ← Volver al Blog
              </a>
              
              <a
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
              >
                Inicio →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}