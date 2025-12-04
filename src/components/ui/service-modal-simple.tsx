"use client";

import { useEffect } from "react";
import { useModalStore } from "@/store/modalStore";

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

export function ServiceModalSimple({ isOpen, onClose, service }: ServiceModalProps) {
  const { setIsAnyModalOpen } = useModalStore();

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

  const handleWhatsApp = () => {
    const message = `Hola, estoy interesado en el servicio "${service.title}". ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/50672904200?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Posición completamente independiente */}
      <div
        className="fixed bg-black/60 backdrop-blur-md z-[9999]"
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

      {/* Modal - SIN GSAP - Posición absolutamente centrada */}
      <div
        className="fixed bg-white dark:bg-gray-900 rounded-3xl shadow-2xl duration-300 overflow-hidden z-[10000]"
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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            ×
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
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Columna 3: Proceso SIN ANIMACIONES */}
            <div className="xl:col-span-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Nuestro proceso
                </h3>
                
                <div className="space-y-3 relative">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-1.5">
                        {step}
                      </span>
                    </div>
                  ))}
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

                {/* BOTÓN SIN ANIMACIONES COMPLEJAS */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50 shadow-xl hover:shadow-2xl"
                >
                  <span className="flex items-center justify-center gap-2 text-lg">
                    <span>💬</span>
                    <span>Solicitar Cotización</span>
                    <span>⚡</span>
                  </span>
                </button>
                
                {/* Mensaje urgencia */}
                <p className="text-center text-xs text-green-600 dark:text-green-400 mt-3 font-medium">
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
    </>
  );
}