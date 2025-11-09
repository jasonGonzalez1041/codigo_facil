/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Globe,
    ShoppingCart,
    Calendar,
    Sparkles,
    Check
} from "lucide-react";

const pricingPlans = [
    {
        icon: Globe,
        name: "Static Basic",
        description: "Perfecto para landing pages y sitios corporativos simples",
        prices: {
            monthly: 25,
            annual: 255,
            oneTime: 100
        },
        setupFee: 75,
        features: [
            "Hosting incluido",
            "SSL gratuito",
            "5 páginas",
            "Diseño responsive",
            "Soporte básico",
            "Backups automáticos"
        ],
        color: "from-blue-500 to-cyan-500",
        recommended: false
    },
    {
        icon: Sparkles,
        name: "Static Premium",
        description: "Sitios web avanzados con funcionalidades personalizadas",
        prices: {
            monthly: 45,
            annual: 459,
            oneTime: 120
        },
        setupFee: 75,
        features: [
            "Todo de Basic",
            "10 páginas",
            "Animaciones avanzadas",
            "SEO optimizado",
            "Analytics integrado",
            "Formularios personalizados"
        ],
        color: "from-purple-500 to-pink-500",
        recommended: true
    },
    {
        icon: ShoppingCart,
        name: "E-commerce Basic",
        description: "Tu tienda online lista para vender desde el día uno",
        prices: {
            monthly: 45,
            annual: 459,
            oneTime: 120
        },
        setupFee: 75,
        features: [
            "Todo de Static Basic",
            "Hasta 50 productos",
            "Pasarela de pago",
            "Gestión de inventario",
            "Carrito de compras",
            "Panel de administración"
        ],
        color: "from-green-500 to-emerald-500",
        recommended: false
    },
    {
        icon: Calendar,
        name: "E-commerce Premium",
        description: "E-commerce empresarial con todas las funcionalidades",
        prices: {
            monthly: 65,
            annual: 663,
            oneTime: 140
        },
        setupFee: 75,
        features: [
            "Todo de E-commerce Basic",
            "Productos ilimitados",
            "Múltiples pasarelas",
            "Email marketing",
            "Cupones y descuentos",
            "Reportes avanzados"
        ],
        color: "from-orange-500 to-red-500",
        recommended: false
    }
];

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState("monthly");
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
                    scale: 0.8
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
                            scale: 0.9
                        },
                        {
                            y: 0,
                            opacity: 1,
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
                scale: 1.05,
                y: -15,
                duration: 0.4,
                ease: "power2.out"
            });

            const icon = card.querySelector('.pricing-icon');
            gsap.to(icon, {
                rotation: 360,
                scale: 1.15,
                duration: 0.6,
                ease: "back.out(1.7)"
            });
        }
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (card) {
            gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });

            const icon = card.querySelector('.pricing-icon');
            gsap.to(icon, {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
    };

    const getPrice = (prices: any) => {
        switch (billingCycle) {
            case "monthly":
                return prices.monthly;
            case "annual":
                return prices.annual;
            case "oneTime":
                return prices.oneTime;
            default:
                return prices.monthly;
        }
    };

    const getCycleLabel = () => {
        switch (billingCycle) {
            case "monthly":
                return "/mes";
            case "annual":
                return "/año";
            case "oneTime":
                return "único";
            default:
                return "/mes";
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
        >
            {/* Elementos decorativos */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Título */}
                <motion.div ref={titleRef} className="text-center mb-12">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3 block">
                        Precios Transparentes
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Planes que{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            se Adaptan a Ti
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                        Sin costos ocultos. Elige el plan perfecto para tu proyecto y escala cuando lo necesites.
                    </p>

                    {/* Toggle de ciclo de facturación */}
                    <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-lg">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${billingCycle === "monthly"
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            Mensual
                        </button>
                        <button
                            onClick={() => setBillingCycle("annual")}
                            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 relative ${billingCycle === "annual"
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            Anual
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                -15%
                            </span>
                        </button>
                        <button
                            onClick={() => setBillingCycle("oneTime")}
                            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${billingCycle === "oneTime"
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            Pago Único
                        </button>
                    </div>
                </motion.div>

                {/* Grid de precios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {pricingPlans.map((plan, index) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={index}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer ${plan.recommended ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
                                    }`}
                            >
                                {/* Badge de recomendado */}
                                {plan.recommended && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        Recomendado
                                    </div>
                                )}

                                {/* Gradiente de fondo */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                <div className="relative p-6">
                                    {/* Ícono */}
                                    <div className="mb-4">
                                        <div className={`pricing-icon w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} p-3 shadow-lg inline-flex items-center justify-center`}>
                                            <Icon className="w-full h-full text-white" strokeWidth={2} />
                                        </div>
                                    </div>

                                    {/* Nombre y descripción */}
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        {plan.description}
                                    </p>

                                    {/* Precio */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline">
                                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                                ${getPrice(plan.prices)}
                                            </span>
                                            <span className="text-gray-600 dark:text-gray-400 ml-2">
                                                {getCycleLabel()}
                                            </span>
                                        </div>
                                        {billingCycle !== "oneTime" && (
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                Setup único: ${plan.setupFee}
                                            </p>
                                        )}
                                        {billingCycle === "monthly" && (
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                Contrato mínimo 12 meses
                                            </p>
                                        )}
                                        {billingCycle === "oneTime" && (
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                Incluye setup de ${plan.setupFee}
                                            </p>
                                        )}
                                    </div>

                                    {/* Características */}
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                                                <Check className={`w-5 h-5 mr-2 flex-shrink-0 bg-gradient-to-br ${plan.color} rounded-full p-1 text-white`} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Botón CTA */}
                                    <button
                                        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.recommended
                                                ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl transform hover:scale-105`
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                                            }`}
                                    >
                                        Comenzar Ahora
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Información adicional */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="bg-blue-50 dark:bg-gray-800/50 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Todos los planes incluyen
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
                            <div className="flex items-center justify-center">
                                <Check className="w-5 h-5 mr-2 text-green-500" />
                                Hosting y SSL gratuito
                            </div>
                            <div className="flex items-center justify-center">
                                <Check className="w-5 h-5 mr-2 text-green-500" />
                                Backups automáticos diarios
                            </div>
                            <div className="flex items-center justify-center">
                                <Check className="w-5 h-5 mr-2 text-green-500" />
                                Soporte técnico &lt;4 horas
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                            * IVA no incluido. Pagos seguros con Stripe o Mercado Pago.
                        </p>
                    </div>

                    <div className="mt-8">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            ¿Necesitas algo más personalizado?
                        </p>
                        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            Hablar con un Especialista
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}