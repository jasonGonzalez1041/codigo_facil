"use client";
import { useState } from 'react'
import { motion } from 'framer-motion'

export function CostCalculator() {
  const [pages, setPages] = useState(5)
  const [features, setFeatures] = useState(3)
  const [complexity, setComplexity] = useState('basic')
  
  const calculateCost = () => {
    const baseCost = 500 // Costo base evergreen
    const pageCost = pages * 100
    const featureCost = features * 150
    const complexityMultiplier = {
      basic: 1,
      intermediate: 1.5,
      advanced: 2.2
    }[complexity] || 1
    
    return Math.round((baseCost + pageCost + featureCost) * complexityMultiplier)
  }

  // Función de formateo consistente para evitar hidratación issues
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const estimatedCost = calculateCost()
  const timeEstimate = Math.ceil(estimatedCost / 400) // $400/día promedio

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        🧮 Calculadora de Costos
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
        Estima el costo de tu proyecto web personalizado
      </p>
      
      <div className="space-y-6">
        {/* Número de Páginas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Número de Páginas: {pages}
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>20+</span>
          </div>
        </div>

        {/* Funcionalidades */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Funcionalidades Especiales: {features}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={features}
            onChange={(e) => setFeatures(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Básico</span>
            <span>Avanzado</span>
          </div>
        </div>

        {/* Complejidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Complejidad del Proyecto
          </label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="basic">Básico - Landing Page</option>
            <option value="intermediate">Intermedio - Sitio Corporativo</option>
            <option value="advanced">Avanzado - E-commerce/App</option>
          </select>
        </div>

        {/* Resultado */}
        <motion.div
          key={estimatedCost}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Estimado del Proyecto
          </p>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            ${formatPrice(estimatedCost)} USD
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Tiempo estimado: {timeEstimate} días laborales
          </p>
        </motion.div>

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={() => {
              const message = `¡Hola! He calculado mi proyecto web con la calculadora de CodigoFacil.com:

📊 *Estimación del Proyecto:*
• Páginas: ${pages}
• Funcionalidades: ${features} especiales
• Complejidad: ${complexity}
• Costo estimado: $${formatPrice(estimatedCost)} USD
• Tiempo: ${timeEstimate} días

🎯 Me interesa una cotización oficial basada en estos parámetros. ¿Podrían ayudarme?`;
              
              const whatsappUrl = `https://wa.me/56995022549?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            💬 Cotizar Este Proyecto
          </button>
          
          <button
            onClick={() => {
              // Scroll to contact form
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            📋 Solicitar Propuesta Detallada
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          * Precios referenciales. Cotización final incluye análisis detallado
        </p>
      </div>
    </div>
  )
}