import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Download, ArrowLeft, Star, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '¡Gracias por Descargar! - CodigoFacil.com',
  description: 'Tu guía gratuita ha sido enviada. Descarga directa disponible aquí.',
  robots: 'noindex, nofollow', // No indexar página de agradecimiento
};

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header minimalista */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Volver al Inicio</span>
          </Link>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          {/* Icono de éxito */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Título principal */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎉 ¡Email Enviado Exitosamente!
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu <strong>Guía Gratuita + Checklist de 25 Puntos</strong> ha sido enviada a tu email. 
            Si no la ves, revisa tu carpeta de spam.
          </p>
        </div>

        {/* Cards de información */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Descarga directa */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Descarga Directa
              </h2>
              <p className="text-gray-600 mb-6">
                Por si el email tarda en llegar, puedes descargar tu PDF directamente aquí:
              </p>
              <a
                href="/pdf/checklist-25-puntos.pdf"
                download="Checklist-25-Puntos-Web-Que-Vende.pdf"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Descargar PDF Ahora
              </a>
            </div>
          </div>

          {/* Próximos pasos */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                ¿Qué Sigue?
              </h2>
              <div className="text-left space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Revisa tu email (incluye spam)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Aplica los primeros 5 puntos del checklist</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Usa la calculadora de ROI</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Contáctanos para tu consultoría gratuita</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Oferta especial destacada */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-8 text-center text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">
            🚀 ¡Oferta Exclusiva!
          </h2>
          <p className="text-xl mb-6 text-yellow-100">
            Como descargaste la guía, tienes derecho a <strong>30 minutos de consultoría GRATIS</strong> 
            para revisar tu sitio web actual. ¡Solo para los primeros 10!
          </p>
          <a
            href="https://wa.me/56950225491?text=Hola! Descargué la guía y me gustaría agendar mi consultoría gratuita de 30 minutos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Agendar Consultoría Gratis
          </a>
        </div>

        {/* Social proof y navegación */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Quieres Conocer Más?
            </h3>
            <p className="text-gray-600 mb-8">
              Explora nuestros servicios de desarrollo web especializados para LATAM
            </p>
            
            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1,247+</div>
                <div className="text-sm text-gray-600">Guías Descargadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">4.9/5</div>
                <div className="text-sm text-gray-600">Calificación</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Proyectos</div>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#servicios"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Ver Nuestros Servicios
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Leer el Blog
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer simplificado */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 <strong className="text-white">CodigoFacil.com</strong> - Desarrollo Web para LATAM
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Transformamos ideas en sitios web que venden
          </p>
        </div>
      </footer>
    </div>
  );
}