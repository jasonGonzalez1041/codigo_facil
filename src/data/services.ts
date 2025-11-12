export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  fullDescription: string;
  benefits: string[];
  process: string[];
  technologies: string[];
  price: string;
  timeline: string;
}

export const servicesData: Service[] = [
    {
        id: "web-app",
        title: "Aplicación Web",
        description: "Aplicaciones web complejas con funcionalidades avanzadas",
        icon: "⚡",
        fullDescription: "⚡ Desarrollamos aplicaciones web robustas y súper escalables para automatizar procesos de negocio y multiplicar tu productividad. Desde CRMs personalizados hasta plataformas SaaS completas, creamos soluciones revolucionarias que transforman completamente la forma en que trabajas.",
        benefits: [
            "🤖 Automatización total de procesos empresariales complejos",
            "🎯 Interfaz súper intuitiva y fácil de usar para todos",
            "👥 Acceso multi-usuario con roles y permisos granulares",
            "💾 Base de datos robusta y escalable para millones de registros",
            "🔗 APIs poderosas para integraciones con cualquier sistema",
            "📊 Reportes y dashboards en tiempo real con gráficos dinámicos",
            "🛡️ Respaldos automáticos y seguridad de nivel empresarial",
            "🚀 Escalabilidad infinita para tu crecimiento futuro"
        ],
        process: [
            "🔍 Análisis profundo de procesos y requerimientos técnicos",
            "🏗️ Diseño de arquitectura escalable y base de datos optimizada",
            "🎨 Prototipado interactivo de funcionalidades clave",
            "⚡ Desarrollo iterativo con feedback continuo y demos semanales",
            "🔗 Integración de APIs y servicios externos necesarios",
            "🧪 Testing riguroso de seguridad y performance",
            "🚀 Deployment en infraestructura cloud escalable",
            "📚 Documentación técnica completa y capacitación intensiva"
        ],
        technologies: ["Next.js ⚛️", "Node.js 🟢", "PostgreSQL 🐘", "Redis ⚡", "Docker 🐳", "AWS ☁️", "TypeScript 💙"],
        price: "$3,500 - $8,000 💰",
        timeline: "6-12 semanas ⚡"
    },
  {
    id: "ecommerce",
    title: "E-commerce Profesional",
    description: "Tiendas online completas con sistema de pagos integrado",
    icon: "🛒",
    fullDescription: "🛒 Desarrollamos tiendas online profesionales con todas las funcionalidades necesarias para vender en línea y generar ingresos desde el día uno. Incluye gestión de inventario inteligente, múltiples métodos de pago, panel administrativo completo y optimización máxima para conversiones.",
    benefits: [
      "💳 Sistema de pagos súper seguro (tarjetas, PayPal, transferencias)",
      "📦 Gestión completa de inventario y productos en tiempo real",
      "📊 Panel administrativo profesional para gestionar pedidos",
      "🛍️ Carrito de compras optimizado para máxima conversión",
      "🚚 Integración automática con envíos y logística",
      "🎁 Sistema avanzado de cupones y promociones",
      "📈 Reportes detallados de ventas y analytics en vivo",
      "📱 App móvil opcional disponible para iOS y Android"
    ],
    process: [
      "🔍 Análisis profundo de mercado y competencia",
      "🏗️ Arquitectura de información y catálogo estratégico",
      "🎨 Diseño UI/UX enfocado 100% en conversión y ventas",
      "⚡ Desarrollo del sistema de e-commerce de alta performance",
      "💰 Integración de pasarelas de pago seguras y confiables",
      "🧪 Testing exhaustivo de flujo de compra completo",
      "☁️ Configuración de hosting optimizado y CDN global",
      "🎓 Training completo del equipo y lanzamiento épico"
    ],
    technologies: ["Next.js ⚛️", "Stripe 💳", "PayPal 🅿️", "WooCommerce 🛒", "PostgreSQL 🐘", "Redis ⚡", "AWS ☁️"],
    price: "$2,500 - $6,000 💰",
    timeline: "5-8 semanas 🚀"
  },
    {
        id: "mobile-app",
        title: "Aplicación Móvil",
        description: "Apps móviles nativas y multiplataforma de alto rendimiento",
        icon: "📱",
        fullDescription: "📱 Creamos aplicaciones móviles potentes, fluidas y seguras, diseñadas para ofrecer experiencias excepcionales en iOS y Android. Desde soluciones empresariales hasta apps de consumo masivo, desarrollamos productos escalables y listos para el futuro con una experiencia de usuario impecable.",
        benefits: [
            "⚡ Rendimiento nativo en iOS y Android con un solo código base",
            "🎨 Interfaz moderna, fluida y totalmente personalizada a tu marca",
            "🔔 Notificaciones push, GPS, cámara, pagos y funciones avanzadas",
            "🌎 Publicación en App Store y Google Play con soporte completo",
            "💬 Integración con APIs, chats en tiempo real y servicios cloud",
            "🧩 Arquitectura modular, fácil de escalar y mantener",
            "🛡️ Seguridad avanzada con cifrado de datos y autenticación biométrica",
            "🚀 Actualizaciones OTA (Over-The-Air) sin necesidad de reinstalar"
        ],
        process: [
            "🔍 Análisis profundo del concepto, público y objetivos de la app",
            "🧠 Definición de funcionalidades clave y arquitectura móvil óptima",
            "🎨 Diseño UI/UX centrado en la experiencia del usuario",
            "⚙️ Desarrollo ágil con iteraciones semanales y retroalimentación continua",
            "🔗 Integración con APIs, pasarelas de pago y servicios externos",
            "🧪 Testing intensivo en dispositivos reales (Android y iOS)",
            "📦 Publicación en App Store y Google Play con optimización ASO",
            "📚 Entrega final, documentación técnica y soporte post-lanzamiento"
        ],
        technologies: [
            "React Native ⚛️",
            "Expo 🚀",
            "TypeScript 💙",
            "Node.js 🟢",
            "Firebase 🔥",
            "Supabase 🧩",
            "AWS ☁️",
            "GraphQL 🔗"
        ],
        price: "$4,000 - $9,000 💰",
        timeline: "8-14 semanas ⏱️"
    },
    {
    id: "maintenance",
    title: "Mantenimiento Web",
    description: "Soporte continuo y actualizaciones para tu sitio web",
    icon: "🔧",
    fullDescription: "🔧 Ofrecemos servicios completos de mantenimiento web para mantener tu sitio súper seguro, actualizado y funcionando perfectamente 24/7. Incluye monitoreo inteligente, backups automáticos, actualizaciones de seguridad inmediatas y soporte técnico prioritario en español.",
    benefits: [
      "👀 Monitoreo inteligente 24/7 de disponibilidad y performance",
      "💾 Backups automáticos diarios con restauración en 1-click",
      "🛡️ Actualizaciones de seguridad inmediatas y parches críticos",
      "⚡ Optimización continua de performance y velocidad",
      "🚨 Soporte técnico prioritario en menos de 2 horas",
      "📊 Análisis mensual detallado de métricas y estadísticas",
      "🔧 Pequeñas modificaciones y mejoras incluidas",
      "📈 Informes detallados de estado y recomendaciones"
    ],
    process: [
      "🔍 Auditoría inicial completa del sitio web",
      "📡 Configuración de monitoreo avanzado y alertas inteligentes",
      "💾 Implementación de sistema de backups automatizados",
      "🔄 Establecimiento de protocolo de actualizaciones seguras",
      "📊 Configuración de métricas y reportes en tiempo real",
      "🚀 Inicio de soporte continuo 24/7 en español",
      "📅 Revisiones mensuales programadas y optimizaciones"
    ],
    technologies: ["Hosting Cloud ☁️", "Cloudflare 🔒", "Monitoring Tools 📊", "Backup Systems 💾", "SSL 🛡️"],
    price: "$150 - $400/mes 💰",
    timeline: "Servicio continuo 🔄"
  },
  {
    id: "consulting",
    title: "Consultoría Digital",
    description: "Asesoramiento estratégico para tu transformación digital",
    icon: "💡",
    fullDescription: "💡 Brindamos consultoría especializada de alto nivel para guiar tu transformación digital completa. Analizamos tu negocio actual, identificamos oportunidades de crecimiento exponencial y creamos un roadmap tecnológico estratégico que impulse el éxito de tu empresa.",
    benefits: [
      "🔍 Análisis profundo y estratégico de tu negocio actual",
      "🎯 Estrategia tecnológica 100% personalizada para tu industria",
      "📋 Roadmap detallado de implementación con fases y prioridades",
      "🤖 Identificación de oportunidades de automatización y eficiencia",
      "🛠️ Recomendaciones de herramientas y plataformas ideales",
      "🚀 Plan de migración y modernización paso a paso",
      "👥 Capacitación intensiva del equipo interno",
      "📈 Seguimiento continuo y ajustes estratégicos"
    ],
    process: [
      "🎯 Entrevistas detalladas con stakeholders clave",
      "🔍 Auditoría completa de sistemas y procesos actuales",
      "📊 Análisis competitivo de mercado y benchmarking",
      "💡 Diseño de estrategia digital personalizada y única",
      "📋 Creación de roadmap de implementación con timelines",
      "👔 Presentación ejecutiva de recomendaciones estratégicas",
      "⚡ Plan de acción con prioridades claras y métricas"
    ],
    technologies: ["Business Analysis 📊", "Digital Strategy 💡", "Process Automation 🤖", "Cloud Solutions ☁️"],
    price: "$800 - $2,000 💰",
    timeline: "2-4 semanas ⚡"
  },
  {
    id: "optimization",
    title: "Optimización y SEO",
    description: "Mejora el rendimiento y posicionamiento de tu sitio",
    icon: "📈",
    fullDescription: "📈 Optimizamos tu sitio web para obtener el máximo rendimiento, velocidad de carga ultrarrápida y posicionamiento #1 en Google. Incluye auditoría técnica completa, optimización de performance avanzada, SEO on-page profesional y estrategia de contenido ganadora.",
    benefits: [
      "⚡ Mejora dramática en velocidad de carga (hasta 90% más rápido)",
      "🎯 Optimización perfecta para Core Web Vitals de Google",
      "🔍 SEO on-page completo y técnico de nivel profesional",
      "📊 Estrategia de palabras clave de alto impacto y conversión",
      "📱 Optimización perfecta para móviles y todos los dispositivos",
      "🚀 Mejora exponencial de experiencia de usuario (UX)",
      "📈 Aumento garantizado en rankings de Google (Top 3)",
      "📋 Reportes mensuales detallados de progreso y métricas"
    ],
    process: [
      "🔍 Auditoría técnica completa y profunda del sitio",
      "🕵️ Análisis competitivo de SEO y gap analysis",
      "🎯 Research intensivo de palabras clave estratégicas",
      "⚡ Optimización técnica avanzada y mejora de performance",
      "📝 Implementación profesional de SEO on-page",
      "✍️ Optimización y reescritura de contenido existente",
      "📊 Monitoreo continuo y seguimiento de resultados"
    ],
    technologies: ["Google Analytics 📊", "Search Console 🔍", "PageSpeed Insights ⚡", "Semrush 🎯", "GTM 📈"],
    price: "$600 - $1,500 💰",
    timeline: "3-4 semanas 🚀"
  }
];