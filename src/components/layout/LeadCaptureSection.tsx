'use client';
import { useState } from 'react';
import { Download, CheckCircle, Star, Calculator } from 'lucide-react';

export default function LeadCaptureSection() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: ''
    });
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [enviado, setEnviado] = useState(false);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEnviando(true);
        setError(null);

        try {
            // 1. Enviar email usando el servidor SMTP local 100% self-hosted
            const response = await fetch('/api/send-email-local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.nombre,
                    email: formData.email,
                    phone: formData.telefono,
                    source: 'lead_magnet_checklist'
                }),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Error al enviar email');
            }

            console.log('✅ Email enviado correctamente:', result.message);

            // 2. Mostrar estado de éxito temporal
            setEnviado(true);
            setFormData({ nombre: '', email: '', telefono: '' });

            // 3. Redirección automática a página de gracias después de 2 segundos
            setTimeout(() => {
                // Usar la URL de redirección del resultado o fallback
                // Usar Next.js router para navegación client-side
                const redirectUrl = result.data?.redirectUrl || '/gracias';
                
                // Evitar hydration issues con navigation
                if (typeof window !== 'undefined') {
                    // Usar setTimeout para evitar problemas durante hydration
                    setTimeout(() => {
                        window.location.href = redirectUrl;
                    }, 100);
                }
            }, 2000);

        } catch (error) {
            console.error('❌ Error en el envío:', error);
            setError(error instanceof Error ? error.message : 'Error al procesar. Por favor, intenta nuevamente.');
        } finally {
            setEnviando(false);
        }
    };

    if (enviado) {
        return (
            <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            ¡Descarga Exitosa!
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Tu PDF <strong>&quot;Checklist 25 Puntos + Calculadora ROI&quot;</strong> ha sido descargado y
                            también te lo enviamos por email con el PDF adjunto.
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <p className="text-green-800">
                                📧 <strong>Revisa tu bandeja de entrada</strong> - Te enviamos el PDF adjunto
                                más una consultoría GRATIS de 30 minutos.
                            </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-blue-800">
                                🚀 <strong>Sistema 100% Self-Hosted</strong> - Sin dependencias de terceros, 
                                mayor privacidad y control total.
                            </p>
                        </div>
                        <button
                            onClick={() => setEnviado(false)}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
                        >
                            Descargar Otro Recurso
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Columna izquierda - Contenido */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <div className="flex text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-sm text-gray-600">+1,247 descargas</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            🎁 <span className="text-blue-600">Guía Gratuita</span> para Tu Sitio Web
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700"><strong>Checklist de 25 puntos</strong> para sitios web que convierten</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calculator className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                <span className="text-gray-700"><strong>Calculadora de ROI</strong> para medir tu inversión</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Download className="w-6 h-6 text-purple-500 flex-shrink-0" />
                                <span className="text-gray-700"><strong>Descarga inmediata</strong> + Copia por email</span>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-yellow-800 text-sm">
                                <strong>🚀 Oferta Especial:</strong> Los primeros 10 que descarguen recibirán
                                30 minutos de consultoría gratis.
                            </p>
                        </div>
                    </div>

                    {/* Columna derecha - Formulario */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Descarga GRATIS
                            </h3>
                            <p className="text-gray-600">
                                Recibe instantáneamente en tu email
                            </p>
                        </div>

                        <form onSubmit={manejarEnvio} className="space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <p className="text-red-800 text-sm">{error}</p>
                                </div>
                            )}
                            
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tu Nombre *
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                    placeholder="Ej: María González"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tu Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                                    Teléfono (Opcional)
                                </label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    value={formData.telefono}
                                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                                    placeholder="+56 9 1234 5678"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={enviando}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                {enviando ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-5 h-5" />
                                        ¡Descargar PDF Gratis!
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                🔒 Respetamos tu privacidad. No spam, solo contenido de valor.
                            </p>
                        </div>

                        {/* Social Proof */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                                <div className="text-center">
                                    <div className="font-bold text-gray-900">1,247+</div>
                                    <div>Descargas</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-900">4.9/5</div>
                                    <div>Calificación</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-900">100%</div>
                                    <div>Gratuito</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}