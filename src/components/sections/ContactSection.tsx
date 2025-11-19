"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactFormLatam from "@/components/ui/contact-form-latam";

export default function ContactSection() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animación del título
            if (titleRef.current && sectionRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { y: -50, opacity: 0, scale: 0.8 },
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
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Animación del formulario
            if (formCardRef.current) {
                gsap.fromTo(
                    formCardRef.current,
                    { x: -100, opacity: 0, rotateY: -15 },
                    {
                        x: 0,
                        opacity: 1,
                        rotateY: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: formCardRef.current,
                            start: "top 80%",
                            end: "top 40%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contacto"
            ref={sectionRef}
            className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 overflow-hidden"
        >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <motion.h2
                        ref={titleRef}
                        className="text-3xl md:text-4xl font-bold mb-4 text-center relative"
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                    >
                        <span
                            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                            ¿Listo para empezar tu proyecto?
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                    >
                        Hablemos sobre tu visión y cómo podemos hacerla realidad
                    </motion.p>
                </div>

                <div ref={formCardRef} className="max-w-4xl mx-auto">
                    <ContactFormLatam />
                </div>
            </div>
        </section>
    );
}