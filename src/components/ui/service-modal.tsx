"use client";

import { useEffect, useRef } from "react";
import { useModalStore } from "@/store/modalStore";
import { gsap } from "gsap";

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: {
        title: string;
        description: string;
        icon: string;
        fullDescription: string;
        benefits: string[];
        process: string[];
        technologies?: string[];
        price: string;
        timeline: string;
    };
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
    const { setIsAnyModalOpen } = useModalStore();
    const processRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
    const restartIndicatorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setIsAnyModalOpen(true);
        } else {
            document.body.style.overflow = "unset";
            setIsAnyModalOpen(false);
        }

        return () => {
            document.body.style.overflow = "unset";
            setIsAnyModalOpen(false);
        };
    }, [isOpen, setIsAnyModalOpen]);

    // === Animación GSAP del proceso ===
    useEffect(() => {
        if (!isOpen || !service.process.length) return;

        const totalSteps = service.process.length;
        const stepDuration = 1;

        const mainTimeline = gsap.timeline({ repeat: -1 });

        processRefs.current.forEach((ref) => {
            if (ref) {
                gsap.set(ref, {
                    background: "linear-gradient(to right, #d1d5db, #9ca3af)",
                    color: "#374151",
                    scale: 1,
                    boxShadow: "none",
                });
            }
        });

        textRefs.current.forEach((ref) => {
            if (ref) {
                gsap.set(ref, {
                    color: "#9ca3af",
                    x: 0,
                    fontWeight: "normal",
                });
            }
        });

        pulseRefs.current.forEach((ref) => {
            if (ref) gsap.set(ref, { opacity: 0, scale: 0 });
        });

        if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { width: "2rem", opacity: 1 });
        }

        service.process.forEach((_, index) => {
            const stepTimeline = gsap.timeline();

            stepTimeline
                .to(processRefs.current[index], {
                    background: "linear-gradient(to right, #8b5cf6, #a855f7)",
                    color: "white",
                    scale: 1.1,
                    boxShadow:
                        "0 0 25px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)",
                    duration: 0.2,
                    ease: "back.out(1.7)",
                })
                .to(
                    textRefs.current[index],
                    {
                        color: "#111827",
                        x: 4,
                        fontWeight: "600",
                        textShadow: "0 0 8px rgba(139, 92, 246, 0.3)",
                        duration: 0.2,
                    },
                    "<"
                )
                .to(
                    pulseRefs.current[index],
                    { opacity: 0.6, scale: 1, duration: 0.3 },
                    "<"
                )
                .to({}, { duration: 0.5 })
                .to(pulseRefs.current[index], {
                    opacity: 0,
                    scale: 1.2,
                    duration: 0.3,
                })
                .to(
                    processRefs.current[index],
                    {
                        background: "linear-gradient(to right, #d1d5db, #9ca3af)",
                        color: "#374151",
                        scale: 1,
                        boxShadow: "none",
                        duration: 0.2,
                    },
                    "-=0.1"
                )
                .to(
                    textRefs.current[index],
                    {
                        color: "#9ca3af",
                        x: 0,
                        fontWeight: "normal",
                        duration: 0.2,
                    },
                    "<"
                );

            mainTimeline.add(stepTimeline, index * stepDuration);

            if (progressBarRef.current) {
                const progressWidth = `${((index + 1) / totalSteps) * 100}%`;
                mainTimeline.to(
                    progressBarRef.current,
                    {
                        width: progressWidth,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    index * stepDuration + 0.2
                );
            }
        });

        const restartTimeline = gsap.timeline();
        restartTimeline
            .to(progressBarRef.current, { opacity: 0.3, duration: 0.3 })
            .to(
                restartIndicatorRef.current,
                {
                    scale: 1.1,
                    opacity: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                },
                "<"
            )
            .to({}, { duration: 0.4 })
            .to(progressBarRef.current, {
                width: "2rem",
                opacity: 1,
                duration: 0.5,
            })
            .to(
                restartIndicatorRef.current,
                { scale: 1, opacity: 0.7, duration: 0.3 },
                "<"
            );

        mainTimeline.add(restartTimeline, totalSteps * stepDuration);

        return () => {
            mainTimeline.kill();
        };
    }, [isOpen, service.process]);

    const handleWhatsApp = () => {
        const message = `¡Hola! Estoy interesado en el servicio de *${service.title}* que vi en CodigoFacil.com.

🎯 *Servicio de interés:* ${service.title}
💰 *Presupuesto estimado:* ${service.price}
⏱️ *Tiempo estimado:* ${service.timeline}

Me gustaría recibir más información y una cotización personalizada para mi proyecto.

¿Podríamos agendar una llamada para discutir los detalles?`;

        const whatsappUrl = `https://wa.me/56995022549?text=${encodeURIComponent(
            message
        )}`;
        window.open(whatsappUrl, "_blank");
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Fondo oscuro + centrado absoluto */}
            <div
                className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Contenedor del modal */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 overflow-hidden max-w-[80rem] w-full max-h-[85vh] flex flex-col"
                >
                    {/* Header */}
                    <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">{service.icon}</div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {service.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {service.description}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Contenido scrollable */}
                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
                            {/* === Columna 1: Descripción === */}
                            <div className="xl:col-span-1 space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        ¿En qué consiste?
                                    </h3>
                                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {service.fullDescription}
                                    </p>
                                </div>

                                {service.technologies && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                            Tecnologías
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {service.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium"
                                                >
                          {tech}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* === Columna 2: Beneficios === */}
                            <div className="xl:col-span-1 space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Beneficios principales
                                </h3>
                                <ul className="space-y-3">
                                    {service.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 animate-pulse" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {benefit}
                      </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* === Columna 3: Proceso === */}
                            <div className="xl:col-span-1 space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Nuestro proceso
                                </h3>
                                <div className="space-y-3 relative">
                                    {service.process.map((step, index) => (
                                        <div key={index} className="flex items-start gap-3 relative">
                                            <div
                                                ref={(el) => {
                                                    processRefs.current[index] = el;
                                                }}
                                                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                                            >
                                                {index + 1}
                                            </div>
                                            <span
                                                ref={(el) => {
                                                    textRefs.current[index] = el;
                                                }}
                                                className="text-sm text-gray-400 leading-relaxed pt-1.5"
                                            >
                        {step}
                      </span>
                                            <div
                                                ref={(el) => (pulseRefs.current[index] = el)}
                                                className="absolute -left-2 top-2 w-12 h-12 rounded-full bg-blue-500/20 opacity-0"
                                            ></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="relative mt-6 mb-4">
                                    <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    <div
                                        ref={progressBarRef}
                                        className="absolute top-4 left-4 h-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full shadow-lg"
                                        style={{
                                            width: "2rem",
                                            boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)",
                                        }}
                                    ></div>
                                </div>

                                <div className="text-center mt-6">
                                    <div
                                        ref={restartIndicatorRef}
                                        className="inline-flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium opacity-70"
                                    >
                                        <span className="animate-spin">🔄</span>
                                        <span>Proceso en ejecución...</span>
                                    </div>
                                </div>
                            </div>

                            {/* === Columna 4: Precio + CTA === */}
                            <div className="xl:col-span-1 space-y-4">
                                <div className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                                    <div className="text-center mb-4">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            {service.price}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Inversión estimada
                                        </div>
                                    </div>

                                    <div className="text-center mb-6">
                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {service.timeline}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Tiempo de desarrollo
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleWhatsApp}
                                        className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50 shadow-xl"
                                    >
                                        💬 Solicitar Cotización ⚡
                                    </button>

                                    <p className="text-center text-xs text-green-600 dark:text-green-400 mt-3 font-medium animate-pulse">
                                        🔥 ¡Oferta limitada! ¡Contacta ahora!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
