'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Download, Mail, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function GraciasPage() {
  const [downloadCount, setDownloadCount] = useState(1247);
  const [timeLeft, setTimeLeft] = useState(5);
  const [autoDownloaded, setAutoDownloaded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Obtener contador actual al cargar la página
  useEffect(() => {
    const fetchDownloadCount = async () => {
      try {
        const response = await fetch('/api/download-counter');
        const data = await response.json();
        if (data.success) {
          setDownloadCount(data.count);
        }
      } catch (error) {
        console.error('Error obteniendo contador:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloadCount();
  }, []);

  // Función para incrementar contador cuando se descarga manualmente
  const incrementCounter = async () => {
    try {
      const response = await fetch('/api/download-counter', {
        method: 'POST'
      });
      const data = await response.json();
      if (data.success) {
        setDownloadCount(data.count);
        return data.count;
      }
    } catch (error) {
      console.error('Error incrementando contador:', error);
    }
    return downloadCount;
  };

  // Auto-descarga después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!autoDownloaded) {
        // Trigger download automático
        const link = document.createElement('a');
        link.href = '/pdf/checklist-25-puntos.pdf';
        link.download = 'Guía-Gratuita-CodigoFacil.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setAutoDownloaded(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [autoDownloaded]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleManualDownload = async () => {
    // Incrementar contador real
    const newCount = await incrementCounter();
    
    // Descargar archivo
    const link = document.createElement('a');
    link.href = '/pdf/checklist-25-puntos.pdf';
    link.download = 'Guía-Gratuita-CodigoFacil.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setAutoDownloaded(true);
    
    console.log('📊 Descarga manual completada. Nuevo contador:', newCount);
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola! Acabé de descargar la Guía Gratuita de CodigoFacil.com y me interesa la consulta gratuita de 30 minutos. ¿Todavía hay cupos disponibles?`
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            💻 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CodigoFacil</span>
            <span className="text-amber-500">.com</span>
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            ¡Gracias! Tu Guía está Lista 🎉
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Hemos enviado la <strong className="text-gray-900 dark:text-gray-100">Guía Gratuita + Checklist + Calculadora ROI</strong> a tu email
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{downloadCount.toLocaleString()}+</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Descargas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">4.9/5</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">⭐ Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">+300%</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">ROI Promedio</div>
            </div>
          </div>
        </div>

        {/* Auto Download Notice */}
        {!autoDownloaded && timeLeft > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6 mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-blue-800 dark:text-blue-200 font-semibold">
                Descarga automática en {timeLeft} segundos...
              </span>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2">
              <div 
                className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Download Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Descarga Instantánea
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                ¿No ves el email? ¡No te preocupes! Descarga tu guía ahora mismo
              </p>
            </div>

            <button
              onClick={handleManualDownload}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
            >
              <div className="flex items-center justify-center gap-3">
                <Download className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-lg">DESCARGAR PDF</div>
                  <div className="text-sm opacity-90">Guía + Checklist + Calculadora</div>
                </div>
              </div>
            </button>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                📎 <strong className="text-gray-900 dark:text-gray-100">Archivo:</strong> Guía-Gratuita-CodigoFacil.pdf<br/>
                💾 <strong className="text-gray-900 dark:text-gray-100">Tamaño:</strong> ~2.5 MB • <strong className="text-gray-900 dark:text-gray-100">Páginas:</strong> 25+
              </p>
            </div>
          </div>

          {/* Bonus Section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl shadow-lg p-8 border-2 border-amber-200 dark:border-amber-700">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🎁</div>
              <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                ¡Bonus Exclusivo!
              </h2>
              <p className="text-amber-700 dark:text-amber-300">
                Consultoría GRATUITA de 30 minutos
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-amber-200 dark:border-amber-700">
              <div className="text-center mb-4">
                <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-3">
                  ⚡ SOLO PRIMEROS 10
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                  Análisis personalizado de tu proyecto
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                  Estrategia de implementación específica
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                  Recomendaciones técnicas avanzadas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                  Plan de acción paso a paso
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/50672904200?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <div className="text-lg">RESERVAR CONSULTA GRATIS</div>
                  <div className="text-sm opacity-90">WhatsApp • Respuesta inmediata</div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Email Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <Mail className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              📧 También te enviamos la guía por email
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📎 PDF Adjunto</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  La guía completa está adjunta en el email que te enviamos. Revisa tu bandeja de entrada y carpeta de spam.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🎯 Oferta Exclusiva</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  El email incluye los detalles de tu consulta gratuita de 30 minutos y cómo reservarla.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            🚀 Próximos pasos recomendados
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">1. Revisa el Checklist</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Lee los 25 puntos y evalúa tu sitio web actual
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="text-3xl mb-3">🧮</div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">2. Usa la Calculadora</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Calcula el ROI potencial de tu inversión web
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="text-3xl mb-3">📞</div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">3. Agenda tu Consulta</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Reserva tu sesión gratuita antes de que se agoten
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          >
            ← Volver al inicio
          </Link>
        </div>

      </main>
    </div>
  );
}