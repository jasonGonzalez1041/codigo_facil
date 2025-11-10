interface FAQ {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQ[]
  title: string
}

export function FAQSchema({ faqs, title }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": title,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQs evergreen para diferentes posts
export const nextjsFAQs: FAQ[] = [
  {
    question: "¿Cuáles son los principios eternos del desarrollo web con Next.js?",
    answer: "Los principios atemporales incluyen: componentes reutilizables, optimización automática de rendimiento, SEO built-in, y arquitectura escalable que funciona durante años."
  },
  {
    question: "¿Por qué Next.js es ideal para principiantes en desarrollo web?",
    answer: "Next.js combina lo mejor de React con optimizaciones automáticas, configuración mínima y convenciones que guían hacia mejores prácticas desde el inicio."
  },
  {
    question: "¿Qué hace que una aplicación Next.js sea evergreen?",
    answer: "El uso de estándares web modernos, componentes modulares, optimización automática y seguimiento de convenciones que se mantienen estables en el tiempo."
  },
  {
    question: "¿Cuál es la diferencia entre Next.js y React puro?",
    answer: "Next.js añade optimizaciones automáticas como server-side rendering, optimización de imágenes, routing automático y mejor SEO sin configuración adicional."
  },
  {
    question: "¿Cómo mantener un proyecto Next.js actualizado y relevante?",
    answer: "Seguir las convenciones del framework, usar componentes modulares, mantener dependencias actualizadas y aplicar principios de clean code atemporales."
  }
]

export const ecommerceFAQs: FAQ[] = [
  {
    question: "¿Cuáles son las mejores prácticas atemporales para e-commerce?",
    answer: "UX intuitivo, checkout simplificado, mobile-first design, velocidad optimizada, elementos de confianza claros y soporte multicanal accesible."
  },
  {
    question: "¿Cómo optimizar la conversión en una tienda online?",
    answer: "Reduce fricción en el checkout, muestra elementos de confianza, ofrece múltiples métodos de pago, garantiza transparencia total en costos y proporciona soporte visible."
  },
  {
    question: "¿Qué elementos nunca deben faltar en un e-commerce?",
    answer: "Certificado SSL, política de devolución clara, múltiples métodos de pago, cálculo automático de envío, soporte al cliente y testimonios reales."
  },
  {
    question: "¿Cómo hacer un e-commerce mobile-friendly?",
    answer: "Diseño mobile-first, botones mínimo 44px, formularios simplificados, navegación thumb-friendly y checkout optimizado para una sola mano."
  },
  {
    question: "¿Cuáles son las métricas más importantes para un e-commerce?",
    answer: "Tasa de conversión (+2%), valor promedio de pedido, tiempo en sitio (+3 min), tasa de abandono de carrito (-70%) y customer lifetime value."
  }
]

export const seoFAQs: FAQ[] = [
  {
    question: "¿Qué hace que una estrategia SEO sea evergreen?",
    answer: "Enfoque en contenido de valor duradero, principios E-E-A-T, estructura técnica sólida, experiencia de usuario óptima y autoridad construida gradualmente."
  },
  {
    question: "¿Cuáles son los pilares del SEO que nunca cambian?",
    answer: "Contenido de calidad, experiencia de usuario excelente, autoridad del dominio, optimización técnica correcta y relevancia temática consistente."
  },
  {
    question: "¿Cómo crear contenido SEO que dure años?",
    answer: "Enfócate en problemas atemporales, usa principios universales, actualiza fechas periódicamente, mantén información factual y crea clústers temáticos."
  },
  {
    question: "¿Qué es más importante: keywords o experiencia de usuario?",
    answer: "La experiencia de usuario es prioridad, ya que Google premia sitios que resuelven problemas reales. Las keywords son el vehículo, no el destino."
  },
  {
    question: "¿Cómo medir el éxito de una estrategia SEO evergreen?",
    answer: "Tráfico orgánico sostenido, posiciones estables en keywords objetivo, tiempo en página alto, tasa de rebote baja y leads orgánicos crecientes."
  }
]