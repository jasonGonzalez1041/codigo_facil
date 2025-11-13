"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Tag, ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    guide: {
        id: number;
        title: string;
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

                            {/* Contenido - Scrollable */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6 md:p-8">
                                    {/* Excerpt */}
                                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                        {guide.excerpt}
                                    </p>

                                    {/* Contenido extendido */}
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            Este artículo explora en profundidad los temas mencionados y ofrece insights valiosos
                                            para profesionales del desarrollo web y diseño.
                                        </p>

                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                            Puntos Clave
                                        </h3>
                                        <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-6">
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span>Análisis detallado de las tendencias actuales</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span>Casos de estudio y ejemplos prácticos</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span>Mejores prácticas y recomendaciones</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span>Recursos adicionales para profundizar</span>
                                            </li>
                                        </ul>

                                        {/* Más contenido de ejemplo */}
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                ¿Por qué esta guía es importante?
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                En el mundo actual del desarrollo web, mantenerse actualizado con las mejores prácticas
                                                es crucial para el éxito de cualquier proyecto. Esta guía te proporciona los fundamentos
                                                necesarios para tomar decisiones informadas.
                                            </p>

                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Aplicación práctica
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Todos los conceptos presentados incluyen ejemplos prácticos que puedes implementar
                                                inmediatamente en tus proyectos actuales.
                                            </p>
                                        </div>

                                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                                                💡 <strong>Tip profesional:</strong> Este contenido está disponible en nuestro blog
                                                con información más detallada y ejemplos de código.
                                            </p>
                                        </div>
                                    </div>
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