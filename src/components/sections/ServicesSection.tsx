"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ServiceModal } from "@/components/ui/service-modal";
import { servicesData, type Service } from "@/data/services";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openServiceModal = (service: Service, cardIndex: number) => {
    const card = cardsRef.current[cardIndex];
    if (card) {
      // Obtener la posición actual del scroll
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      
      // Obtener las dimensiones de la tarjeta y su posición
      const cardRect = card.getBoundingClientRect();
      
      // Calcular la posición absoluta del centro de la tarjeta desde el top del documento
      const cardCenterAbsolute = currentScrollY + cardRect.top + (cardRect.height / 2);
      
      // Calcular donde queremos que esté el centro del viewport
      const viewportCenterY = window.innerHeight / 2;
      
      // Calcular el nuevo scroll necesario para centrar la tarjeta
      const targetScrollY = cardCenterAbsolute - viewportCenterY;
      
      // Asegurar que no scrolleemos más allá del contenido disponible
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const finalScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
      
      console.log('Centring card:', {
        cardIndex,
        currentScrollY,
        cardRect: { top: cardRect.top, height: cardRect.height },
        cardCenterAbsolute,
        targetScrollY,
        finalScrollY
      });
      
      // Hacer scroll suave hasta centrar la tarjeta
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: finalScrollY,
          autoKill: false
        },
        ease: "power2.out",
        onComplete: () => {
          // Una vez centrada la tarjeta, esperar un momento y abrir el modal
          setTimeout(() => {
            setSelectedService(service);
            setIsModalOpen(true);
          }, 100);
        }
      });
    } else {
      // Fallback si no se encuentra la tarjeta
      console.warn('Card not found for index:', cardIndex);
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  const closeServiceModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

      // Animación de las tarjetas con efecto stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              y: 100,
              opacity: 0,
              rotateX: -15,
              scale: 0.9
            },
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
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });

      // Animar el ícono
      const icon = card.querySelector('.service-icon');
      gsap.to(icon, {
        rotation: 360,
        scale: 1.2,
        duration: 0.5,
        ease: "back.out(1.7)"
      });

      // Animar las características
      const features = card.querySelectorAll('.feature-item');
      gsap.fromTo(
        features,
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
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

      const icon = card.querySelector('.service-icon');
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título de la sección */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
        >
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
          {servicesData.map((service, index) => {
            return (
              <div
                key={service.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => openServiceModal(service, index)}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                {/* Gradiente de fondo animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500"></div>

                <div className="relative p-8">
                  {/* Ícono con efecto de brillo */}
                  <div className="relative mb-6">
                    <div className="service-icon w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-3.5 shadow-lg flex items-center justify-center text-3xl animate-spin-slow">
                      {service.icon}
                    </div>
                    <div className="absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>

                  {/* Contenido */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Precio y timeline */}
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <span>Desde {service.price.split(' - ')[0]}</span>
                    <span>{service.timeline}</span>
                  </div>

                  {/* Botón de acción */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300 flex items-center">
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

                {/* Borde animado */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-500/50 dark:group-hover:border-primary-400/50 transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            ¿Listo para llevar tu proyecto al siguiente nivel?
          </p>
          <button
            onClick={() => {
              const contactSection = document.querySelector('#contact-section');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Iniciar un Proyecto
          </button>
        </motion.div>
      </div>

      {/* Modal de Servicios */}
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={closeServiceModal}
          service={selectedService}
        />
      )}
    </section>
  );
}