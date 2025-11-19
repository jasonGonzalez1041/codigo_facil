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
import { CostCalculator } from "@/components/ui/cost-calculator";

const pricingPlans = [
    {
        icon: Globe,
        name: "Estático Simple",
        description: "Sitio web básico con hasta 3 páginas y diseño sencillo",
        prices: {
            monthly: 15,
            annual: 150,
            oneTime: 180
        },
        setupFee: 25,
        features: {
            base: [
                "Hasta 3 páginas (Inicio, Servicios, Contacto)",
                "Diseño sencillo y responsivo",
                "Optimización SEO básica",
                "Formulario de contacto simple",
                "1 revisión de diseño incluida"
            ],
            recurring: [
                "Hosting y SSL incluido",
                "Dominio .com/.cl por 1 año",
                "Backups automáticos",
                "2 horas de soporte mensual",
                "Actualizaciones de seguridad"
            ],
            oneTime: [
                "Código fuente completo entregado",
                "🎯 Cliente gestiona su propio hosting",
                "🎯 Cliente gestiona su propio dominio",
                "Soporte técnico por 30 días",
                "Documentación técnica incluida",
                "Instalación y configuración inicial"
            ]
        },
        color: "from-blue-500 to-cyan-500",
        recommended: false
    },
    {
        icon: ShoppingCart,
        name: "E-commerce Completo",
        description: "Tienda online profesional con gestión completa de productos",
        prices: {
            monthly: 49,
            annual: 490,
            oneTime: 1200
        },
        setupFee: 99,
        features: {
            base: [
                "Catálogo de productos ilimitado",
                "Carrito de compras avanzado",
                "Pasarelas de pago integradas",
                "Panel de administración completo",
                "Gestión de inventarios"
            ],
            recurring: [
                "Hosting optimizado para e-commerce",
                "Dominio .com/.cl por 1 año",
                "SSL y seguridad avanzada",
                "5 horas de soporte mensual",
                "Backups diarios automáticos"
            ],
            oneTime: [
                "Código fuente completo entregado",
                "🎯 Cliente gestiona su propio hosting",
                "🎯 Cliente gestiona su propio dominio",
                "Soporte técnico por 60 días",
                "Manual de administración completo",
                "Configuración de pasarelas de pago"
            ]
        },
        color: "from-green-500 to-emerald-500",
        recommended: true
    },
    {
        icon: Calendar,
        name: "Corporativo Premium",
        description: "Sitio web empresarial con funcionalidades avanzadas",
        prices: {
            monthly: 35,
            annual: 350,
            oneTime: 800
        },
        setupFee: 50,
        features: {
            base: [
                "Hasta 10 páginas personalizadas",
                "Blog integrado con CMS",
                "Formularios de contacto múltiples",
                "Galería de imágenes optimizada",
                "Integración con redes sociales"
            ],
            recurring: [
                "Hosting premium incluido",
                "Dominio .com/.cl por 1 año",
                "CDN global para velocidad",
                "4 horas de soporte mensual",
                "Análisis de rendimiento mensual"
            ],
            oneTime: [
                "Código fuente completo entregado",
                "🎯 Cliente gestiona su propio hosting",
                "🎯 Cliente gestiona su propio dominio",
                "Soporte técnico por 45 días",
                "Documentación completa",
                "Capacitación de administración"
            ]
        },
        color: "from-purple-500 to-pink-500",
        recommended: false
    },
    {
        icon: Sparkles,
        name: "App Web Avanzada",
        description: "Aplicación web personalizada con funcionalidades específicas",
        prices: {
            monthly: 75,
            annual: 750,
            oneTime: 2500
        },
        setupFee: 150,
        features: {
            base: [
                "Funcionalidades personalizadas",
                "Base de datos optimizada",
                "API REST completa",
                "Dashboard administrativo",
                "Autenticación de usuarios"
            ],
            recurring: [
                "Infraestructura escalable incluida",
                "Dominio .com/.cl por 1 año",
                "Monitoreo 24/7",
                "10 horas de soporte mensual",
                "Actualizaciones de funcionalidades"
            ],
            oneTime: [
                "Código fuente completo entregado",
                "🎯 Cliente gestiona su propio hosting",
                "🎯 Cliente gestiona su propio dominio",
                "Soporte técnico por 90 días",
                "Documentación técnica detallada",
                "Configuración de servidores"
            ]
        },
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

    const getFeaturesToShow = (plan: any) => {
        if (billingCycle === "oneTime") {
            return plan.features.oneTime;
        } else if (billingCycle === "annual") {
            return [...plan.features.base, ...plan.features.recurring];
        } else {
            return [...plan.features.base, ...plan.features.recurring];
        }
    };

    return (
        <section
            id="precios"
            ref={sectionRef}
            className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={titleRef}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Planes{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Accesibles
                        </span>{" "}
                        para LATAM
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                        {billingCycle === "oneTime"
                            ? "Sitios web profesionales de pago único. Tú gestionas hosting y dominio, nosotros el desarrollo."
                            : "Soluciones web todo incluido: hosting, dominio, soporte en español y desarrollo de calidad."
                        }
                    </p>

                    {/* Billing Cycle Toggle */}
                    <div className="flex items-center justify-center mb-12">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-1 flex">
                            {[
                                { key: "monthly", label: "Mensual" },
                                { key: "annual", label: "Anual" },
                                { key: "oneTime", label: "Pago Único" }
                            ].map((option) => (
                                <button
                                    key={option.key}
                                    onClick={() => setBillingCycle(option.key)}
                                    className={`px-6 py-2 rounded-lg transition-all duration-300 ${billingCycle === option.key
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Nota importante para pago único */}
                    {billingCycle === "oneTime" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 max-w-2xl mx-auto"
                        >
                            <p className="text-yellow-800 dark:text-yellow-200 text-sm text-center">
                                💡 <strong>Plan Pago Único:</strong> Incluye código fuente completo.
                                El cliente gestiona su propio hosting y dominio. Soporte técnico incluido por tiempo limitado.
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={plan.name}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${plan.recommended
                                ? "ring-2 ring-blue-500 ring-opacity-50"
                                : ""
                            }`}
                        >
                            {plan.recommended && (
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                                    ⭐ Más Popular
                                </div>
                            )}

                            <div className="p-8">
                                {/* Icon & Title */}
                                <div className="text-center mb-6">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.color} text-white mb-4 pricing-icon`}>
                                        <plan.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Pricing */}
                                <div className="text-center mb-6">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                        ${getPrice(plan.prices)}
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                                        {getCycleLabel()}
                                    </span>
                                    {billingCycle === "monthly" && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Setup único: ${plan.setupFee}
                                        </p>
                                    )}
                                    {billingCycle === "oneTime" && (
                                        <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-semibold">
                                            ✓ Código fuente incluido
                                        </p>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-6">
                                    {getFeaturesToShow(plan).map((feature: string, featureIndex: number) => (
                                        <li
                                            key={`${billingCycle}-${featureIndex}`}
                                            className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                                        >
                                            <Check className={`w-5 h-5 mr-2 flex-shrink-0 ${
                                                feature.includes('🎯') ? 'text-yellow-500' : 'text-green-500'
                                            }`} />
                                            <span className={feature.includes('🎯') ? 'font-semibold text-yellow-700 dark:text-yellow-300' : ''}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    onClick={() => {
                                        const price = getPrice(plan.prices);
                                        const cycle = getCycleLabel();
                                        const setupFee = billingCycle === "monthly" ? ` (Setup: $${plan.setupFee})` : '';

                                        let message = `¡Hola! Me interesa el plan *${plan.name}* de CodigoFacil.com

                         🏷️ *Precio:* $${price}${cycle}${setupFee}

                         📝 *Incluye:*
                       ${getFeaturesToShow(plan).slice(0, 5).map((f :string) => `• ${f}`).join('\n')}`;

                                        if (billingCycle === "oneTime") {
                                            message += `

                                🚀 *Importante:* Este plan incluye el código fuente completo. Tú gestionas tu propio hosting y dominio.`;
                                        }

                                        message += `

                                 ¿Podrían brindarme más información sobre este plan?`;

                                        const whatsappUrl = `https://wa.me/56950225491?text=${encodeURIComponent(message)}`;
                                        window.open(whatsappUrl, '_blank');
                                    }}
                                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.recommended
                                        ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl transform hover:scale-105`
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                                    }`}
                                >
                                    {billingCycle === "oneTime" ? "🚀 Solicitar Código Fuente" : "💬 Consultar por WhatsApp"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Development Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Desarrollo Personalizado - $20/hora
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            ¿Necesitas algo específico? Desarrollamos tu sistema web personalizado por horas.
                            {billingCycle === "oneTime" && " Ideal si prefieres gestionar tu propio hosting y dominio."}
                        </p>
                        <button
                            onClick={() => {
                                const message = `¡Hola! Necesito una cotización personalizada de CodigoFacil.com

🎯 *Servicio:* Desarrollo Personalizado ($20/hora)

📋 *Mi proyecto requiere:*
• [Describir brevemente tu proyecto]
${billingCycle === "oneTime" ? "• Prefiero gestionar mi propio hosting y dominio" : ""}

¿Podrían ayudarme con una cotización detallada?`;

                                const whatsappUrl = `https://wa.me/56950225491?text=${encodeURIComponent(message)}`;
                                window.open(whatsappUrl, '_blank');
                            }}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            💬 Hablar con un Especialista
                        </button>
                    </div>
                </motion.div>

                {/* Cost Calculator */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            💡 ¿No estás seguro del costo?
                        </h3>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Usa nuestra calculadora para estimar tu proyecto {billingCycle === "oneTime" && "de pago único"}
                        </p>
                    </div>

                    <CostCalculator />
                </motion.div>
            </div>
        </section>
    );
}