"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Globe,
    ShoppingBag,
    Calendar,
    CreditCard,
    ExternalLink,
    Info,
    Sparkles
} from "lucide-react";

const projects = [
    {
        id: 1,
        title: "EcomPlus Costa Rica",
        category: "E-Commerce",
        description: "Tienda online completa para empresa costarricense con pasarelas de pago locales, gestión de inventario y sistema de envíos nationwide.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        icon: ShoppingBag,
        gradient: "from-green-500 via-emerald-500 to-blue-500",
        demoUrl: "https://demo-ecom.codigofacil.com",
        detailsUrl: "/proyectos/ecomplus-costa-rica",
        tags: ["Next.js", "Stripe", "PayPal", "PostgreSQL"]
    },
    {
        id: 2,
        title: "TurisCR Platform",
        category: "Tourism Platform",
        description: "Plataforma turística para promocionar destinos de Costa Rica con sistema de reservas, tours virtuales y gestión de hoteles.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        icon: Calendar,
        gradient: "from-blue-500 via-cyan-500 to-green-500",
        demoUrl: "https://demo-turis.codigofacil.com",
        detailsUrl: "/proyectos/turiscr-platform",
        tags: ["React", "Maps API", "Booking System", "CMS"]
    },
    {
        id: 3,
        title: "ClinicaPro Management",
        category: "Healthcare SaaS",
        description: "Sistema integral para gestión de clínicas médicas con expedientes digitales, citas online y facturación automatizada.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80",
        icon: CreditCard,
        gradient: "from-purple-500 via-pink-500 to-red-500",
        demoUrl: "https://demo-clinica.codigofacil.com",
        detailsUrl: "/proyectos/clinicapro-management",
        tags: ["Node.js", "PostgreSQL", "Security", "API"]
    },
    {
        id: 4,
        title: "AgroTech Dashboard",
        category: "Agriculture Tech",
        description: "Dashboard inteligente para agricultores costarricenses con monitoreo de cultivos, predicción climática y análisis de productividad.",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
        icon: Globe,
        gradient: "from-orange-500 via-yellow-500 to-green-500",
        demoUrl: "https://demo-agro.codigofacil.com",
        detailsUrl: "/proyectos/agrotech-dashboard",
        tags: ["IoT", "React", "Charts", "Real-time Data"]
    }
];

