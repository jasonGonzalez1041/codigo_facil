/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Code, Zap, Moon, Sun, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModalStore } from "@/store/modalStore";

// Registrar ScrollTrigger solo una vez
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
    const { isAnyModalOpen } = useModalStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileBackdropRef = useRef<HTMLDivElement>(null);

    // Determinar si estamos en la página de inicio
    const isHomePage = pathname === '/';

    // Efecto para el tema
    useEffect(() => {
        // Verificar el tema guardado o la preferencia del sistema
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Efecto para bloquear el scroll cuando el menú móvil está abierto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Función para alternar el tema
    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    useEffect(() => {
        // Usar GSAP Context para manejar correctamente las animaciones
        const ctx = gsap.context(() => {
            // VERIFICAR que los elementos existen antes de animar
            const logoEl = logoRef.current;
            const navEl = navRef.current;
            const ctaEl = ctaRef.current;

            if (logoEl && navEl && ctaEl) {
                const tl = gsap.timeline();

                tl.set([logoEl, navEl, ctaEl], {
                    opacity: 0,
                    y: -30
                })
                    .to(headerRef.current, {
                        duration: 0.8,
                        backdropFilter: "blur(0px)",
                        ease: "power3.out"
                    })
                    .to(logoEl, {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        ease: "back.out(1.7)"
                    })
                    .to(navEl, {
                        duration: 0.8,
                        opacity: 1,
                        y: 0,
                        ease: "power3.out"
                    }, "-=0.4")
                    .to(ctaEl, {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        ease: "back.out(1.4)"
                    }, "-=0.6");
            }

            setIsLoaded(true);
        }, headerRef); // Usar headerRef como contexto

        // Animación de scroll - versión simplificada sin GSAP
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const isScrolled = scrollY > 50;

            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            ctx.revert(); // Limpiar contexto GSAP
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrolled]);

    const handleNavigation = (e: any, target: string) => {
        e.preventDefault();
        e.stopPropagation(); // Prevenir propagación

        // Cerrar menú móvil primero
        setIsMenuOpen(false);

        // Pequeño delay para permitir la animación de cierre
        setTimeout(() => {
            // Si el target es una ruta absoluta (como /blog)
            if (target.startsWith('/')) {
                router.push(target);
                return;
            }

            // Si estamos en la página de inicio, hacer scroll
            if (isHomePage) {
                const element = document.getElementById(target);
                if (element) {
                    const offset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            } else {
                // Si no estamos en la página de inicio, navegar a la home con hash
                router.push(`/#${target}`);
            }
        }, 300);
    };

    const toggleMobileMenu = () => {
        const newState = !isMenuOpen;
        setIsMenuOpen(newState);

        if (newState) {
            // Abrir menú
            if (mobileMenuRef.current && mobileBackdropRef.current) {
                gsap.set([mobileMenuRef.current, mobileBackdropRef.current], {
                    display: "flex",
                    opacity: 0
                });

                gsap.to([mobileMenuRef.current, mobileBackdropRef.current], {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Animación específica del panel del menú
                gsap.fromTo(mobileMenuRef.current,
                    {
                        y: -20,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                    }
                );
            }
        } else {
            // Cerrar menú
            if (mobileMenuRef.current && mobileBackdropRef.current) {
                gsap.to([mobileMenuRef.current, mobileBackdropRef.current], {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        if (mobileMenuRef.current && mobileBackdropRef.current) {
                            gsap.set([mobileMenuRef.current, mobileBackdropRef.current], {
                                display: "none"
                            });
                        }
                    }
                });
            }
        }
    };

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
        if (mobileMenuRef.current && mobileBackdropRef.current) {
            gsap.to([mobileMenuRef.current, mobileBackdropRef.current], {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (mobileMenuRef.current && mobileBackdropRef.current) {
                        gsap.set([mobileMenuRef.current, mobileBackdropRef.current], {
                            display: "none"
                        });
                    }
                }
            });
        }
    };

    const navigationItems = [
        { id: "inicio", label: "Inicio", icon: "🏠" },
        { id: "servicios", label: "Servicios", icon: "⚡" },
        { id: "/blog", label: "Blog", icon: "📝" },
        { id: "precios", label: "Precios", icon: "💰" },
        { id: "contacto", label: "Contacto", icon: "📱" }
    ];

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full transition-all duration-500 ${
                isAnyModalOpen
                    ? "-translate-y-full opacity-0 pointer-events-none"
                    : "translate-y-0 opacity-100"
            } ${
                scrolled
                    ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg z-50"
                    : "bg-transparent backdrop-blur-none border-b border-transparent z-50"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <button
                        onClick={(e) => handleNavigation(e, isHomePage ? "inicio" : "/")}
                        className="flex items-center group cursor-pointer"
                    >
                        <div className="relative">
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <Code
                                        className={`w-8 h-8 transition-all duration-300 group-hover:rotate-12 ${
                                            scrolled ? "text-blue-600 dark:text-blue-400" : "text-white"
                                        }`}
                                    />
                                    <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </div>
                                <div className="font-bold text-xl">
                                    <span className={`transition-colors duration-300 ${
                                        scrolled ? "text-gray-900 dark:text-white" : "text-white"
                                    }`}>
                                        Codigo
                                    </span>
                                    <span className="text-blue-600 dark:text-blue-400">
                                        Facil
                                    </span>
                                    <span className={`transition-colors duration-300 ${
                                        scrolled ? "text-gray-500 dark:text-gray-400" : "text-blue-200"
                                    }`}>
                                        .com
                                    </span>
                                </div>
                            </div>
                        </div>
                    </button>

                    {/* Navegación de Escritorio */}
                    <nav
                        ref={navRef}
                        className="hidden lg:flex items-center space-x-1"
                    >
                        {navigationItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={(e) => handleNavigation(e, item.id)}
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                                    scrolled
                                        ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                        : "text-white/90 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                <span className="relative z-10">{item.label}</span>
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                            </button>
                        ))}
                    </nav>

                    {/* CTA y controles */}
                    <div
                        ref={ctaRef}
                        className="hidden lg:flex items-center space-x-4"
                    >
                        <button
                            onClick={() => window.open('https://wa.me/56995022549?text=Hola,%20me%20interesa%20una%20consulta%20gratuita%20para%20mi%20proyecto%20web', '_blank')}
                            className={`group relative px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden ${
                                scrolled
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                                    : "bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white hover:text-gray-900"
                            }`}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Consulta Gratis
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <div className={`w-px h-6 ${scrolled ? "bg-gray-300 dark:bg-gray-600" : "bg-white/20"}`}></div>

                        {/* Botón de tema simplificado */}
                        <button
                            onClick={toggleTheme}
                            className={`relative p-2 rounded-lg transition-all duration-300 group ${
                                scrolled
                                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                                    : "text-white hover:bg-white/10"
                            }`}
                            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            ) : (
                                <Moon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            )}
                        </button>
                    </div>

                    {/* Botón de Menú Móvil */}
                    <div className="flex lg:hidden items-center space-x-3">
                        {/* Botón de tema móvil */}
                        <button
                            onClick={toggleTheme}
                            className={`relative p-2 rounded-lg transition-all duration-300 group ${
                                scrolled
                                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                                    : "text-white hover:bg-white/10"
                            }`}
                            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            ) : (
                                <Moon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            )}
                        </button>

                        <button
                            onClick={toggleMobileMenu}
                            className={`relative p-2 rounded-lg transition-all duration-300 group ${
                                scrolled
                                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                                    : "text-white hover:bg-white/10"
                            }`}
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-6 h-6">
                                <span
                                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                                        isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                                    }`}
                                />
                                <span
                                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${
                                        isMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                                />
                                <span
                                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                                        isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navegación Móvil - Versión Compacta */}
            <div
                ref={mobileBackdropRef}
                className="lg:hidden fixed inset-0 z-40 hidden flex-col"
                style={{ display: "none" }}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={closeMobileMenu}
                />

                {/* Panel del menú compacto */}
                <div
                    ref={mobileMenuRef}
                    className="absolute top-16 right-4 left-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-[75vh]"
                    style={{ display: "none" }}
                >
                    {/* Header del menú móvil compacto */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">

                        <button
                            onClick={closeMobileMenu}
                            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="p-3 max-h-[60vh] overflow-y-auto">
                        <nav className="space-y-0.5">
                            {navigationItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => handleNavigation(e, item.id)}
                                    className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-200 group"
                                >
                                    <span className="text-lg group-hover:scale-105 transition-transform duration-200">
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                        {item.label}
                                    </span>
                                    <ArrowUpRight className="w-3 h-3 ml-auto text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                                </button>
                            ))}
                        </nav>

                        {/* CTA Móvil compacto */}
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => {
                                    window.open('https://wa.me/56995022549?text=Hola,%20me%20interesa%20una%20consulta%20gratuita%20desde%20el%20móvil', '_blank');
                                    closeMobileMenu();
                                }}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <Zap className="w-4 h-4" />
                                <span>Consulta Gratuita</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}