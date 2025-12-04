'use client'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Metadata se maneja en layout.tsx para client components

export default function DesarrolloWebArgentina() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="text-6xl">🇦🇷</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Desarrollo Web <span className="text-blue-600">Profesional</span>
            <br />para Empresas de <span className="text-blue-800">Argentina</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Páginas web, tiendas online y aplicaciones que potencian negocios argentinos. 
            Desde Buenos Aires hasta Patagonia. Precios accesibles desde $99 USD.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('https://wa.me/50672904200?text=🇦🇷%20¡Hola!%20Soy%20de%20Argentina%20y%20necesito%20una%20página%20web%20profesional.%20¿Pueden%20ayudarme?%20Presupuesto:%20$_______%20USD', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              💬 Solicitar Cotización
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg">
              🏆 Ver Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Servicios para Argentina */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            🚀 Servicios Web para Empresas Argentinas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-4 text-center">🏢</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Sitio Corporativo</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4 text-center">$99 USD</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">✅ Diseño profesional argentino</li>
                <li className="flex items-center">✅ Hosting en Argentina</li>
                <li className="flex items-center">✅ Dominio .com.ar disponible</li>
                <li className="flex items-center">✅ Optimizado para Google AR</li>
                <li className="flex items-center">✅ Integración con redes sociales</li>
              </ul>
              <Button className="w-full">Solicitar Propuesta</Button>
            </div>

            <div className="bg-blue-50 border-2 border-blue-500 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">RECOMENDADO</span>
              </div>
              <div className="text-4xl mb-4 text-center">🛒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">E-commerce Argentina</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4 text-center">$299 USD</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">✅ Pasarela MercadoPago</li>
                <li className="flex items-center">✅ Integración con Correo Argentino</li>
                <li className="flex items-center">✅ Facturación electrónica AFIP</li>
                <li className="flex items-center">✅ Catálogo ilimitado</li>
                <li className="flex items-center">✅ Panel administrador completo</li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Solicitar Propuesta</Button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-4 text-center">📱</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">App Web Profesional</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4 text-center">$599 USD</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">✅ Aplicación web completa</li>
                <li className="flex items-center">✅ Funciona sin internet</li>
                <li className="flex items-center">✅ Base de datos avanzada</li>
                <li className="flex items-center">✅ Reportes automatizados</li>
                <li className="flex items-center">✅ Soporte técnico 6 meses</li>
              </ul>
              <Button className="w-full">Solicitar Propuesta</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas para Argentina */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            🇦🇷 Especialistas en el Mercado Argentino
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2">MercadoPago</h3>
              <p className="text-gray-600">Integración completa con la pasarela de pagos más usada en Argentina</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold mb-2">Facturación AFIP</h3>
              <p className="text-gray-600">Sistema compatible con facturación electrónica y monotributo</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">Envíos Nacionales</h3>
              <p className="text-gray-600">Integración con Correo Argentino, OCA y envíos locales</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-xl font-bold mb-2">Horario Argentina</h3>
              <p className="text-gray-600">Soporte en horario argentino GMT-3 para mejor comunicación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ciudades que servimos */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            🏙️ Servicios en Toda Argentina
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <h3 className="text-lg font-bold text-blue-600 mb-2">🏢 Buenos Aires - CABA</h3>
              <p className="text-gray-600">Desarrollo web para empresas porteñas</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-bold text-blue-600 mb-2">🏭 Córdoba</h3>
              <p className="text-gray-600">Sitios web para el centro del país</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-bold text-blue-600 mb-2">🌾 Rosario</h3>
              <p className="text-gray-600">E-commerce para Santa Fe</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-bold text-blue-600 mb-2">⛰️ Mendoza</h3>
              <p className="text-gray-600">Páginas web para Cuyo</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-bold text-blue-600 mb-2">🌊 Mar del Plata</h3>
              <p className="text-gray-600">Sitios turísticos y comerciales</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-bold text-blue-600 mb-2">🐧 Patagonia</h3>
              <p className="text-gray-600">Desarrollo web hasta el fin del mundo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            💬 Lo que Dicen Nuestros Clientes Argentinos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">👨‍💼</div>
                <div>
                  <h4 className="font-bold">Carlos Mendoza</h4>
                  <p className="text-sm text-gray-600">Empresario - Buenos Aires</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Excelente trabajo con nuestra tienda online. La integración con MercadoPago funciona perfecto y las ventas aumentaron 300%."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">👩‍💼</div>
                <div>
                  <h4 className="font-bold">María Fernández</h4>
                  <p className="text-sm text-gray-600">Emprendedora - Córdoba</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Profesionales, rápidos y entendieron perfectamente lo que necesitaba para mi negocio local. Muy recomendados."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🚀 ¿Listo para Potenciar tu Empresa Argentina?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a empresas argentinas exitosas que ya confían en nosotros. 
            Desde la Patagonia hasta el NOA, tu presencia digital lista en 7 días.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://wa.me/50672904200?text=🇦🇷%20¡Hola!%20Vi%20la%20página%20de%20desarrollo%20web%20para%20Argentina%20y%20estoy%20muy%20interesado.%20Soy%20de%20Argentina%20y%20necesito%20cotización%20URGENTE.%20Mi%20presupuesto:%20$_______%20USD', '_blank')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
            >
              💬 Contactar por WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              📧 Solicitar Propuesta
            </Button>
          </div>
          
          <div className="mt-8 text-lg">
            <p>🕒 Respondemos en horario argentino (GMT-3)</p>
          </div>
        </div>
      </section>
    </div>
  )
}