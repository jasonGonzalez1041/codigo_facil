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
      document.body.style.overflow = 'hidden';
      setIsAnyModalOpen(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnyModalOpen(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
      setIsAnyModalOpen(false);
    };
  }, [isOpen, setIsAnyModalOpen]);

  // Animación GSAP del proceso
  useEffect(() => {
    if (!isOpen || !service.process.length) return;

    const totalSteps = service.process.length;
    const stepDuration = 1; // 1 segundo por paso

    // Timeline principal que se repite infinitamente
    const mainTimeline = gsap.timeline({ repeat: -1 });

    // Inicializar todos los elementos en estado inactivo
    processRefs.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref, {
          background: "linear-gradient(to right, #d1d5db, #9ca3af)",
          color: "#374151",
          scale: 1,
          boxShadow: "none"
        });
      }
    });

    textRefs.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref, {
          color: "#9ca3af",
          x: 0,
          fontWeight: "normal"
        });
      }
    });

    pulseRefs.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref, { opacity: 0, scale: 0 });
      }
    });

    // Configurar barra de progreso
    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { width: "2rem", opacity: 1 });
    }

    // Animar cada paso
    service.process.forEach((_, index) => {
      const stepTimeline = gsap.timeline();
      
      // Activar paso actual
      stepTimeline
        // Paso se activa
        .to(processRefs.current[index], {
          background: "linear-gradient(to right, #8b5cf6, #a855f7)",
          color: "white",
          scale: 1.1,
          boxShadow: "0 0 25px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)",
          duration: 0.2,
          ease: "back.out(1.7)"
        })
        .to(textRefs.current[index], {
          color: "#111827",
          x: 4,
          fontWeight: "600",
          textShadow: "0 0 8px rgba(139, 92, 246, 0.3)",
          duration: 0.2
        }, "<")
        // Pulse ring aparece
        .to(pulseRefs.current[index], {
          opacity: 0.6,
          scale: 1,
          duration: 0.3
        }, "<")
        // Mantener activo
        .to({}, { duration: 0.5 })
        // Pulse ring desaparece
        .to(pulseRefs.current[index], {
          opacity: 0,
          scale: 1.2,
          duration: 0.3
        })
        // Paso se desactiva
        .to(processRefs.current[index], {
          background: "linear-gradient(to right, #d1d5db, #9ca3af)",
          color: "#374151",
          scale: 1,
          boxShadow: "none",
          duration: 0.2
        }, "-=0.1")
        .to(textRefs.current[index], {
          color: "#9ca3af",
          x: 0,
          fontWeight: "normal",
          duration: 0.2
        }, "<");

      mainTimeline.add(stepTimeline, index * stepDuration);
      
      // Animar barra de progreso
      if (progressBarRef.current) {
        const progressWidth = `${((index + 1) / totalSteps) * 100}%`;
        mainTimeline.to(progressBarRef.current, {
          width: progressWidth,
          duration: 0.8,
          ease: "power2.out"
        }, index * stepDuration + 0.2);
      }
    });

    // Animación de reinicio
    const restartTimeline = gsap.timeline();
    restartTimeline
      .to(progressBarRef.current, {
        opacity: 0.3,
        duration: 0.3
      })
      .to(restartIndicatorRef.current, {
        scale: 1.1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, "<")
      .to({}, { duration: 0.4 })
      .to(progressBarRef.current, {
        width: "2rem",
        opacity: 1,
        duration: 0.5
      })
      .to(restartIndicatorRef.current, {
        scale: 1,
        opacity: 0.7,
        duration: 0.3
      }, "<");

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

    const whatsappUrl = `https://wa.me/56995022549?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Posición completamente independiente */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999]"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999
        }}
      />

      {/* Modal - Posición absolutamente centrada */}
      <div
        className="fixed bg-white dark:bg-gray-900 rounded-3xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 overflow-hidden z-[10000]"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50vh',
          left: '50vw',
          transform: 'translate(-50%, -50%)',
          width: 'min(95vw, 80rem)',
          height: 'min(85vh, 800px)',
          minHeight: 'min(600px, 75vh)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column'
        }}
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

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Layout optimizado y adaptativo */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Main Content - Grid más grande */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">

            {/* Columna 1: Descripción y Tecnologías */}
            <div className="xl:col-span-1 space-y-4">
              {/* Full Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  ¿En qué consiste?
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Technologies */}
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

            {/* Columna 2: Beneficios */}
            <div className="xl:col-span-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Beneficios principales
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 flex-shrink-0 animate-pulse" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Columna 3: Proceso Animado */}
            <div className="xl:col-span-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Nuestro proceso
                </h3>

                <div className="space-y-3 relative">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 relative">
                      <div
                        ref={(el) => { processRefs.current[index] = el; }}
                        className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg"
                      >
                        {index + 1}
                      </div>
                      <span
                        ref={(el) => { textRefs.current[index] = el; }}
                        className="text-sm text-gray-400 leading-relaxed pt-1.5"
                      >
                        {step}
                      </span>

                      {/* Indicador de paso activo */}
                      <div
                        ref={(el) => { pulseRefs.current[index] = el; }}
                        className="absolute -left-2 top-2 w-12 h-12 rounded-full bg-blue-500/20 opacity-0"
                      ></div>
                    </div>
                  ))}
                </div>

                {/* Barra de progreso animada con GSAP - ABAJO */}
                <div className="relative mt-6 mb-4">
                  <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div
                    ref={progressBarRef}
                    className="absolute top-4 left-4 h-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full shadow-lg"
                    style={{ 
                      width: "2rem",
                      boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)"
                    }}
                  ></div>
                </div>

                {/* Indicador de reinicio */}
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
            </div>

            {/* Columna 4: Pricing y CTA */}
            <div className="xl:col-span-1 space-y-4">
              {/* Pricing Card Mejorada */}
              <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
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

                {/* BOTÓN SÚPER ANIMADO Y LLAMATIVO */}
                <button
                  onClick={handleWhatsApp}
                  className="relative w-full bg-gradient-to-r from-green-500 via-green-600 to-green-500 hover:from-green-600 hover:via-green-700 hover:to-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50 overflow-hidden group shadow-xl hover:shadow-2xl"
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'gradient-shift 3s ease-in-out infinite, pulse-glow 2s ease-in-out infinite',
                  }}
                >
                  {/* Efecto de brillo que se mueve */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>

                  {/* Partículas flotantes */}
                  <div className="absolute inset-0 opacity-75">
                    <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-4 right-4 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute bottom-3 left-6 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                    <div className="absolute bottom-2 right-3 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.9s' }}></div>
                  </div>

                  {/* Contenido del botón */}
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                    <span className="animate-bounce">💬</span>
                    <span>Solicitar Cotización</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>⚡</span>
                  </span>

                  {/* Bordes animados */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/20 animate-pulse"></div>
                </button>

                {/* Mensaje urgencia */}
                <p className="text-center text-xs text-green-600 dark:text-green-400 mt-3 font-medium animate-pulse">
                  🔥 ¡Oferta limitada! ¡Contacta ahora!
                </p>
              </div>

              {/* Contact Info Mejorada */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-base">
                  ¿Tienes dudas?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  Contacta con nuestro equipo para resolver cualquier consulta sobre este servicio.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-lg">📞</span>
                    <span>WhatsApp directo</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-lg">⚡</span>
                    <span>Respuesta rápida</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-lg">🇨🇷</span>
                    <span>Soporte en español</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2);
          }
          50% { 
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3);
          }
        }
        
        @keyframes process-progress {
          0% { 
            width: calc(2rem);
            opacity: 1;
          }
          12.5% { 
            width: calc(25% - 1rem);
            opacity: 1;
          }
          25% { 
            width: calc(50% - 1rem);
            opacity: 1;
          }
          37.5% { 
            width: calc(75% - 1rem);
            opacity: 1;
          }
          50% { 
            width: calc(100% - 2rem);
            opacity: 1;
          }
          75% { 
            width: calc(100% - 2rem);
            opacity: 0.3;
          }
          100% { 
            width: calc(2rem);
            opacity: 1;
          }
        }
        
        @keyframes step-highlight {
          0% { 
            background: linear-gradient(to right, #e5e7eb, #9ca3af);
            color: #6b7280;
            transform: scale(1);
          }
          100% { 
            background: linear-gradient(to right, #e5e7eb, #9ca3af);
            color: #6b7280;
            transform: scale(1);
          }
        }
        
        @keyframes text-highlight {
          0% { 
            color: #9ca3af;
            transform: translateX(0);
          }
          100% { 
            color: #9ca3af;
            transform: translateX(0);
          }
        }
        
        @keyframes step-pulse {
          0% { 
            opacity: 0;
            transform: scale(0);
          }
          100% { 
            opacity: 0;
            transform: scale(0);
          }
        }
        
        @keyframes restart-indicator {
          0%, 90% { 
            opacity: 0.3;
            transform: scale(1);
          }
          95% { 
            opacity: 1;
            transform: scale(1.05);
          }
          100% { 
            opacity: 0.3;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}