export default function ProjectsSection() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animación del título principal
            gsap.fromTo(
                titleRef.current,
                {
                    y: -60,
                    opacity: 0,
                    rotateX: -20,
                    scale: 0.9
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 40%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animación del subtítulo
            gsap.fromTo(
                subtitleRef.current,
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 40%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animación de las tarjetas de proyectos
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    // Animación de entrada
                    gsap.fromTo(
                        card,
                        {
                            y: 120,
                            opacity: 0,
                            scale: 0.8,
                            rotateY: -15
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotateY: 0,
                            duration: 1,
                            delay: index * 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 90%",
                                end: "top 50%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );

                    // Efecto de brillo que pasa por la tarjeta
                    const shimmer = card.querySelector('.shimmer-effect');
                    if (shimmer) {
                        gsap.fromTo(
                            shimmer,
                            {
                                x: '-100%'
                            },
                            {
                                x: '200%',
                                duration: 2,
                                delay: index * 0.15 + 1,
                                ease: "power2.inOut",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 90%",
                                    toggleActions: "play none none none"
                                }
                            }
                        );
                    }
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (index: number) => {
        const card = cardsRef.current[index];
        if (card) {
            // Efecto de levitación y escala
            gsap.to(card, {
                y: -15,
                scale: 1.03,
                duration: 0.4,
                ease: "power2.out"
            });

            // Animar el ícono
            const icon = card.querySelector('.project-icon');
            gsap.to(icon, {
                rotation: 360,
                scale: 1.1,
                duration: 0.6,
                ease: "back.out(1.7)"
            });

            // Animar la imagen para hacer zoom
            const image = card.querySelector('.project-image');
            gsap.to(image, {
                scale: 1.1,
                duration: 0.6,
                ease: "power2.out"
            });

            // Animar el overlay
            const overlay = card.querySelector('.project-overlay');
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            // Animar los botones desde abajo
            const buttons = card.querySelectorAll('.action-button');
            gsap.fromTo(
                buttons,
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }
            );

            // Animar las tags
            const tags = card.querySelectorAll('.project-tag');
            gsap.fromTo(
                tags,
                {
                    scale: 0,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "back.out(1.7)"
                }
            );

            // Efecto de pulso en el borde
            const border = card.querySelector('.card-border');
            gsap.to(border, {
                scale: 1.02,
                opacity: 1,
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
                scale: 1,
                duration: 0.4,
                ease: "power2.inOut"
            });

            const icon = card.querySelector('.project-icon');
            gsap.to(icon, {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.inOut"
            });

            const image = card.querySelector('.project-image');
            gsap.to(image, {
                scale: 1,
                duration: 0.6,
                ease: "power2.inOut"
            });

            const overlay = card.querySelector('.project-overlay');
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });

            const border = card.querySelector('.card-border');
            gsap.to(border, {
                scale: 1,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardsRef.current[index];
        if (card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: "power2.out",
                transformPerspective: 1000
            });

            // Mover el brillo según el mouse
            const glowEffect = card.querySelector('.glow-effect');
            if (glowEffect) {
                gsap.to(glowEffect, {
                    x: x - rect.width / 2,
                    y: y - rect.height / 2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
        >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Título de la sección */}
                <div className="text-center mb-20">
                    <motion.div ref={titleRef}>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span className="text-purple-600 dark:text-purple-400 text-sm font-bold uppercase tracking-wider">
                                Portfolio
                            </span>
                            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 animate-pulse" />
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                            Proyectos que{" "}
                            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                                Inspiran
                            </span>
                        </h2>
                    </motion.div>
                    <motion.p
                        ref={subtitleRef}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Cada proyecto es una historia de éxito. Descubre cómo transformamos
                        ideas en experiencias digitales extraordinarias.
                    </motion.p>
                </div>

                {/* Grid de proyectos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, index) => {
                        const Icon = project.icon;
                        return (
                            <div
                                key={project.id}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                                style={{
                                    transformStyle: "preserve-3d",
                                    perspective: '1000px'
                                }}
                            >
                                {/* Borde animado */}
                                <div className="card-border absolute inset-0 rounded-3xl opacity-0 pointer-events-none z-20">
                                    <div className={`absolute inset-0 rounded-3xl border-2 bg-gradient-to-r ${project.gradient} opacity-50`}></div>
                                </div>

                                {/* Contenedor principal */}
                                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden h-[550px]">
                                    {/* Efecto de brillo que pasa */}
                                    <div className="shimmer-effect absolute inset-0 w-full h-full pointer-events-none z-30">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"></div>
                                    </div>

                                    {/* Efecto de brillo que sigue el mouse */}
                                    <div className="glow-effect absolute w-64 h-64 bg-white/20 dark:bg-white/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2"></div>

                                    {/* Imagen del proyecto */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="project-image object-cover"
                                            unoptimized
                                        />

                                        {/* Overlay oscuro sobre la imagen */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                        {/* Ícono flotante */}
                                        <div className="absolute top-6 right-6 project-icon z-10">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} p-3 shadow-2xl backdrop-blur-sm`}>
                                                <Icon className="w-full h-full text-white" strokeWidth={2} />
                                            </div>
                                        </div>

                                        {/* Categoría badge */}
                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-lg">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="relative p-8">
                                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="project-tag px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Overlay con botones */}
                                    <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 flex items-end p-8 pointer-events-none group-hover:pointer-events-auto z-10">
                                        <div className="w-full space-y-4">

                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => window.open(project.demoUrl, '_blank')}
                                                    className="action-button flex items-center gap-2 px-6 py-3 bg-purple-600/20 backdrop-blur-md text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer"
                                                >
                                                    <ExternalLink />
                                                    <span className="relative z-10">Ver Demo</span>
                                                </button>
                                                <button
                                                    onClick={() => window.open(project.detailsUrl, '_blank')}
                                                    className="action-button flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer"
                                                >
                                                    <Info className="w-5 h-5" />
                                                    Ver Detalles
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Final */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <div className="inline-block">
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            ¿Tienes un proyecto en mente?{" "}
                            <span className="font-bold text-purple-600 dark:text-purple-400">
                                Hagámoslo realidad juntos
                            </span>
                        </p>
                        <button 
                            onClick={() => window.open('https://wa.me/56950225491?text=Hola,%20estoy%20interesado%20en%20desarrollar%20un%20proyecto%20similar%20a%20los%20que%20vi%20en%20su%20portfolio.%20%C2%BFPodemos%20conversar?', '_blank')}
                            className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                💬 Conversemos tu proyecto
                                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </motion.div>
            </div>

            
        </section>
    );
}