"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Tag, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { getBlogContent } from "@/lib/blog-content";

// Función para formatear markdown a HTML básico
function formatMarkdownContent(markdown: string): string {
    if (!markdown) return '';

    let formatted = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>')

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
        .replace(/^- (.*$)/gim, '<li class="mb-2">$1</li>')
        .replace(/(<li class="mb-2">.*<\/li>)/s, '<ul class="list-disc pl-6 mb-6">$1</ul>')

        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 italic my-6">$1</blockquote>')

        // Paragraphs
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');

    // Asegurar que el contenido esté envuelto en párrafos si no hay otros elementos
    if (!formatted.includes('<h1') && !formatted.includes('<ul') && !formatted.includes('<pre')) {
        formatted = formatted.split('<br><br>').map(paragraph => {
            if (paragraph && !paragraph.startsWith('<')) {
                return `<p class="mb-4">${paragraph}</p>`;
            }
            return paragraph;
        }).join('');
    }

    return formatted;
}

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
        fullContent?: string;
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

    const content = getBlogContent(guide.slug);

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

                            {/* Contenido del modal */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6 md:p-8">

                                    {/* Información de debug */}
                                    <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <p className="text-sm">
                                            <strong>DEBUG:</strong> slug="{guide.slug}" |
                                            content={content ? '✅ ENCONTRADO' : '❌ NO ENCONTRADO'}
                                        </p>
                                    </div>

                                    {/* Contenido markdown */}
                                    <div
                                        className="prose prose-lg dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: content ? formatMarkdownContent(content) : '<p>Contenido no disponible</p>'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Footer del modal */}
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
                                            const message = encodeURIComponent('Hola, me interesa implementar los conocimientos de los artículos en un proyecto. ¿Podrían ayudarme?');
                                            window.open(`https://wa.me/56950225491?text=${message}`, '_blank');
                                        }}
                                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                    >
                                        {/* Ícono de WhatsApp */}
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.447"/>
                                        </svg>
                                        ¿Quiere implementar estos conocimientos? Lo ayudamos
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