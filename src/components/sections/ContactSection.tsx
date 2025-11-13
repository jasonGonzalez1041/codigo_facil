"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formCardRef = useRef<HTMLDivElement>(null);
    const infoCardRef = useRef<HTMLDivElement>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animación del título
            gsap.fromTo(
                titleRef.current,
                { y: -50, opacity: 0, scale: 0.8 },
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
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Animación del formulario
            gsap.fromTo(
                formCardRef.current,
                { x: -100, opacity: 0, rotateY: -15 },
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
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Animación de la tarjeta de información
            gsap.fromTo(
                infoCardRef.current,
                { x: 100, opacity: 0, rotateY: 15 },
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
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Animación del primer botón (latido)
            gsap.to(".whatsapp-btn", {
                scale: 1.05,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                duration: 1.6,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            alert("Por favor completa los campos obligatorios: Nombre, Email y Mensaje");
            return;
        }

        const submitButton = document.querySelector("#submit-button");
        if (submitButton) {
            gsap.to(submitButton, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
            });
        }

        const serviceID = "service_veiqier";
        const templateID = "template_1tbb98q";
        const publicKey = "raQI5NTeYw5TTPZET";

        try {
            setIsLoading(true);

            const templateParams = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                time: new Date().toLocaleString("es-ES"),
            };

            await emailjs.send(serviceID, templateID, templateParams, publicKey);

            setIsSubmitted(true);
            setFormData({ name: "", email: "", phone: "", message: "" });

            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error("Error enviando el formulario:", error);
            alert("Error al enviar el mensaje. Por favor intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, { scale: 1.02, duration: 0.2, ease: "power2.out" });
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, { scale: 1, duration: 0.2, ease: "power2.inOut" });
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
                {/* Título */}
                <motion.div ref={titleRef} className="text-center mb-16">
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
                    {/* Formulario */}
                    <div
                        ref={formCardRef}
                        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                        style={{ perspective: "1000px" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 pointer-events-none"></div>

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
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nombre completo *</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                onFocus={handleInputFocus}
                                                onBlur={handleInputBlur}
                                                placeholder="Juan Pérez"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Correo electrónico *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                onFocus={handleInputFocus}
                                                onBlur={handleInputBlur}
                                                placeholder="juan@ejemplo.com"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            onFocus={handleInputFocus}
                                            onBlur={handleInputBlur}
                                            placeholder="+506 8888-8888"
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Mensaje *</Label>
                                        <Textarea
                                            id="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            onFocus={handleInputFocus}
                                            onBlur={handleInputBlur}
                                            placeholder="Cuéntanos sobre tu proyecto..."
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <Button
                                        id="submit-button"
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? "Enviando..." : <> <Send className="w-5 h-5 mr-2" /> Enviar mensaje </>}
                                    </Button>
                                </form>
                            )}
                        </div>

                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-500 pointer-events-none"></div>
                    </div>

                    {/* Tarjeta de información */}
                    <div
                        ref={infoCardRef}
                        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-fit"
                        style={{ perspective: "1000px" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 dark:from-green-500/10 dark:to-blue-500/10 pointer-events-none"></div>

                        <div className="relative p-8 md:p-10 z-10">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    💬 ¿Listo para empezar tu proyecto?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Contáctanos por WhatsApp y recibe atención inmediata
                                </p>
                            </div>

                            {/* Botones de contacto */}
                            <div className="space-y-4 mb-8 relative z-20">
                                {/* Botón principal */}
                                <button
                                    className="whatsapp-btn w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 flex items-center justify-center gap-3"
                                    onClick={() => {
                                        const msg = `¡Hola! Me interesa conocer más sobre los servicios de CodigoFacil.com 🚀`;
                                        window.open(`https://wa.me/5695022549?text=${encodeURIComponent(msg)}`, "_blank");
                                    }}
                                >
                                    <span className="text-xl">💼💬</span>
                                    <span className="font-semibold">WhatsApp</span>
                                </button>

                                {/* Botón soporte */}
                                <button
                                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                                    onClick={() => {
                                        const msg = `¡Hola! Necesito soporte técnico de CodigoFacil.com 🔧`;
                                        window.open(`https://wa.me/50686462423?text=${encodeURIComponent(msg)}`, "_blank");
                                    }}
                                >
                                    <span className="text-xl">🤖💬</span>
                                    <span className="font-semibold">Soporte Técnico</span>
                                </button>
                            </div>

                            {/* Email */}
                            <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-6">
                                <a
                                    href="mailto:Vecipremiun@gmail.com"
                                    className="inline-flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                                >
                                    <Mail className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="font-medium">Vecipremiun@gmail.com</span>
                                </a>
                            </div>
                        </div>

                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-green-500/30 dark:hover:border-green-400/30 transition-all duration-500 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
