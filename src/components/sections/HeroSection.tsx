/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// Componente Button simplificado
const Button = ({ children, size, variant, className  , ...props }: { children: React.ReactNode, size?: string, variant?: string, className?: string, onClick?: () => void }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300";
  const sizeStyles = size === "lg" ? "text-lg px-8 py-4" : "";
  const variantStyles = variant === "outline"
    ? "border-2"
    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl";

  return (
    <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const titles = useMemo(() => [
    "Sitios Web que Convierten Visitantes en Clientes Reales",
    "Diseño Web Profesional que Hace Crecer tu Presencia Digital",
    "Tu Sitio Web Trabajando 24/7 para Atraer Más Clientes"
  ], []);

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  // Tecnologías por categoría
  const techCategories = useMemo(() => [
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "Angular", "Vue.js", "TailwindCSS"]
    },
    {
      category: "Backend",
      technologies: ["Node.js", ".NET", "C#", "PHP", "Python", "Java"]
    },
    {
      category: "Database",
      technologies: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "Firebase"]
    }
  ], []);

  // Estados para cada categoría (Frontend, Backend, Database)
  const [frontendIndex, setFrontendIndex] = useState(0);
  const [frontendText, setFrontendText] = useState("");
  const [frontendDeleting, setFrontendDeleting] = useState(false);

  const [backendIndex, setBackendIndex] = useState(0);
  const [backendText, setBackendText] = useState("");
  const [backendDeleting, setBackendDeleting] = useState(false);

  const [databaseIndex, setDatabaseIndex] = useState(0);
  const [databaseText, setDatabaseText] = useState("");
  const [databaseDeleting, setDatabaseDeleting] = useState(false);

  const [techCursorVisible, setTechCursorVisible] = useState(true);

  // Configuración inicial y efecto de visibilidad
  useEffect(() => {
    setIsVisible(true);

    // Efecto de parpadeo para el cursor del título
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Efecto de parpadeo para el cursor de la tecnología
    const techCursorInterval = setInterval(() => {
      setTechCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(techCursorInterval);
    };
  }, []);

  // Title typing effect
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    const typeEffect = () => {
      if (isDeleting) {
        if (title.length > 0) {
          setTitle(prev => prev.slice(0, -1));
          setSpeed(50);
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setSpeed(500);
        }
      } else {
        if (title.length < currentTitle.length) {
          setTitle(prev => currentTitle.slice(0, prev.length + 1));
          setSpeed(100);
        } else {
          setIsDeleting(true);
          setSpeed(1000);
        }
      }
    };

    const timer = setTimeout(typeEffect, speed);
    return () => clearTimeout(timer);
  }, [title, isDeleting, currentTitleIndex, titles, speed]);

  // Frontend typing effect
  useEffect(() => {
    const currentTech = techCategories[0].technologies[frontendIndex];

    const typeEffect = () => {
      if (frontendDeleting) {
        if (frontendText.length > 0) {
          setFrontendText(prev => prev.slice(0, -1));
        } else {
          setFrontendDeleting(false);
          setFrontendIndex((prev) => (prev + 1) % techCategories[0].technologies.length);
        }
      } else {
        if (frontendText.length < currentTech.length) {
          setFrontendText(prev => currentTech.slice(0, prev.length + 1));
        } else {
          setTimeout(() => setFrontendDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(typeEffect, frontendDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [frontendText, frontendDeleting, frontendIndex, techCategories]);

  // Backend typing effect
  useEffect(() => {
    const currentTech = techCategories[1].technologies[backendIndex];

    const typeEffect = () => {
      if (backendDeleting) {
        if (backendText.length > 0) {
          setBackendText(prev => prev.slice(0, -1));
        } else {
          setBackendDeleting(false);
          setBackendIndex((prev) => (prev + 1) % techCategories[1].technologies.length);
        }
      } else {
        if (backendText.length < currentTech.length) {
          setBackendText(prev => currentTech.slice(0, prev.length + 1));
        } else {
          setTimeout(() => setBackendDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(typeEffect, backendDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [backendText, backendDeleting, backendIndex, techCategories]);

  // Database typing effect
  useEffect(() => {
    const currentTech = techCategories[2].technologies[databaseIndex];

    const typeEffect = () => {
      if (databaseDeleting) {
        if (databaseText.length > 0) {
          setDatabaseText(prev => prev.slice(0, -1));
        } else {
          setDatabaseDeleting(false);
          setDatabaseIndex((prev) => (prev + 1) % techCategories[2].technologies.length);
        }
      } else {
        if (databaseText.length < currentTech.length) {
          setDatabaseText(prev => currentTech.slice(0, prev.length + 1));
        } else {
          setTimeout(() => setDatabaseDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(typeEffect, databaseDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [databaseText, databaseDeleting, databaseIndex, techCategories]);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20">
      {/* YouTube Video Background with stronger overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/Hgg7M3kSqyE?controls=0&autoplay=1&mute=1&loop=1&playlist=Hgg7M3kSqyE&playsinline=1&rel=0&enablejsapi=1&disablekb=1&modestbranding=1&showinfo=0"
            title="Background video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute w-[120%] h-[120%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
            style={{
              pointerEvents: 'none'
            }}
          />
        </div>
        {/* Overlay más oscuro y con más capas para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-indigo-900/85 z-[1]"></div>
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        <div className="absolute -right-40 -top-40 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -left-20 bottom-0 w-[600px] h-[600px] rounded-full bg-indigo-200/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
              Enfocado en soluciones digitales profesionales que impulsan negocios
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mt-3 mb-6 min-h-[3em]">
              {title}
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg">
              Transformamos sus ideas en experiencias digitales excepcionales. Nuestras soluciones web están diseñadas para destacar su marca, aumentar conversiones y brindar resultados tangibles para su negocio.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                variant="default"
                className="text-base"
                onClick={() => window.open('https://wa.me/50686462423?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20desarrollo%20web', '_blank')}
              >
                Contactar por WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Ver Proyectos
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-black/40 backdrop-blur-sm shadow-2xl rounded-2xl p-6 w-full overflow-hidden border border-white/20">
              <div className="relative z-10 flex flex-col">
                <div className="flex mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col">
                  <div className="bg-gray-800 p-3 text-sm text-gray-300 font-mono">
                    <span className="text-white/80">ezdev.cr</span> ~ Technologies
                  </div>
                  <div className="p-6 text-green-500 font-mono overflow-auto flex flex-col justify-start space-y-5 min-h-[500px]">
                    {/* Línea de inicio */}
                    <div className="text-gray-400 text-sm">
                      <span className="text-purple-400">function</span>{" "}
                      <span className="text-yellow-300">buildYourSuccess</span>
                      <span className="text-white">() {"{"}</span>
                    </div>

                    {/* Frontend */}
                    <div className="flex items-center text-base pl-4">
                      <span className="text-blue-400">const</span>
                      <span className="text-yellow-400 mx-2">Frontend</span>
                      <span className="text-white">=</span>
                      <span className="text-[#00ff41] ml-2 min-w-[140px] font-semibold" style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.8)' }}>
                        {frontendText}
                        <span className={`ml-1 ${techCursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
                      </span>
                    </div>

                    {/* Backend */}
                    <div className="flex items-center text-base pl-4">
                      <span className="text-blue-400">const</span>
                      <span className="text-yellow-400 mx-2">Backend</span>
                      <span className="text-white">=</span>
                      <span className="text-[#00ff41] ml-2 min-w-[140px] font-semibold" style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.8)' }}>
                        {backendText}
                        <span className={`ml-1 ${techCursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
                      </span>
                    </div>

                    {/* Database */}
                    <div className="flex items-center text-base pl-4">
                      <span className="text-blue-400">const</span>
                      <span className="text-yellow-400 mx-2">Database</span>
                      <span className="text-white">=</span>
                      <span className="text-[#00ff41] ml-2 min-w-[140px] font-semibold" style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.8)' }}>
                        {databaseText}
                        <span className={`ml-1 ${techCursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
                      </span>
                    </div>

                    {/* Mensaje persuasivo */}
                    <div className="mt-6 pt-4 border-t border-gray-700 pl-4">
                      <div className="text-cyan-400 text-sm mb-3">
                        <span className="text-gray-500">// </span>Tecnología de vanguardia para impulsar tu presencia digital
                      </div>
                      <div className="text-white/90 text-sm leading-relaxed space-y-2">
                        <div>
                          <span className="text-purple-400">¿Listo para transformar tu negocio</span> y alcanzar{" "}
                          <span className="text-yellow-300">resultados extraordinarios en el mundo digital</span>?
                        </div>
                        <div className="text-gray-300 mt-3">
                          <span className="text-green-400">✓</span> Sitios web optimizados para máxima conversión
                        </div>
                        <div className="text-gray-300">
                          <span className="text-green-400">✓</span> Diseño responsive perfectamente adaptado
                        </div>
                        <div className="text-gray-300">
                          <span className="text-green-400">✓</span> SEO integrado y estrategias avanzadas
                        </div>
                        <div className="text-gray-300">
                          <span className="text-green-400">✓</span> Soporte técnico continuo 24/7
                        </div>
                      </div>
                      <div
                        className="text-green-400 text-sm mt-4 animate-pulse cursor-pointer hover:text-green-300 transition-colors"
                        onClick={() => {
                          const contactSection = document.querySelector('#contact-section');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        → Contacta ahora y recibe una <span className="text-yellow-300 font-semibold">consultoría estratégica gratis</span>
                      </div>
                    </div>

                    {/* Cierre de función */}
                    <div className="text-gray-400 text-sm">
                      <span className="text-white">{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-blue-500/30 rounded-full blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}