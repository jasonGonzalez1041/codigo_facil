// app/blog/page.tsx
"use client";

import { useState } from 'react';
import { BlogPageClient } from './BlogPageClient';
import GuideModal from '@/components/ui/guide-modal';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    readTime: string;
    category: string;
    publishedAt: string;
    lastUpdated: string;
    date: string; // Add this for compatibility with GuideModal
    image: string;
    evergreen: boolean;
    featured?: boolean;
    color: string;
}

const evergreenPosts = [
    {
        id: 1,
        title: "Guía Definitiva: Desarrollo Web con Next.js para Principiantes",
        slug: "guia-desarrollo-web-nextjs-principiantes",
        excerpt: "Domina Next.js desde cero con esta guía evergreen. Pasos atemporales, mejores prácticas y checklist descargable para crear apps web profesionales.",
        readTime: "15 min",
        category: "Desarrollo Web",
        publishedAt: "2025-01-01",
        lastUpdated: "2025-01-01",
        date: "2025-01-01",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        evergreen: true,
        featured: true,
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        title: "Mejores Prácticas Evergreen para E-commerce Responsive",
        slug: "mejores-practicas-ecommerce-responsive-evergreen",
        excerpt: "Estrategias atemporales para crear tiendas online exitosas. UX optimizado, mejores prácticas de conversión y principios fundamentales.",
        readTime: "12 min",
        category: "E-commerce",
        publishedAt: "2025-01-08",
        lastUpdated: "2025-01-08",
        date: "2025-01-08",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        evergreen: true,
        color: "from-green-500 to-emerald-500"
    },
    {
        id: 3,
        title: "Estrategias SEO Evergreen para Sitios Web Digitales",
        slug: "estrategias-seo-evergreen-sitios-web",
        excerpt: "Principios SEO duraderos que funcionan año tras año. E-E-A-T, clústers temáticos y técnicas atemporales para autoridad sostenida.",
        readTime: "18 min",
        category: "SEO",
        publishedAt: "2025-01-15",
        lastUpdated: "2025-01-15",
        date: "2025-01-15",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
        evergreen: true,
        color: "from-purple-500 to-pink-500"
    }
];

export default function BlogPage() {
    const [selectedGuide, setSelectedGuide] = useState<BlogPost | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGuideClick = (guide: BlogPost) => {
        setSelectedGuide(guide);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGuide(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <section className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Contenido{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Guías Prácticas
              </span>{" "}
                            para LATAM
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Guías atemporales que generan valor perpetuo. Aprende desarrollo web, e-commerce y estrategias digitales
                            con contenido que nunca caduca y te convierte en referente.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                📚 Guías Completas
              </span>
                            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                ⏰ Contenido Atemporal
              </span>
                            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                🚀 Resultados Garantizados
              </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="pb-12">
                <div className="container mx-auto px-6">
                    {evergreenPosts.filter(post => post.featured).map(post => (
                        <div
                            key={post.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto cursor-pointer hover:shadow-2xl transition-all duration-300"
                            onClick={() => handleGuideClick(post)}
                        >
                            <div className="md:flex">
                                <div className="md:w-1/2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-1/2 p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full">
                      ⭐ Featured
                    </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime} de lectura
                    </span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Actualizado: {post.lastUpdated}
                    </span>
                                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                            Leer Guía Completa →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* All Posts Grid */}
            <section className="pb-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                        Todas las Guías
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {evergreenPosts.map(post => (
                            <div
                                key={post.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => handleGuideClick(post)}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
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
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {post.readTime}
                    </span>
                                        <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                            Leer más →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        ¿Listo para Implementar lo Aprendido?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Convierte este conocimiento evergreen en resultados reales para tu negocio
                    </p>
                    <BlogPageClient />
                </div>
            </section>

            {/* Modal reutilizado */}
            <GuideModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                guide={selectedGuide}
            />
        </div>
    )
}