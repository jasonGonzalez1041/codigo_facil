"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Tag, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { getBlogContent } from "@/lib/blog-content";

// Función para formatear markdown a HTML básico
function formatMarkdownContent(markdown: string): string {
  if (!markdown) return '';
  
  return markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>')
    
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm">$1</code>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Lists
    .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
    .replace(/(<li.*<\/li>)/s, '<ul class="list-disc pl-6 mb-6">$1</ul>')
    
    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic my-6">$1</blockquote>')
    
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^\s*(?!<[h1-6]|<ul|<ol|<pre|<blockquote)/gm, '<p class="mb-4">')
    .replace(/(?<!>)$/gm, '</p>')
    
    // Clean up
    .replace(/<p class="mb-4"><\/p>/g, '')
    .replace(/(<\/[^>]+>)<p class="mb-4">/g, '$1');

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    guide: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        image: string;
        category: string;
        date: string;
        readTime: string;
        color: string;
        fullContent?: string; // Contenido extendido opcional
    } | null;
}

export default function GuideModal({ isOpen, onClose, guide }: GuideModalProps) {
    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Cerrar modal con Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!guide) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[95vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header con imagen - Altura fija */}
                            <div className="relative h-64 md:h-80 flex-shrink-0 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={guide.image}
                                    alt={guide.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${guide.color} opacity-60`} />

                                {/* Botón cerrar */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Categoría */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-semibold rounded-full flex items-center gap-1">
                                        <Tag className="w-3 h-3" />
                                        {guide.category}
                                    </span>
                                </div>

                                {/* Título */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
                                        {guide.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-white/80">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {guide.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {guide.readTime}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido Completo - Scrollable */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6 md:p-8">
                                    {/* Debug info */}
                                    <div className="mb-4 p-2 bg-red-100 text-red-800 text-xs">
                                        Debug: slug={guide.slug}, content={getBlogContent(guide.slug) ? 'FOUND' : 'NOT FOUND'}
                                    </div>
                                    
                                    {/* Contenido markdown completo */}
                                    <div 
                                        className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200
                                        prose-headings:text-gray-900 dark:prose-headings:text-white
                                        prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-8 prose-h1:mt-12
                                        prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-10
                                        prose-h3:text-xl prose-h3:font-bold prose-h3:mb-4 prose-h3:mt-8
                                        prose-p:mb-4 prose-p:leading-relaxed
                                        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                                        prose-code:bg-gray-100 dark:prose-code:bg-gray-800 
                                        prose-code:text-blue-600 dark:prose-code:text-blue-400
                                        prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                                        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-6 prose-pre:overflow-x-auto
                                        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                                        prose-li:mb-2 prose-li:text-gray-700 dark:prose-li:text-gray-300
                                        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6"
                                        dangerouslySetInnerHTML={{ 
                                            __html: formatMarkdownContent(getBlogContent(guide.slug) || guide.excerpt || 'Contenido no disponible.')
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Footer del modal - Fijo en la parte inferior */}
                            <div className="flex-shrink-0 px-6 md:px-8 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        onClick={() => {
                                            window.open('/blog', '_blank');
                                        }}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                    >
                                        Leer artículo completo
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}