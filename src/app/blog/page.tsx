// app/blog/page.tsx
"use client";

import { useState } from 'react';
import React from 'react';
import { BlogPageClient } from './BlogPageClient';
import GuideModal from '@/components/ui/blog-modal-new';
import { getAllPosts, type BlogPost } from '@/lib/blog-data';

// Sistema de posts leídos completamente nuevo y limpio
function useReadPostsSystem() {
    // Evitar hydration mismatch - inicializar vacío y cargar en useEffect
    const [readPosts, setReadPosts] = useState<Set<string>>(new Set());
    const [isHydrated, setIsHydrated] = useState(false);
    
    // Cargar posts leídos solo en el cliente después de hydratación
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('codigofacil_read_posts_v2');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed)) {
                        setReadPosts(new Set(parsed));
                    }
                }
            } catch (error) {
                console.error('Error loading read posts:', error);
                // Limpiar localStorage corrupto
                localStorage.removeItem('codigofacil_read_posts_v2');
                localStorage.removeItem('readPosts');
            }
        }
        setIsHydrated(true);
    }, []);

    // Función para marcar post como leído
    const markAsRead = (slug: string) => {
        console.log(`🔖 Marcando post como leído: ${slug}`);
        setReadPosts(prevSet => {
            if (prevSet.has(slug)) {
                console.log(`✅ Post ${slug} ya estaba marcado como leído`);
                return prevSet; // Ya está marcado, no hacer nada
            }
            
            const newSet = new Set(prevSet);
            newSet.add(slug);
            console.log(`📚 Posts leídos actualizados:`, [...newSet]);

            // Guardar en localStorage con nueva clave
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('codigofacil_read_posts_v2', JSON.stringify([...newSet]));
                    console.log(`💾 Guardado en localStorage:`, [...newSet]);
                } catch (error) {
                    console.error('Error saving read posts:', error);
                }
            }

            return newSet;
        });
    };

    // Función para verificar si un post está leído
    const isRead = (slug: string): boolean => {
        return readPosts.has(slug);
    };

    // Función para obtener estadísticas
    const getStats = (totalPosts: number) => {
        const readCount = readPosts.size;
        return {
            read: readCount,
            total: totalPosts,
            percentage: totalPosts > 0 ? Math.round((readCount / totalPosts) * 100) : 0
        };
    };

    // Función para resetear progreso (útil para debugging)
    const resetProgress = () => {
        setReadPosts(new Set());
        if (typeof window !== 'undefined') {
            localStorage.removeItem('codigofacil_read_posts_v2');
            localStorage.removeItem('readPosts'); // También limpiar versión anterior
        }
    };

    return { markAsRead, isRead, getStats, resetProgress, readPostsCount: readPosts.size, isHydrated };
}

interface BlogPageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}

export default function BlogPage({ params: _params, searchParams: _searchParams }: BlogPageProps) {
    const [selectedGuide, setSelectedGuide] = useState<BlogPost | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    
    // Cargar posts de forma segura para App Router
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
    
    React.useEffect(() => {
        // Cargar posts solo en cliente para evitar ClientPageRoot errors
        const posts = getAllPosts();
        setAllPosts(posts);
    }, []);
    
    // Sistema de posts leídos limpio
    const { markAsRead, isRead, getStats, resetProgress, isHydrated } = useReadPostsSystem();
    
    // Evitar SegmentViewNode errors - verificar cliente
    React.useEffect(() => {
        setIsClient(true);
    }, []);
    
    // Obtener estadísticas actuales
    const stats = getStats(allPosts.length);

    const handleGuideClick = (guide: BlogPost) => {
        setSelectedGuide(guide);
        setIsModalOpen(true);
        // Marcar como leído cuando se abre el modal
        markAsRead(guide.slug);
    };


    // Evitar renderizado hasta hidratación completa para prevenir ClientPageRoot/SegmentViewNode errors
    if (!isClient || !isHydrated || allPosts.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center" suppressHydrationWarning>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Cargando guías...</p>
                </div>
            </div>
        );
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGuide(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 mobile-safe overflow-x-hidden" suppressHydrationWarning>
            {/* Hero Section */}
            <section className="pt-24 sm:pt-32 pb-12 sm:pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                            Contenido{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Guías Prácticas
                            </span>{" "}
                            para LATAM
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                            Guías atemporales que generan valor perpetuo. Aprende desarrollo web, e-commerce y estrategias digitales
                            con contenido que nunca caduca y te convierte en referente.
                        </p>

                        {/* Progress Bar */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg max-w-md mx-auto mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Tu progreso de lectura
                                </span>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                    {stats.read}/{stats.total} ({stats.percentage}%)
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${stats.percentage}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {stats.read === stats.total
                                    ? "🎉 ¡Has leído todas las guías!"
                                    : `Sigue leyendo para completar tu aprendizaje`}
                            </p>
                        </div>

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
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {allPosts.filter(post => post.featured).map(post => (
                        <div
                            key={post.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto cursor-pointer hover:shadow-2xl transition-all duration-300 relative"
                            onClick={() => handleGuideClick(post)}
                        >
                            {/* Indicador de leído */}
                            {isRead(post.slug) && (
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                        ✅ Leído
                                    </span>
                                </div>
                            )}

                            <div className="md:flex">
                                <div className="md:w-1/2 relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                    {isRead(post.slug) && (
                                        <div className="absolute inset-0 bg-green-500/10 border-4 border-green-500/30 rounded-lg" />
                                    )}
                                </div>
                                <div className="md:w-1/2 p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full">
                                            ⭐ Featured
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {post.readTime} de lectura
                                        </span>
                                        {isRead(post.slug) && (
                                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                                                ✅ Completado
                                            </span>
                                        )}
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
                                            {isRead(post.slug) ? 'Releer Guía' : 'Leer Guía Completa'} →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* All Posts Grid */}
            <section className="pb-12 sm:pb-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center mb-6 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Todas las Guías
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    {stats.read} leídas
                                </span>
                                {' '}de{' '}
                                <span className="font-semibold">{stats.total}</span> guías
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-0">
                        {allPosts.map(post => (
                            <div
                                key={post.id}
                                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer relative ${
                                    isRead(post.slug) ? 'ring-2 ring-green-500' : ''
                                }`}
                                onClick={() => handleGuideClick(post)}
                            >
                                {/* Indicador de leído */}
                                {isRead(post.slug) && (
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                            ✅
                                        </span>
                                    </div>
                                )}

                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className={`w-full h-28 sm:h-32 object-cover ${
                                        isRead(post.slug) ? 'opacity-90' : ''
                                    }`}
                                />
                                <div className="p-4 sm:p-6">
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
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">
                                                {post.readTime}
                                            </span>
                                            {isRead(post.slug) && (
                                                <span className="text-xs text-green-600 font-medium">
                                                    ✓ Completado
                                                </span>
                                            )}
                                        </div>
                                        <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                            {isRead(post.slug) ? 'Releer' : 'Leer más'} →
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
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        ¿Listo para Implementar lo Aprendido?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Convierte este conocimiento evergreen en resultados reales para tu negocio
                    </p>
                    <BlogPageClient />
                </div>
            </section>

            {/* Modal */}
            <GuideModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                guide={selectedGuide}
            />
        </div>
    )
}