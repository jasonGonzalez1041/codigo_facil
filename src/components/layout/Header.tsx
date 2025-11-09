/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: any, sectionId: any) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Altura del header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <a
                    href="#inicio"
                    onClick={(e) => scrollToSection(e, "inicio")}
                    className="flex items-center z-10"
                >
                    <span className="text-2xl font-bold">
                        <span className={scrolled ? "text-gray-800 dark:text-white" : "text-white"}>Ezdel</span>
                        <span className={scrolled ? "text-gray-800 dark:text-white" : "text-white"}>CR</span>
                    </span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="#inicio"
                        onClick={(e) => scrollToSection(e, "inicio")}
                        className={`relative py-2 ${scrolled
                            ? "text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                            : "text-white hover:text-primary-200"
                            } transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full`}
                    >
                        Inicio
                    </a>
                    <a
                        href="#servicios"
                        onClick={(e) => scrollToSection(e, "servicios")}
                        className={`relative py-2 ${scrolled
                            ? "text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                            : "text-white hover:text-primary-200"
                            } transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full`}
                    >
                        Servicios
                    </a>
                    <a
                        href="#proyectos"
                        onClick={(e) => scrollToSection(e, "proyectos")}
                        className={`relative py-2 ${scrolled
                            ? "text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                            : "text-white hover:text-primary-200"
                            } transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full`}
                    >
                        Proyectos
                    </a>
                    <a
                        href="#blog"
                        onClick={(e) => scrollToSection(e, "blog")}
                        className={`relative py-2 ${scrolled
                            ? "text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                            : "text-white hover:text-primary-200"
                            } transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full`}
                    >
                        Blog
                    </a>
                    <a
                        href="#contacto"
                        onClick={(e) => scrollToSection(e, "contacto")}
                        className={`relative py-2 ${scrolled
                            ? "text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                            : "text-white hover:text-primary-200"
                            } transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full`}
                    >
                        Contacto
                    </a>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Button
                        onClick={(e) => scrollToSection(e, "contacto")}
                        className={scrolled ? "dark:bg-gray-800 dark:text-white" : "bg-white text-primary-700 hover:bg-white/90 dark:bg-gray-800 dark:text-white"}
                    >
                        Solicitar Consulta
                    </Button>
                    <ModeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-4">
                    <ModeToggle />
                    <button
                        className={`focus:outline-none z-10 ${scrolled ? "text-primary-900 dark:text-white" : "text-white"
                            }`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 absolute top-full left-0 w-full shadow-lg p-4 animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col space-y-4">
                        <a
                            href="#inicio"
                            onClick={(e) => scrollToSection(e, "inicio")}
                            className="text-lg font-medium text-primary-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                        >
                            Inicio
                        </a>
                        <a
                            href="#servicios"
                            onClick={(e) => scrollToSection(e, "servicios")}
                            className="text-lg font-medium text-primary-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                        >
                            Servicios
                        </a>
                        <a
                            href="#precios"
                            onClick={(e) => scrollToSection(e, "precios")}
                            className="text-lg font-medium text-primary-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                        >
                            Precios
                        </a>
                        <a
                            href="#proyectos"
                            onClick={(e) => scrollToSection(e, "proyectos")}
                            className="text-lg font-medium text-primary-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                        >
                            Proyectos
                        </a>
                        <a
                            href="#blog"
                            onClick={(e) => scrollToSection(e, "blog")}
                            className="text-lg font-medium text-primary-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                        >
                            Blog
                        </a>
                        <a
                            href="#contacto"
                            onClick={(e) => scrollToSection(e, "contacto")}
                            className="text-lg font-medium text-primary-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                        >
                            Contacto
                        </a>
                        <Button
                            onClick={(e) => scrollToSection(e, "contacto")}
                            className="w-full mt-2 dark:bg-primary dark:text-white"
                        >
                            Contactar Por Whatsapp
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}