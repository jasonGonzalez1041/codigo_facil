"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Smartphone,
  ShoppingCart,
  Palette,
  Database,
  Rocket
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo Web Personalizado",
    description: "Sitios web a medida con las últimas tecnologías. Desde landing pages hasta aplicaciones web complejas que impulsan tu negocio.",
    features: ["React & Next.js", "Optimización SEO", "Diseño Responsive"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description: "Apps nativas y multiplataforma que tus clientes amarán. Experiencias móviles fluidas y profesionales.",
    features: ["iOS & Android", "UX Optimizada", "Rendimiento Superior"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Avanzado",
    description: "Tiendas online que venden. Integración con pasarelas de pago, gestión de inventario y analytics en tiempo real.",
    features: ["Pagos Seguros", "Gestión Completa", "Analytics Integrado"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Palette,
    title: "Diseño UI/UX",
    description: "Interfaces que enamoran y convierten. Diseños modernos centrados en la experiencia del usuario.",
    features: ["Prototipos Interactivos", "Branding", "Diseño Moderno"],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description: "Arquitecturas robustas y escalables. Bases de datos optimizadas y APIs RESTful que potencian tu aplicación.",
    features: ["Node.js & .NET", "SQL & NoSQL", "Cloud Integration"],
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: Rocket,
    title: "Consultoría Digital",
    description: "Estrategias digitales que funcionan. Te ayudamos a elegir la mejor tecnología para tus objetivos de negocio.",
    features: ["Análisis Técnico", "Optimización", "Estrategia Digital"],
    color: "from-yellow-500 to-orange-500"
  }
];

export default function ServicesSection() {
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
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                {/* Gradiente de fondo animado */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}></div>

                <div className="relative p-8">
                  {/* Ícono con efecto de brillo */}
                  <div className="relative mb-6">
                    <div className={`service-icon w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-3.5 shadow-lg`}>
                      <Icon className="w-full h-full text-white" strokeWidth={2} />
                    </div>
                    <div className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  </div>

                  {/* Contenido */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Características */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="feature-item flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-3`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Botón de acción */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                      Conocer más
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
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50 transition-all duration-500"></div>
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
    </section>
  );
}