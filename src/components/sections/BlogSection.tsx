"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Calendar,
    Clock,
    ArrowRight,
    Tag
} from "lucide-react";

const blogPosts = [
    {
        id: 1,
        title: "El Futuro del Desarrollo Web: Tendencias 2025",
        excerpt: "Descubre las tecnologías y frameworks que están revolucionando la forma en que construimos aplicaciones web modernas.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        category: "Desarrollo Web",
        date: "15 Marzo, 2025",
        readTime: "5 min",
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        title: "Diseño UI/UX: Principios para Crear Experiencias Inolvidables",
        excerpt: "Los secretos detrás de las interfaces que enamoran a los usuarios y convierten visitantes en clientes fieles.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        category: "Diseño",
        date: "10 Marzo, 2025",
        readTime: "7 min",
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        title: "Optimización de Rendimiento: Haz que tu App Vuele",
        excerpt: "Técnicas avanzadas para mejorar la velocidad de carga y la experiencia del usuario en aplicaciones web y móviles.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        category: "Performance",
        date: "5 Marzo, 2025",
        readTime: "6 min",
        color: "from-green-500 to-emerald-500"
    }
];

// Guarda este componente en: @/components/sections/BlogSection.tsx

export default function BlogSection() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animación del título
            gsap.fromTo(
                titleRef.current,
                {
                    y: -50,
                    opacity: 0,
                    scale: 0.9
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "top 30%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animación de las tarjetas
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        {
                            y: 100,
                            opacity: 0,
                            rotateY: -10,
                            scale: 0.95
                        },
                        {
                            y: 0,
                            opacity: 1,
                            rotateY: 0,
                            scale: 1,
                            duration: 0.8,
                            delay: index * 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                end: "top 50%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (index: number) => {
        const card = cardsRef.current[index];
        if (card) {
            gsap.to(card, {
                y: -15,
                duration: 0.4,
                ease: "power2.out"
            });

            // Animar la imagen
            const image = card.querySelector('.blog-image');
            gsap.to(image, {
                scale: 1.1,
                duration: 0.6,
                ease: "power2.out"
            });

            // Animar el overlay
            const overlay = card.querySelector('.blog-overlay');
            gsap.to(overlay, {
                opacity: 0.8,
                duration: 0.3,
                ease: "power2.out"
            });

            // Animar la flecha
            const arrow = card.querySelector('.blog-arrow');
            gsap.to(arrow, {
                x: 5,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (card) {
            gsap.to(card, {
                y: 0,
                duration: 0.4,
                ease: "power2.inOut"
            });

            const image = card.querySelector('.blog-image');
            gsap.to(image, {
                scale: 1,
                duration: 0.6,
                ease: "power2.inOut"
            });

            const overlay = card.querySelector('.blog-overlay');
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });

            const arrow = card.querySelector('.blog-arrow');
            gsap.to(arrow, {
                x: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden"
        >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Título de la sección */}
                <motion.div
                    ref={titleRef}
                    className="text-center mb-16"
                >
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3 block">
                        Nuestro Blog
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Últimas{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Publicaciones
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Insights, tutoriales y las últimas tendencias en desarrollo web,
                        diseño y tecnología para mantener tu negocio a la vanguardia.
                    </p>
                </motion.div>

                {/* Grid de posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogPosts.map((post, index) => (
                        <div
                            key={post.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                        >
                            {/* Imagen */}
                            <div className="relative h-56 overflow-hidden">
                                <div
                                    className="blog-image absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${post.image})` }}
                                ></div>
                                <div className={`blog-overlay absolute inset-0 bg-gradient-to-br ${post.color} opacity-0 transition-opacity`}></div>

                                {/* Categoría flotante */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-semibold rounded-full flex items-center gap-1">
                                        <Tag className="w-3 h-3" />
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-6">
                                {/* Metadata */}
                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Título */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                {/* Botón de leer más */}
                                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
                                    Leer más
                                    <ArrowRight className="blog-arrow w-4 h-4 ml-1" />
                                </div>
                            </div>

                            {/* Borde animado */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* CTA para ver todos los posts */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                        Ver Todos los Artículos
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}