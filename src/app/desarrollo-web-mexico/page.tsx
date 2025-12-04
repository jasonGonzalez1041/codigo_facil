'use client'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Metadata se maneja en layout.tsx para client components

export default function DesarrolloWebMexico() {
  const preciosEnPesos = {
    basico: 1980,    // $99 USD x 20 pesos
    intermedio: 5940, // $297 USD x 20 pesos  
    avanzado: 11880   // $594 USD x 20 pesos
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="text-6xl">🇲🇽</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Desarrollo Web <span className="text-green-600">Profesional</span>
            <br />para Empresas de <span className="text-red-600">México</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sitios web, tiendas online y aplicaciones que impulsan negocios mexicanos. 
            Precios accesibles desde $1,980 MXN, hosting incluido y soporte en español.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('https://wa.me/50672904200?text=🇲🇽%20¡Hola!%20Soy%20de%20México%20y%20necesito%20una%20página%20web%20profesional.%20¿Pueden%20ayudarme?%20Presupuesto:%20$_______%20MXN', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
            >
              💬 Cotizar Mi Proyecto
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg">
              📋 Ver Ejemplos
            </Button>
          </div>
        </div>
      </section>

      {/* Precios en Pesos Mexicanos */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            💰 Precios Especiales para México
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-500 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Landing Page</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">${preciosEnPesos.basico.toLocaleString()} MXN</div>
              <p className="text-gray-600 mb-6">Perfecto para emprendedores y pequeñas empresas</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">✅ Diseño profesional responsive</li>
                <li className="flex items-center">✅ Hosting incluido 1 año</li>
                <li className="flex items-center">✅ Dominio .com.mx GRATIS</li>
                <li className="flex items-center">✅ SSL y seguridad</li>
                <li className="flex items-center">✅ Formulario de contacto</li>
              </ul>
              <Button className="w-full">Elegir Plan</Button>
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">MÁS POPULAR</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sitio Corporativo</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">${preciosEnPesos.intermedio.toLocaleString()} MXN</div>
              <p className="text-gray-600 mb-6">Ideal para empresas establecidas</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">✅ Hasta 10 páginas</li>
                <li className="flex items-center">✅ Blog integrado</li>
                <li className="flex items-center">✅ SEO optimizado</li>
                <li className="flex items-center">✅ Google Analytics</li>
                <li className="flex items-center">✅ Redes sociales</li>
                <li className="flex items-center">✅ Soporte 3 meses</li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">Elegir Plan</Button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-500 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tienda Online</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">${preciosEnPesos.avanzado.toLocaleString()} MXN</div>
              <p className="text-gray-600 mb-6">E-commerce completo para vender online</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">✅ Catálogo ilimitado</li>
                <li className="flex items-center">✅ Pagos con tarjeta</li>
                <li className="flex items-center">✅ OXXO, Banco Azteca</li>
                <li className="flex items-center">✅ Inventario automático</li>
                <li className="flex items-center">✅ Envíos integrados</li>
                <li className="flex items-center">✅ Panel administrador</li>
              </ul>
              <Button className="w-full">Elegir Plan</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos en México */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            🇲🇽 ¿Por qué empresas mexicanas nos eligen?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2">Pagos en Pesos</h3>
              <p className="text-gray-600">Acepta OXXO, transferencias bancarias y tarjetas mexicanas</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-xl font-bold mb-2">Horario México</h3>
              <p className="text-gray-600">Soporte en horario mexicano GMT-6 de lunes a viernes</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">Facturación CDMX</h3>
              <p className="text-gray-600">Facturación fiscal mexicana con RFC para empresas</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">WhatsApp México</h3>
              <p className="text-gray-600">Contacto directo por WhatsApp para respuesta inmediata</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🚀 ¿Listo para Impulsar tu Negocio en México?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a cientos de empresas mexicanas que ya confían en nosotros. 
            Tu presencia digital lista en 7 días.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://wa.me/50672904200?text=🇲🇽%20¡Hola!%20Vi%20la%20página%20de%20desarrollo%20web%20para%20México%20y%20estoy%20muy%20interesado.%20Soy%20de%20México%20y%20necesito%20cotización%20URGENTE.%20Mi%20presupuesto:%20$_______%20MXN', '_blank')}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
            >
              💬 Contactar por WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg"
            >
              📞 Llamada Gratis
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}