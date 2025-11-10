/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { gsap } from "gsap";
import { useModalStore } from "@/store/modalStore";

export default function Header() {
    const { isAnyModalOpen } = useModalStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animación de entrada con GSAP
        const tl = gsap.timeline();
        
        tl.set([logoRef.current, navRef.current, ctaRef.current], { 
            opacity: 0, 
            y: -30 
        })
        .to(headerRef.current, {
            duration: 0.8,
            backdropFilter: "blur(0px)",
            ease: "power3.out"
        })
        .to(logoRef.current, {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: "back.out(1.7)"
        })
        .to(navRef.current, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        }, "-=0.4")
        .to(ctaRef.current, {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: "back.out(1.4)"
        }, "-=0.6");

        setIsLoaded(true);

        // Animación de scroll con GSAP
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const isScrolled = scrollY > 50;
            
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
                
                // Las transiciones ahora se manejan con clases CSS
                // GSAP solo maneja animaciones específicas si es necesario
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);

    const scrollToSection = (e: any, sectionId: any) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100; // Altura del header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        
        if (!isMenuOpen) {
            // Abrir menú
            gsap.set(mobileMenuRef.current, { display: "flex" });
            gsap.fromTo(mobileMenuRef.current, 
                { 
                    opacity: 0, 
                    y: -20,
                    scale: 0.95
                }, 
                { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                }
            );
        } else {
            // Cerrar menú
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                y: -20,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(mobileMenuRef.current, { display: "none" });
                }
            });
        }
    };

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
                    {/* Logo con animación */}
                    <div
                        ref={logoRef}
                        className="flex items-center group cursor-pointer"
                        onClick={(e) => scrollToSection(e, "inicio")}
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
                    </div>

                    {/* Navegación de Escritorio */}
                    <nav 
                        ref={navRef}
                        className="hidden lg:flex items-center space-x-1"
                    >
                        {[
                            { href: "#inicio", label: "Inicio" },
                            { href: "#servicios", label: "Servicios" },
                            { href: "/blog", label: "Blog", isLink: true },
                            { href: "#precios", label: "Precios" },
                            { href: "#contacto", label: "Contacto" }
                        ].map((item, index) => (
                            item.isLink ? (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                                        scrolled 
                                            ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800" 
                                            : "text-white/90 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                                </Link>
                            ) : (
                                <button
                                    key={index}
                                    onClick={(e) => scrollToSection(e, item.href.substring(1))}
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
                            )
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
                        
                        <ModeToggle />
                    </div>

                    {/* Botón de Menú Móvil */}
                    <div className="flex lg:hidden items-center space-x-3">
                        <ModeToggle />
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

            {/* Navegación Móvil Moderna */}
            <div
                ref={mobileMenuRef}
                className="lg:hidden fixed inset-0 z-40 hidden"
                style={{ display: "none" }}
            >
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={toggleMobileMenu}
                />
                
                {/* Panel del menú */}
                <div className="absolute top-20 right-6 left-6 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-6">
                        <nav className="space-y-1">
                            {[
                                { href: "#inicio", label: "Inicio", icon: "🏠" },
                                { href: "#servicios", label: "Servicios", icon: "⚡" },
                                { href: "/blog", label: "Blog", icon: "📝", isLink: true },
                                { href: "#precios", label: "Precios", icon: "💰" },
                                { href: "#contacto", label: "Contacto", icon: "📱" }
                            ].map((item, index) => (
                                item.isLink ? (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={toggleMobileMenu}
                                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 group"
                                    >
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </span>
                                        <span className="text-lg font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            {item.label}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                    </Link>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={(e) => scrollToSection(e, item.href.substring(1))}
                                        className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 group"
                                    >
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </span>
                                        <span className="text-lg font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            {item.label}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                    </button>
                                )
                            ))}
                        </nav>
                        
                        {/* CTA Móvil */}
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => {
                                    window.open('https://wa.me/56995022549?text=Hola,%20me%20interesa%20una%20consulta%20gratuita%20desde%20el%20móvil', '_blank');
                                    toggleMobileMenu();
                                }}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-3"
                            >
                                <Zap className="w-5 h-5" />
                                <span>Consulta Gratuita</span>
                                <ArrowUpRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}