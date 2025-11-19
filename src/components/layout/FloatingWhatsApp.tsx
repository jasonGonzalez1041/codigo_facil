'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Clock, Tag, Users } from 'lucide-react';
import { gsap } from 'gsap';

export default function FloatingWhatsAppWithOffers() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const buttonRef = useRef(null);
    const panelRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        // Usar un timer para evitar setState directo en useEffect
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // Animaciones con GSAP
    useEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            // Animación del botón flotante
            gsap.fromTo(buttonRef.current,
                {
                    scale: 0,
                    rotation: -180
                },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    delay: 2
                }
            );

            // Animación de pulso continua
            gsap.to(buttonRef.current, {
                scale: 1.05,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: 3
            });

        });

        return () => ctx.revert();
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            if (isOpen) {
                // Animación de entrada
                gsap.to(overlayRef.current, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.fromTo(panelRef.current,
                    {
                        scale: 0.8,
                        opacity: 0,
                        y: 20
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)"
                    }
                );
            } else {
                // Animación de salida
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.in"
                });

                gsap.to(panelRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: "power2.in"
                });
            }
        });

        return () => ctx.revert();
    }, [isOpen, mounted]);

    // Calcular fecha de vencimiento
    const getExpirationDate = () => {
        // Fixed date to avoid hydration issues
        return '2025-02-15'; // Static date for consistent SSR/client rendering
    };

    const phoneNumber = '56950225491'; // Reemplaza con tu número
    const expirationDate = getExpirationDate();

    const offers = [
        {
            title: "Landing Page",
            price: "$49 USD",
            originalPrice: "$99 USD",
            description: "Diseño profesional y responsive"
        },
        {
            title: "E-commerce Básico",
            price: "$199 USD",
            originalPrice: "$399 USD",
            description: "Tienda online completa"
        },
        {
            title: "Consultoría Estratégica",
            price: "GRATIS",
            originalPrice: "$50 USD",
            description: "30 minutos de asesoría"
        }
    ];

    const generateWhatsAppMessage = (offerType = 'general') => {
        const baseMessage = `¡Hola! 👋 

Me interesa la OFERTA LANZAMIENTO LATAM de Código Fácil:

${offers.map(offer => `• ${offer.title}: ${offer.price} (antes ${offer.originalPrice})`).join('\n')}

⏰ Válido hasta: ${expirationDate}
👥 Primeros 10 clientes

¿Podrías darme más información?`;

        return encodeURIComponent(baseMessage);
    };

    if (!mounted) return null;

    return (
        <div suppressHydrationWarning data-component="floating-whatsapp" data-extension-safe="true">
            {/* Botón flotante principal */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group floating-whatsapp-button"
                aria-label="Ver ofertas especiales de WhatsApp"
                suppressHydrationWarning
            >
                <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />

                {/* Notificación badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-xs font-bold text-white">3</span>
                </div>

                {/* Efecto de pulso */}
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 opacity-0"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Panel de ofertas */}
            {isOpen && (
                <div
                    ref={panelRef}
                    className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 transform-gpu"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl p-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <MessageCircle className="w-5 h-5" />
                                <h3 className="font-bold text-lg">Ofertas Especiales</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>Hasta {expirationDate.split(' ')[0]}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>10 clientes</span>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4 max-h-96 overflow-y-auto">
                        {/* Badge de oferta */}
                        <div className="flex justify-center mb-4">
              <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Tag className="w-3 h-3" />
                <span>OFERTA LANZAMIENTO LATAM</span>
              </span>
                        </div>

                        {/* Lista de ofertas */}
                        <div className="space-y-3 mb-4">
                            {offers.map((offer, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 hover:border-green-300 dark:hover:border-green-700 transition-colors duration-200"
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                            {offer.title}
                                        </h4>
                                        <div className="text-right">
                                            <div className="text-green-600 dark:text-green-400 font-bold text-sm">
                                                {offer.price}
                                            </div>
                                            <div className="text-gray-500 dark:text-gray-400 line-through text-xs">
                                                {offer.originalPrice}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-xs">
                                        {offer.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Información adicional */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
                            <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300 mb-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">Tiempo Limitado</span>
                            </div>
                            <p className="text-blue-700 dark:text-blue-400 text-xs">
                                Oferta válida para los primeros 10 clientes hasta el {expirationDate}
                            </p>
                        </div>

                        {/* Botones de acción */}
                        <div className="space-y-2">
                            <a
                                href={`https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                                onClick={() => setIsOpen(false)}
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Consultar por Todas las Ofertas</span>
                            </a>

                            <div className="grid grid-cols-2 gap-2">
                                {offers.slice(0, 2).map((offer, index) => (
                                    <a
                                        key={index}
                                        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`¡Hola! Me interesa la oferta de ${offer.title} por ${offer.price}. ¿Podrías darme más información?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-xs transition-all duration-200 flex items-center justify-center text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {offer.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
                        <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                            💬 Respondemos en menos de 5 minutos
                        </p>
                    </div>
                </div>
            )}

            {/* Estilos integrados */}
            <style jsx global>{`
        .floating-whatsapp-button {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .floating-whatsapp-button:hover {
          animation: none;
          transform: translateY(-2px) scale(1.05);
        }
        
        /* Scrollbar personalizado */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* Modo oscuro para scrollbar */
        @media (prefers-color-scheme: dark) {
          .overflow-y-auto::-webkit-scrollbar-track {
            background: #374151;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #6b7280;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        }
      `}</style>
        </div>
    );
}