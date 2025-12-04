// components/ui/cost-calculator.tsx
"use client";
import { useState } from 'react'
import { motion } from 'framer-motion'

export function CostCalculator() {
    const [pages, setPages] = useState(5)
    const [features, setFeatures] = useState(3)
    const [complexity, setComplexity] = useState('basic')

    const calculateCost = () => {
        // Precios base basados en los planes (usando precios oneTime como referencia)
        const basePrices = {
            basic: 350,      // Estático Simple
            intermediate: 800, // Corporativo Premium
            advanced: 1200    // E-commerce Completo
        }

        const baseCost = basePrices[complexity as keyof typeof basePrices] || basePrices.basic

        // Costo por página adicional (ajustado según los planes)
        const pageRates = {
            basic: 50,       // $50 por página extra sobre las 3 incluidas
            intermediate: 40, // $40 por página extra sobre las 10 incluidas
            advanced: 60     // $60 por página extra sobre las 15 incluidas
        }

        // Páginas incluidas en cada plan
        const includedPages = {
            basic: 3,
            intermediate: 10,
            advanced: 15
        }

        const pageRate = pageRates[complexity as keyof typeof pageRates] || pageRates.basic
        const included = includedPages[complexity as keyof typeof includedPages] || includedPages.basic

        // Calcular páginas extras
        const extraPages = Math.max(0, pages - included)
        const pageCost = extraPages * pageRate

        // Costo por característica especial
        const featureRates = {
            basic: 75,       // $75 por característica
            intermediate: 100, // $100 por característica
            advanced: 150    // $150 por característica
        }

        const featureRate = featureRates[complexity as keyof typeof featureRates] || featureRates.basic
        const featureCost = features * featureRate

        return Math.round(baseCost + pageCost + featureCost)
    }

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const estimatedCost = calculateCost()
    const timeEstimate = Math.ceil(estimatedCost / 20) // horas

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
                        max="30"
                        value={pages}
                        onChange={(e) => setPages(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>30+</span>
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
                        max="15"
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
                        <option value="basic">Básico - Sitio Estático (Landing Page)</option>
                        <option value="intermediate">Intermedio - Sitio Corporativo</option>
                        <option value="advanced">Avanzado - E-commerce/App Web</option>
                    </select>
                </div>

                {/* Información del Plan Base */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">
                        💡 Plan Base Seleccionado:
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                        {complexity === 'basic' && 'Estático Simple - Incluye 3 páginas • Desde $350'}
                        {complexity === 'intermediate' && 'Corporativo Premium - Incluye 10 páginas • Desde $800'}
                        {complexity === 'advanced' && 'E-commerce Completo - Incluye 15 páginas • Desde $1,200'}
                    </p>
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
                        Tiempo estimado: {timeEstimate} horas de desarrollo
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        * Equivale a ~${formatPrice(Math.round(estimatedCost / 20))}/hora de desarrollo
                    </p>
                </motion.div>

                {/* CTAs */}
                <div className="space-y-3">
                    <button
                        onClick={() => {
                            const message = `🚀 ¡CALCULÉ MI PROYECTO WEB Y QUIERO COTIZACIÓN URGENTE!

👤 MIS DATOS:
• Nombre: _______________
• Empresa: _____________
• Email: ________________
• Teléfono: ______________

💻 PROYECTO CONFIGURADO EN LA CALCULADORA:
• Páginas: ${pages}
• Funcionalidades: ${features} especiales
• Complejidad: ${complexity.toUpperCase()}
• PRESUPUESTO CALCULADO: $${formatPrice(estimatedCost)} USD
• Tiempo estimado: ${timeEstimate} horas

💰 MI PRESUPUESTO REAL: $_______ USD
📅 FECHA LÍMITE: _______________
🎯 MI NEGOCIO ES: ______________

⚡ URGENTE: ¿Tienen descuento por usar la calculadora?
📞 ¿Cuándo podríamos hablar HOY mismo?

¡No quiero perder esta oportunidad! 🙏`;

                            const whatsappUrl = `https://wa.me/50672904200?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, '_blank');
                        }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        💬 Cotizar Este Proyecto
                    </button>

                    <button
                        onClick={() => {
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
                    * Precios referenciales basados en planes estándar. Cotización final incluye análisis detallado
                </p>
            </div>
        </div>
    )
}

// Exportación por defecto para evitar problemas de importación
export default CostCalculator;