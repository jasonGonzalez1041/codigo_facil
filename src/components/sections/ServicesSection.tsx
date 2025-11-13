"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ServiceModal } from "@/components/ui/service-modal";
import { servicesData, type Service } from "@/data/services";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { createPortal } from "react-dom";

export default function ServicesSection() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openServiceModal = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeServiceModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedService(null), 300);
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        const ctx = gsap.context(() => {
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

            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        { y: 100, opacity: 0, rotateX: -15, scale: 0.9 },
                        {
                            y: 0,
                            opacity: 1,
                            rotateX: 0,
                            scale: 1,
                            duration: 0.8,
                            delay: index * 0.1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                end: "top 50%",
                                toggleActions: "play none none reverse",
                            },
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
            gsap.to(card, { scale: 1.05, y: -10, duration: 0.3, ease: "power2.out" });
            const icon = card.querySelector(".service-icon");
            gsap.to(icon, { rotation: 360, scale: 1.2, duration: 0.5, ease: "back.out(1.7)" });
        }
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (card) {
            gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.inOut" });
            const icon = card.querySelector(".service-icon");
            gsap.to(icon, { rotation: 0, scale: 1, duration: 0.3, ease: "power2.inOut" });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
        >
            {/* Fondos decorativos */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Título */}
                <motion.div ref={titleRef} className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3 block">
            Nuestros Servicios
          </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Soluciones Digitales{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              de Alto Impacto
            </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Transformamos ideas en productos digitales excepcionales que impulsan
                        el crecimiento de tu negocio con tecnología de vanguardia.
                    </p>
                </motion.div>

                {/* Grid de servicios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <div
                            key={service.id}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}

                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            onClick={() => openServiceModal(service)}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                            style={{ perspective: "1000px" }}
                        >
                            <div className="relative p-8 pointer-events-none">
                                <div className="service-icon w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-3.5 shadow-lg flex items-center justify-center text-3xl mb-6 pointer-events-none">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors pointer-events-none">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed pointer-events-none">
                                    {service.description}
                                </p>

                                <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400 pointer-events-none">
                                    <span>Desde {service.price.split(" - ")[0]}</span>
                                    <span>{service.timeline}</span>
                                </div>

                                {/* Botón Ver detalles */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 pointer-events-auto">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openServiceModal(service);
                                        }}
                                        className="text-primary-600 dark:text-primary-400 font-semibold text-sm flex items-center"
                                    >
                                        Ver detalles
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal aislado con Portal */}
            {selectedService &&
                createPortal(
                    <ServiceModal
                        isOpen={isModalOpen}
                        onClose={closeServiceModal}
                        service={selectedService}
                    />,
                    document.body
                )}
        </section>
    );
}
