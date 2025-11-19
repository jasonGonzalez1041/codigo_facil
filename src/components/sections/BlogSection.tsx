"use client";

import { useState } from "react";
import { ArrowUpRight, Clock, Calendar, Zap } from "lucide-react";
import { getBlogContent } from "@/lib/blog-content";
import { getAllPosts } from "@/lib/blog-data";

// Función para formatear markdown de manera segura (sin HTML inválido)
function formatMarkdownContent(markdown: string): string {
  if (!markdown) return '';
  
  // Simple and safe markdown formatting that avoids invalid HTML nesting
  return markdown
    // Headers (keep simple)
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    
    // Bold and italic (simple)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Convert line breaks to simple breaks
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

// 🎉 NUEVO MODAL CON CONTENIDO MARKDOWN COMPLETO
function GuideModal({ isOpen, onClose, guide }: { isOpen: boolean; onClose: () => void; guide: any }) {
    if (!isOpen || !guide) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full h-[95vh] overflow-hidden flex flex-col">
                
                {/* 🎯 Header del Modal - Más compacto */}
                <div className="relative flex-shrink-0">
                    <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-32 md:h-40 object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    {/* Info básica en el header */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium rounded-full">
                                {guide.category}
                            </span>
                            <span className="text-white/80 text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {guide.readTime}
                            </span>
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-white truncate">
                            {guide.title}
                        </h2>
                    </div>
                </div>


                {/* 📖 CONTENIDO COMPLETO - Scrollable optimizado */}
                <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <div className="p-4 md:p-6">
                        
                        {/* 📖 CONTENIDO REAL DEL BLOG */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                            
                            {/* Encabezado principal - más compacto */}
                            <div className="p-6 md:p-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                                    {guide.title}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {guide.excerpt}
                                </p>
                            </div>

                            {/* Contenido markdown renderizado - mejor spacing */}
                            <div className="p-6 md:p-8 pt-6">
                                <div 
                                    className="prose prose-base md:prose-lg max-w-none dark:prose-invert prose-blue prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-300"
                                    dangerouslySetInnerHTML={{ 
                                        __html: formatMarkdownContent(
                                            getBlogContent(guide.slug) || 
                                            `# ${guide.title}\n\n${guide.excerpt}\n\nEste contenido está siendo cargado...`
                                        ) 
                                    }}
                                />
                            </div>
                        </div>

                        {/* 📋 CTA al final del contenido - más compacto */}
                        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex-1">
                                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                                        ¿Te resultó útil esta guía?
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Implementa estas estrategias con ayuda de expertos
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        const message = `¡Hola! Acabo de leer la guía completa "${guide.title}" y me interesa implementar estas estrategias. ¿Podrían ayudarme?`;
                                        const whatsappUrl = `https://wa.me/56950225491?text=${encodeURIComponent(message)}`;
                                        window.open(whatsappUrl, '_blank');
                                    }}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                                >
                                    <Zap className="w-4 h-4" />
                                    Contactar Expertos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BlogSection() {
    const [selectedGuide, setSelectedGuide] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGuideClick = (guide: any) => {
        setSelectedGuide(guide);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGuide(null);
    };

    const handleWhatsAppClick = () => {
        const message = `¡Hola! He estado leyendo las guías evergreen de CodigoFacil.com y me interesa implementar estas estrategias en mi proyecto.

🎯 *Quiero desarrollar:*
• [Sitio web / E-commerce / App personalizada]

📚 *Basado en las guías prácticas*

¿Podrían ayudarme a convertir este conocimiento en resultados reales?`;

        const whatsappUrl = `https://wa.me/56950225491?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Usar posts reales desde blog-data.ts - mostrar los 3 más recientes
    const evergreenPosts = getAllPosts().slice(0, 3);

    return (
        <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header de la sección */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Blog</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Artículos sobre desarrollo web, e-commerce, SEO, marketing digital y estrategias 
                        que te ayudarán a convertirte en un referente en tu área.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
              📝 Contenido de Calidad
            </span>
                        <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              🚀 Estrategias Efectivas
            </span>
                        <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
              💡 Tips Profesionales
            </span>
                    </div>
                    <div className="text-center">
                        <a 
                            href="/blog" 
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            📚 Ver Todos los Artículos
                            <ArrowUpRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Post Destacado */}
                <div className="mb-16">
                    {evergreenPosts.filter(post => post.featured).map(post => (
                        <div
                            key={post.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                            onClick={() => handleGuideClick(post)}
                        >
                            <div className="md:flex">
                                <div className="md:w-1/2">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-1/2 p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full">
                      ⭐ Destacado
                    </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime} de lectura
                    </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Actualizado: {post.lastUpdated}
                    </span>
                                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                            Leer Guía Completa
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grid de todas las guías */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {evergreenPosts.map(post => (
                        <div
                            key={post.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 group"
                            onClick={() => handleGuideClick(post)}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full backdrop-blur-sm">
                    {post.readTime}
                  </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {post.category}
                  </span>
                                    {post.evergreen && (
                                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                      📚 Guía Práctica
                    </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {post.readTime}
                  </span>
                                    <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm flex items-center gap-1">
                                        Leer más
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            ¿Listo para Implementar lo Aprendido?
                        </h3>
                        <p className="text-blue-100 mb-8 text-lg">
                            Convierte este conocimiento evergreen en resultados reales para tu negocio
                        </p>
                        <button
                            onClick={handleWhatsAppClick}
                            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                        >
                            <Zap className="w-5 h-5" />
                            Aplicar Conocimiento con Expertos
                        </button>
                    </div>
                </div>

                {/* Modal */}
                <GuideModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    guide={selectedGuide}
                />
            </div>
        </section>
    );
}