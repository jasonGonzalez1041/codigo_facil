import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostClient } from './BlogPostClient'

interface BlogPost {
  title: string
  content: string
  excerpt: string
  publishedAt: string
  lastUpdated: string
  readTime: string
  category: string
  image: string
  keywords: string[]
}

const blogPosts: { [key: string]: BlogPost } = {
  "guia-desarrollo-web-nextjs-principiantes": {
    title: "Guía Definitiva: Desarrollo Web con Next.js para Principiantes",
    excerpt: "Domina Next.js desde cero con esta guía evergreen. Pasos atemporales, mejores prácticas y checklist descargable para crear apps web profesionales.",
    publishedAt: "2025-01-01",
    lastUpdated: "2025-01-01", 
    readTime: "15 min",
    category: "Desarrollo Web",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    keywords: ["desarrollo web", "next.js", "react", "tutorial", "principiantes", "javascript"],
    content: `
# Guía Definitiva: Desarrollo Web con Next.js para Principiantes

**Última actualización: Enero 2025** | **Contenido Evergreen** 🌲

¿Quieres dominar el desarrollo web moderno? Esta guía evergreen te enseñará Next.js desde cero con principios atemporales que funcionarán durante años.

## ¿Por Qué Next.js es Ideal para Principiantes?

Next.js combina lo mejor de React con optimizaciones automáticas que te ahorran meses de configuración manual. Es la tecnología elegida por empresas como Netflix, TikTok y Airbnb.

### Beneficios Atemporales de Next.js:

- **🚀 Performance Automático**: Optimización de imágenes, lazy loading y splitting automático
- **📱 SEO Built-in**: Server-side rendering y meta tags dinámicos
- **⚡ Zero Config**: Funciona perfectamente sin configuración compleja
- **🔧 Escalable**: Desde landing pages hasta aplicaciones enterprise

## Configuración Inicial (Válida Siempre)

### Paso 1: Instalación del Entorno

\`\`\`bash
# Instalar Node.js (versión LTS recomendada)
node --version  # Verificar instalación

# Crear proyecto Next.js
npx create-next-app@latest mi-proyecto --typescript --tailwind --app

# Navegar al proyecto
cd mi-proyecto
npm run dev
\`\`\`

### Paso 2: Estructura de Carpetas (Convención Eterna)

\`\`\`
mi-proyecto/
├── src/
│   ├── app/                # App Router (Nueva convención)
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Página principal
│   │   └── globals.css     # Estilos globales
│   ├── components/         # Componentes reutilizables
│   └── lib/               # Utilidades y funciones
├── public/                # Archivos estáticos
└── package.json           # Dependencias
\`\`\`

## Conceptos Fundamentales (Principios Eternos)

### 1. **Componentes React Funcionales**

Los componentes son bloques de construcción reutilizables:

\`\`\`tsx
// components/Button.tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={\`px-6 py-3 rounded-lg font-semibold \${
        variant === 'primary' 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }\`}
    >
      {children}
    </button>
  )
}
\`\`\`

### 2. **Routing con App Router**

Next.js usa routing basado en carpetas (convención que se mantendrá):

\`\`\`
app/
├── page.tsx              # → /
├── about/
│   └── page.tsx          # → /about  
├── blog/
│   ├── page.tsx          # → /blog
│   └── [slug]/
│       └── page.tsx      # → /blog/mi-post
└── api/
    └── contact/
        └── route.ts      # → /api/contact
\`\`\`

### 3. **Manejo de Estado (Hook useState)**

\`\`\`tsx
'use client'  // Necesario para interactividad
import { useState } from 'react'

export default function Contador() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contador: {count}</h2>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Incrementar
      </button>
    </div>
  )
}
\`\`\`

## Mejores Prácticas Evergreen

### ✅ **Performance Eterno**

1. **Optimización de Imágenes Automática**:
\`\`\`tsx
import Image from 'next/image'

<Image 
  src="/hero-image.jpg" 
  alt="Descripción descriptiva"
  width={800} 
  height={400}
  priority  // Para imágenes above-the-fold
/>
\`\`\`

2. **Lazy Loading Nativo**:
\`\`\`tsx
import dynamic from 'next/dynamic'

const ComponentePesado = dynamic(() => import('./ComponentePesado'), {
  loading: () => <p>Cargando...</p>
})
\`\`\`

### ✅ **SEO Optimizado Siempre**

\`\`\`tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Mi Página | Mi Sitio Web",
  description: "Descripción única y descriptiva de 150-160 caracteres",
  keywords: "palabra1, palabra2, palabra3",
  openGraph: {
    title: "Mi Página",
    description: "Descripción para redes sociales", 
    images: ['/og-image.jpg']
  }
}
\`\`\`

### ✅ **Estructura de Datos (Schema.org)**

\`\`\`tsx
export default function ArticlePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Guía Desarrollo Web Next.js",
    "author": {
      "@type": "Organization", 
      "name": "CodigoFacil.com"
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  }
  
  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Contenido del artículo */}
    </>
  )
}
\`\`\`

## Checklist de Proyecto Completo ✅

### **Fase 1: Setup (Día 1)**
- [ ] Instalar Next.js con TypeScript y Tailwind
- [ ] Configurar estructura de carpetas
- [ ] Crear layout base con navegación

### **Fase 2: Páginas Principales (Días 2-3)**  
- [ ] Página principal con Hero section
- [ ] Página About/Servicios
- [ ] Página de contacto con formulario

### **Fase 3: Optimización (Días 4-5)**
- [ ] Configurar metadatos SEO
- [ ] Optimizar imágenes con next/image
- [ ] Añadir loading states

### **Fase 4: Deploy (Día 6)**
- [ ] Configurar Vercel o Cloudflare Pages
- [ ] Configurar dominio personalizado
- [ ] Configurar analytics

## Errores Comunes a Evitar

### ❌ **Error 1: No usar 'use client' para interactividad**
\`\`\`tsx
// ❌ Incorrecto - useState sin 'use client'
import { useState } from 'react'

export default function Component() {
  const [state, setState] = useState(false) // Error!
}

// ✅ Correcto
'use client'
import { useState } from 'react'

export default function Component() {
  const [state, setState] = useState(false) // ✅
}
\`\`\`

### ❌ **Error 2: No optimizar imágenes**
\`\`\`tsx
// ❌ Incorrecto
<img src="/image.jpg" alt="..." />

// ✅ Correcto
<Image src="/image.jpg" alt="..." width={800} height={600} />
\`\`\`

## Próximos Pasos

1. **Practica**: Crea un proyecto personal usando esta guía
2. **Expande**: Añade funcionalidades como autenticación o base de datos
3. **Optimiza**: Implementa testing con Jest y Cypress
4. **Escala**: Aprende sobre microservicios y deployment avanzado

## ¿Necesitas Ayuda Profesional?

Esta guía te da las bases sólidas, pero si quieres acelerar tu proyecto o necesitas funcionalidades avanzadas, podemos ayudarte a implementarlo profesionalmente.

**[💬 Consulta Gratis: Implementa tu Proyecto Next.js](https://wa.me/56995022549?text=Quiero%20implementar%20un%20proyecto%20Next.js%20profesional)**

---

**¿Te ha resultado útil esta guía?** Compártela con otros desarrolladores y síguenos para más contenido evergreen que te convertirá en un expert en desarrollo web.

### Recursos Adicionales Atemporales

- **[Documentación Oficial Next.js](https://nextjs.org/docs)** - Siempre actualizada
- **[React Docs](https://react.dev)** - Conceptos fundamentales
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Styling moderno
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Tipado seguro
    `
  }
}

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return [
    { slug: 'guia-desarrollo-web-nextjs-principiantes' }
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts[params.slug]
  
  if (!post) {
    return {
      title: 'Post no encontrado | CodigoFacil.com'
    }
  }

  return {
    title: `${post.title} | CodigoFacil.com`,
    description: post.excerpt,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.lastUpdated,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    }
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts[params.slug]
  
  if (!post) {
    notFound()
  }

  // Schema.org structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article", 
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Organization",
      "name": "CodigoFacil.com"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "CodigoFacil.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://codigofacil.com/icon.svg"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.lastUpdated,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://codigofacil.com/blog/${params.slug}`
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient post={post} slug={params.slug} />
    </div>
  )
}