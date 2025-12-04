// Schema.org structured data para mejor SEO y rich snippets

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CodigoFacil.com",
  "description": "Desarrollo web profesional para empresas de Latinoamérica. Sitios web, tiendas online y aplicaciones desde $99 USD.",
  "url": "https://codigofacil.com",
  "logo": "https://codigofacil.com/icon.svg",
  "foundingDate": "2024",
  "priceRange": "$99 - $5000 USD",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": -15.7833,
      "longitude": -47.8667
    },
    "geoRadius": "10000"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "México",
      "alternateName": "MX"
    },
    {
      "@type": "Country", 
      "name": "Argentina",
      "alternateName": "AR"
    },
    {
      "@type": "Country",
      "name": "Colombia", 
      "alternateName": "CO"
    },
    {
      "@type": "Country",
      "name": "Chile",
      "alternateName": "CL"
    },
    {
      "@type": "Country",
      "name": "Perú",
      "alternateName": "PE"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+50672904200",
    "contactType": "customer service",
    "availableLanguage": "Spanish",
    "hoursAvailable": "Mo-Fr 09:00-18:00"
  },
  "sameAs": [
    "https://wa.me/50672904200"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Desarrollo Web",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Desarrollo Web Personalizado",
          "description": "Sitios web profesionales y personalizados"
        },
        "price": "99",
        "priceCurrency": "USD",
        "availability": "InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Tienda Online E-commerce",
          "description": "Tiendas online completas con pasarelas de pago"
        },
        "price": "299",
        "priceCurrency": "USD",
        "availability": "InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Aplicación Web",
          "description": "Aplicaciones web personalizadas y escalables"
        },
        "price": "599",
        "priceCurrency": "USD", 
        "availability": "InStock"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "47"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CodigoFacil.com",
  "url": "https://codigofacil.com",
  "description": "Desarrollo web profesional para LATAM",
  "inLanguage": "es-ES",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://codigofacil.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@id": "https://codigofacil.com#organization"
  }
};

export const serviceSchema = (serviceName: string, price: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "CodigoFacil.com",
    "url": "https://codigofacil.com"
  },
  "areaServed": ["MX", "AR", "CO", "CL", "PE", "EC", "UY", "BO", "PY"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "USD",
        "availability": "InStock",
        "itemCondition": "NewCondition"
      }
    ]
  },
  "serviceType": "Desarrollo de Software",
  "category": "Web Development"
});

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage", 
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const localBusinessSchema = (country: string) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": `CodigoFacil.com - ${country}`,
  "description": `Desarrollo web profesional para empresas de ${country}`,
  "url": "https://codigofacil.com",
  "priceRange": "$99 - $5000 USD",
  "areaServed": {
    "@type": "Country",
    "name": country
  },
  "serviceArea": {
    "@type": "Country", 
    "name": country
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `Desarrollo Web ${country}`,
          "category": "Web Development"
        },
        "price": "99",
        "priceCurrency": "USD"
      }
    ]
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+50672904200",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  }
});

// Schema para artículos de blog
export const articleSchema = (title: string, description: string, publishedDate: string, author: string = "CodigoFacil.com") => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": author,
    "url": "https://codigofacil.com"
  },
  "publisher": {
    "@type": "Organization", 
    "name": "CodigoFacil.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://codigofacil.com/icon.svg"
    }
  },
  "datePublished": publishedDate,
  "dateModified": publishedDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://codigofacil.com"
  },
  "inLanguage": "es-ES",
  "image": "https://codigofacil.com/og-image.png"
});

// Schema para preguntas frecuentes comunes
export const commonFAQs = [
  {
    question: "¿Cuánto cuesta una página web profesional?",
    answer: "Nuestros sitios web profesionales van desde $99 USD para landing pages hasta $2,500 USD para e-commerce completos, incluyendo hosting y soporte."
  },
  {
    question: "¿Cuánto tiempo tardan en entregar una página web?",
    answer: "Las landing pages las entregamos en 5-7 días, sitios corporativos en 2-3 semanas, y e-commerce en 3-4 semanas."
  },
  {
    question: "¿Incluyen hosting y dominio?",
    answer: "Sí, todos nuestros planes incluyen hosting por 1 año y dominio gratuito. También ofrecemos SSL y soporte técnico."
  },
  {
    question: "¿Trabajan con empresas de toda Latinoamérica?",
    answer: "Sí, trabajamos con clientes de México, Argentina, Colombia, Chile, Perú, Ecuador y todos los países de LATAM."
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos PayPal, transferencias bancarias, y métodos locales como OXXO en México y MercadoPago en Argentina."
  },
  {
    question: "¿Dan soporte después de la entrega?",
    answer: "Sí, incluimos 3 meses de soporte técnico gratuito, capacitación y mantenimiento básico sin costo adicional."
  }
];