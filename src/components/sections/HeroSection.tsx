/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const titles = useMemo(() => [
    "Sitios Web Profesionales para Empresas de LATAM",
    "Tu Tienda Online Funcionando 24/7 en Toda Latinoamérica",
    "Desarrollo Web que Impulsa Negocios desde México hasta Chile"
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
    // Usar timeout para evitar setState directo en useEffect
    const visibilityTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    // Efecto de parpadeo para el cursor del título
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Efecto de parpadeo para el cursor de la tecnología
    const techCursorInterval = setInterval(() => {
      setTechCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(visibilityTimeout);
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
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-30">
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
              Desarrollamos sitios web y tiendas online para empresas en toda Latinoamérica. Planes accesibles desde $99 USD, con hosting incluido y soporte en español. ¡Tu presencia digital lista en 7 días!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => window.open('https://wa.me/50686462423?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20desarrollo%20web', '_blank')}
                className="group relative px-8 py-4 text-lg font-bold text-white rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-110 hover:rotate-1"
                style={{
                  background: 'linear-gradient(45deg, #25D366, #128C7E, #25D366, #128C7E)',
                  backgroundSize: '400% 400%',
                  animation: 'gradient-shift 3s ease infinite',
                  boxShadow: '0 0 30px rgba(37, 211, 102, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Efecto de brillo que se mueve */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </div>

                {/* Partículas flotantes */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                  <div className="absolute bottom-2 left-6 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                </div>

                {/* Borde animado */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-xl border-2 border-white/50 animate-pulse"></div>
                </div>

                {/* Texto con efecto de elevación */}
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-yellow-200 transition-colors duration-300">
                  <span className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">📱</span>
                  Contactar por WhatsApp
                  <span className="text-xl group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">⚡</span>
                </span>

                {/* Efecto de ondas al hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-xl border border-white/30 animate-ping"></div>
                  <div className="absolute inset-0 rounded-xl border border-white/20 animate-ping" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </button>

              <style jsx>{`
                @keyframes gradient-shift {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}</style>
              {/* Botón Ver Proyectos removido temporalmente */}
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
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex flex-col border border-gray-700">
                  {/* Header del terminal mejorado */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 text-sm text-gray-300 font-mono border-b border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-white/90 font-semibold">codigofacil.com</span>
                        <span className="text-gray-400">~</span>
                        <span className="text-cyan-400">TechStack</span>
                      </div>
                      <div className="text-xs text-gray-400">⚡ Live Development</div>
                    </div>
                  </div>

                  <div className="p-6 text-green-500 font-mono overflow-auto flex flex-col justify-start space-y-4 min-h-[500px] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
                    {/* Línea de inicio con mejor estilo */}
                    <div className="text-sm">
                      <span className="text-gray-500">$</span>{" "}
                      <span className="text-purple-400 font-semibold">function</span>{" "}
                      <span className="text-yellow-300 font-bold">buildYourSuccess</span>
                      <span className="text-white">() {"{"}</span>
                    </div>

                    {/* Frontend con iconos y mejor visualización */}
                    <div className="flex items-center text-base pl-6 group hover:bg-gray-800/50 p-2 rounded transition-colors">
                      <span className="text-blue-400 font-semibold">const</span>
                      <span className="text-yellow-400 mx-3 font-bold">Frontend</span>
                      <span className="text-white font-bold">=</span>
                      <span className="text-orange-400 mx-2">"</span>
                      <span className="text-[#00ff41] font-bold text-lg" style={{ textShadow: '0 0 15px rgba(0, 255, 65, 0.8)' }}>
                        {frontendText}
                        <span className={`ml-1 ${techCursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
                      </span>
                      <span className="text-orange-400">"</span>
                      <span className="text-gray-500 ml-4 text-xs">⚡ Cutting-edge UI</span>
                    </div>

                    {/* Backend */}
                    <div className="flex items-center text-base pl-6 group hover:bg-gray-800/50 p-2 rounded transition-colors">
                      <span className="text-blue-400 font-semibold">const</span>
                      <span className="text-yellow-400 mx-3 font-bold">Backend</span>
                      <span className="text-white font-bold">=</span>
                      <span className="text-orange-400 mx-2">"</span>
                      <span className="text-[#00ff41] font-bold text-lg" style={{ textShadow: '0 0 15px rgba(0, 255, 65, 0.8)' }}>
                        {backendText}
                        <span className={`ml-1 ${techCursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
                      </span>
                      <span className="text-orange-400">"</span>
                      <span className="text-gray-500 ml-4 text-xs">🚀 High Performance</span>
                    </div>

                    {/* Database */}
                    <div className="flex items-center text-base pl-6 group hover:bg-gray-800/50 p-2 rounded transition-colors">
                      <span className="text-blue-400 font-semibold">const</span>
                      <span className="text-yellow-400 mx-3 font-bold">Database</span>
                      <span className="text-white font-bold">=</span>
                      <span className="text-orange-400 mx-2">"</span>
                      <span className="text-[#00ff41] font-bold text-lg" style={{ textShadow: '0 0 15px rgba(0, 255, 65, 0.8)' }}>
                        {databaseText}
                        <span className={`ml-1 ${techCursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
                      </span>
                      <span className="text-orange-400">"</span>
                      <span className="text-gray-500 ml-4 text-xs">💾 Scalable Data</span>
                    </div>

                    {/* Línea vacía para separación */}
                    <div className="h-2"></div>

                    {/* Return statement mejorado */}
                    <div className="pl-6 space-y-3">
                      <div className="text-purple-400 font-semibold">
                        <span className="text-blue-400">return</span>{" "}
                        <span className="text-white">{"{"}</span>
                      </div>

                      <div className="pl-6 space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-cyan-400 font-semibold">success:</span>
                          <span className="text-green-400 font-bold">"GUARANTEED"</span>
                          <span className="text-gray-500">// 🎯 Resultados comprobados</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-cyan-400 font-semibold">timeline:</span>
                          <span className="text-yellow-300 font-bold">"7 días"</span>
                          <span className="text-gray-500">// ⚡ Entrega ultrarrápida</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-cyan-400 font-semibold">support:</span>
                          <span className="text-blue-300 font-bold">"24/7"</span>
                          <span className="text-gray-500">// 🛡️ Soporte continuo</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-cyan-400 font-semibold">price:</span>
                          <span className="text-green-300 font-bold">"desde $25 USD al mes"</span>
                          <span className="text-gray-500">// 💰 Precio justo</span>
                        </div>
                      </div>

                      <div className="text-white font-semibold pl-6">{"}"}</div>
                    </div>

                    {/* Comentario motivacional */}
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <div className="text-cyan-400 text-sm mb-3 font-semibold">
                        <span className="text-gray-500">/* </span>
                        🚀 Tu próximo proyecto puede cambiar todo
                        <span className="text-gray-500"> */</span>
                      </div>

                      <div
                        className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm px-4 py-3 rounded-lg cursor-pointer hover:from-green-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 font-semibold text-center shadow-lg"
                        onClick={() => {
                          const contactSection = document.querySelector('#contact-section');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        💬 Iniciar mi proyecto ahora → Consulta GRATIS
                      </div>
                    </div>

                    {/* Cierre de función */}
                    <div className="text-gray-400 text-sm font-semibold">
                      <span className="text-white">{"}"}</span>
                      <span className="text-gray-500 ml-2">// buildYourSuccess()</span>
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