"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);
  const infoItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

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

      // Animación del formulario
      gsap.fromTo(
        formCardRef.current,
        {
          x: -100,
          opacity: 0,
          rotateY: -15
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formCardRef.current,
            start: "top 80%",
            end: "top 40%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de la tarjeta de información
      gsap.fromTo(
        infoCardRef.current,
        {
          x: 100,
          opacity: 0,
          rotateY: 15
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoCardRef.current,
            start: "top 80%",
            end: "top 40%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación del mapa
      gsap.fromTo(
        mapCardRef.current,
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
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapCardRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de items de información
      infoItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            {
              x: -30,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.4 + index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: infoCardRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    // Animación del botón
    const submitButton = document.querySelector('#submit-button');
    if (submitButton) {
      gsap.to(submitButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    // Simular envío
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

      // Resetear después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 500);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.2,
      ease: "power2.inOut"
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título de la sección */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
        >
          <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3 block">
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Hagamos Realidad{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tu Proyecto
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estamos listos para transformar tus ideas en soluciones digitales exitosas.
            Contáctanos hoy y comencemos a trabajar juntos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Formulario de contacto */}
          <div
            ref={formCardRef}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            style={{ perspective: "1000px" }}
          >
            {/* Gradiente decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10"></div>

            <div className="relative p-8 md:p-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 shadow-lg mr-4">
                  <Send className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Envíanos un mensaje
                </h3>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    ¡Mensaje Enviado!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                        Nombre completo *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Juan Pérez"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                        Correo electrónico *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="juan@ejemplo.com"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+506 8888-8888"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 font-medium">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Cuéntanos sobre tu proyecto..."
                      rows={5}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all resize-none"
                    />
                  </div>

                  <Button
                    id="submit-button"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar mensaje
                  </Button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Los campos marcados con * son obligatorios.
                  </p>
                </div>
              )}
            </div>

            {/* Borde animado */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-500"></div>
          </div>

          {/* Información de contacto y mapa */}
          <div className="flex flex-col gap-8">
            {/* Tarjeta de información */}
            <div
              ref={infoCardRef}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              {/* Gradiente decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10"></div>

              <div className="relative p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Información de contacto
                </h3>

                <div className="space-y-6">
                  <div
                    ref={(el) => { infoItemsRef.current[0] = el; }}
                    className="flex items-start group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-2.5 shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Dirección
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Guápiles, Limón, Costa Rica
                      </p>
                    </div>
                  </div>

                  <div
                    ref={(el) => { infoItemsRef.current[1] = el; }}
                    className="flex items-start group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-2.5 shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Teléfono
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        +506 8888-8888
                      </p>
                    </div>
                  </div>

                  <div
                    ref={(el) => { infoItemsRef.current[2] = el; }}
                    className="flex items-start group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Correo Electrónico
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        info@ezdel.cr
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Borde animado */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-purple-500/30 dark:hover:border-purple-400/30 transition-all duration-500"></div>
            </div>

            {/* Mapa */}
            <div
              ref={mapCardRef}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-[300px] group"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125759.38028798043!2d-83.85536065759033!3d10.21744576533222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0adf056d48371%3A0xf0ae9e97dc5e651a!2zR3XDoXBpbGVz!5e0!3m2!1ses-419!2scr!4v1695742800782!5m2!1ses-419!2scr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Ezdev CR"
                className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Overlay con info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-semibold text-lg">
                    📍 Guápiles, Limón
                  </p>
                </div>
              </div>

              {/* Borde animado */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50 transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl px-8 py-6 shadow-lg">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                ¿Tienes dudas?
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Nuestro equipo está disponible para responder todas tus preguntas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}