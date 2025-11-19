# AGENTS.md - Guía de Desarrollo para CodigoFacil.com

## 🎯 Información del Proyecto

### Propósito
- **Sitio web corporativo** para CodigoFacil.com - empresa de desarrollo web para LATAM
- **Landing page profesional** con servicios, blog, calculadora de costos y formularios de contacto
- **Enfoque en conversión** y experiencia de usuario optimizada para mercado latinoamericano
- **Target**: Empresas de México, Argentina, Colombia, Chile, Perú, Ecuador, Uruguay, Bolivia, Paraguay

### Stack Tecnológico Principal
- **Framework**: Next.js 16.0.2 (App Router) con deployment en Vercel
- **Lenguaje**: TypeScript 5+ con configuración strict mode
- **UI Framework**: React 19.2.0 con React DOM 19.2.0
- **Styling**: Tailwind CSS 4 + shadcn/ui components (New York style)
- **Estado**: Zustand 5.0.8 para gestión de estado ligera
- **Animaciones**: Framer Motion 12.23.22 + GSAP 3.13.0 con ScrollTrigger
- **Deployment**: Vercel Platform (primary) con configuración optimizada
- **Contacto**: WhatsApp Business (+56950225491) integrado

### Dependencias Clave de UI/UX
- **UI Primitives**: Radix UI (dropdown-menu, dialog, label, slot)
- **Icons**: Lucide React 0.544.0
- **Styling**: class-variance-authority, clsx, tailwind-merge
- **Animations**: tailwindcss-animate + framer-motion + gsap
- **Themes**: next-themes 0.4.6 para modo claro/oscuro/sistema
- **Fonts**: Inter + JetBrains Mono via next/font/google
- **Analytics**: Vercel Analytics 1.5.0
- **Forms**: @emailjs/browser 4.4.1 para formularios de contacto

## 🚀 Comandos de Desarrollo Rápido

### Scripts de Proyecto
```bash
# Desarrollo
npm run dev                  # Next.js dev server (localhost:3000)

# Build y Deploy
npm run build               # Build estándar Next.js
npm run build:test          # Test de build process con verificación
npm run start               # Production server local

# Deploy a Vercel
npm run vercel:deploy       # Deploy a Vercel (producción)
npm run vercel:preview      # Preview en Vercel

# Calidad de Código
npm run lint                # ESLint check con Next.js rules
```

## 🔥 Contexto Crítico del Proyecto (LEER PRIMERO)

### Estado Actual del Desarrollo
- **Proyecto REAL en producción** - No es template ni demo
- **Cliente real**: CodigoFacil.com operando comercialmente
- **Revenue activo**: Servicios desde $99 USD hasta $20/hora
- **WhatsApp Business**: +56950225491 (integración crítica para conversiones)
- **Dominio en vivo**: https://codigofacil.com

### Servicios Comerciales Implementados (6 Principales)
1. **Desarrollo Web Personalizado** - $99-800 USD
2. **Tienda Online E-commerce** - $800-2500 USD  
3. **Aplicación Web** - $1500-5000 USD
4. **Diseño Web y UI/UX** - $200-1000 USD
5. **SEO y Marketing Digital** - $300-1500 USD
6. **Mantenimiento y Soporte** - $20/hora

### Calculadora de Costos (Funcionalidad CRÍTICA)
- **Componente central** para conversión de leads
- **Matemática precisa** validada en producción
- **Integración directa** con WhatsApp para cotizaciones
- **Variables**: páginas, complejidad, características, diseño, integraciones
- **Output**: Precio USD + tiempo estimado + mensaje WhatsApp automático

## ⚠️ REGLAS DE DESARROLLO CRÍTICAS

### 🎯 REGLA DE ORO
**NUNCA cambiar la lógica de precios de la calculadora sin verificación matemática completa**
- Los cálculos afectan cotizaciones REALES de clientes
- Cualquier error puede generar pérdidas económicas
- Siempre probar con casos extremos antes de deploy

### Componentes CRÍTICOS (NO tocar sin justificación)
1. **`src/components/ui/cost-calculator.tsx`** - Lógica de precios
2. **`src/data/services.ts`** - Información comercial y precios
3. **`src/components/layout/FloatingWhatsApp.tsx`** - Integración de contacto
4. **`src/app/layout.tsx`** - SEO y metadatos para LATAM

### Estado Actual de Funcionalidades
- ✅ **Calculadora de costos**: FUNCIONANDO en producción
- ✅ **WhatsApp integration**: ACTIVO con número real (+56950225491)
- ✅ **SEO para LATAM**: Metadatos completos implementados
- ✅ **Responsive design**: Mobile-first COMPLETO
- ✅ **Sistema de modales**: Zustand store funcionando
- ✅ **Lead Magnet System**: PDF de 25 puntos + auto-descarga implementado
- ✅ **SMTP Self-Hosted**: Sistema de email 100% propio funcionando
- ✅ **Notificaciones internas**: Automáticas a vecipremiun@gmail.com
- ✅ **Blog system**: MDX implementado con artículos LATAM
- ✅ **Formularios backend**: Sistema local SMTP operativo
- 🔄 **Analytics**: Google Analytics pendiente configuración
- 🔄 **PWA features**: Pendiente implementación

## 🚨 Prioridades Inmediatas de Desarrollo

### 🔥 Crítico (Esta semana)
- **Configurar dominio personalizado** `codigofacil.com` en Vercel
- **Implementar Google Analytics 4** con eventos de conversión
- **Activar formularios funcionales** con backend EmailJS/Cloudflare Workers
- **Verificar calculadora de costos** en todos los dispositivos

### ⚡ Alto (Este mes)
- **Contenido real del blog** - Artículos SEO para LATAM
- **Imágenes optimizadas** - Logo definitivo y portfolio real
- **Páginas de servicios individuales** (`/servicios/desarrollo-web`, etc.)
- **Core Web Vitals optimization** - LCP < 2.5s, FID < 100ms, CLS < 0.1

### 🎯 Medio (1-2 meses)
- **PWA features** - Service Worker, offline fallback
- **Internacionalización** - Soporte multi-idioma (ES/EN)
- **A/B Testing setup** para optimización de conversión
- **CRM Integration** (HubSpot/Pipedrive)

## ⚠️ Problemas Conocidos y Limitaciones

### Vercel Deployment (RESUELTO)
- ✅ **React 19 + Next.js 16**: Compatible y funcionando
- ✅ **Build process**: Sin errores en producción
- ✅ **Image optimization**: Configurado para Vercel nativo
- ✅ **Security headers**: Implementados en vercel.json

### Sistema SMTP y Lead Magnet (RESUELTO)
- ✅ **PDF corrupto**: Solucionado - PDF real de 26.9 KB con contenido
- ✅ **Email delivery**: Gmail SMTP funcionando al 100%
- ✅ **Notificaciones internas**: Automáticas a vecipremiun@gmail.com
- ✅ **Rutas PDF**: Corregidas todas las referencias (/pdf/checklist-25-puntos.pdf)
- ✅ **wkhtmltopdf**: Instalado para generación de PDFs desde HTML
- ✅ **Logs de debugging**: Sistema completo de tracking funcional

### Dependencias Críticas (NO cambiar sin testing)
- **@vercel/analytics**: Integrado y funcionando
- **framer-motion**: Versión 12.23.22 estable con React 19
- **zustand**: Estado global mínimo pero crítico para modales
- **tailwind-merge + clsx**: Esencial para sistema de componentes
- **nodemailer**: Versión 7.0.10 para SMTP self-hosted
- **zod**: Versión 4.1.12 para validación de formularios

## 🔧 Configuración del Proyecto

### Archivos de Configuración Principales
- **`next.config.js`**: Optimización de imágenes para Vercel, headers de seguridad, rewrites para SEO
- **`vercel.json`**: Configuración específica de Vercel con headers de seguridad y redirects
- **`tailwind.config.js`**: Design system con colores brand y modo oscuro
- **`components.json`**: shadcn/ui configuración (New York style)
- **`tsconfig.json`**: TypeScript strict con path aliases (@/*)
- **`eslint.config.mjs`**: Linting Next.js + TypeScript
- **`build-test.js`**: Script de verificación de build personalizado

## 📂 Estructura de Archivos

### Estructura Actual del Workspace
```
codigofacil-site/
├── src/app/                    # Next.js App Router
│   ├── globals.css            # Estilos globales con CSS custom properties
│   ├── layout.tsx             # RootLayout con SEO completo + Schema.org
│   ├── page.tsx               # Homepage principal
│   ├── robots.ts              # SEO robots.txt automático
│   ├── sitemap.ts             # XML sitemap automático
│   ├── api/                   # API routes (si se implementan)
│   └── blog/                  # Sistema de blog con MDX
│       ├── page.tsx           # Lista de posts
│       ├── BlogPageClient.tsx # Componente cliente
│       └── [slug]/            # Posts dinámicos
├── src/components/            # Componentes React organizados
│   ├── layout/               # Header, Footer, FloatingWhatsApp
│   │   ├── Header.tsx        # Navegación principal
│   │   ├── Footer.tsx        # Footer con contacto
│   │   ├── FloatingWhatsApp.tsx # WhatsApp Business integration
│   │   └── LeadCaptureSection.tsx # Captura de leads
│   ├── sections/             # Secciones principales de página
│   │   ├── HeroSection.tsx   # Landing con animaciones GSAP
│   │   ├── ServicesSection.tsx # Grid de servicios
│   │   ├── PricingSection.tsx # Planes y precios
│   │   ├── ProjectsSection.tsx # Portfolio (pendiente)
│   │   ├── BlogSection.tsx   # Preview blog
│   │   └── ContactSection.tsx # Formularios de contacto
│   ├── ui/                   # shadcn/ui components + custom
│   │   ├── cost-calculator.tsx # CRÍTICO - Calculadora de precios
│   │   ├── service-modal.tsx  # Modales de servicios
│   │   ├── button.tsx        # Button base con variantes
│   │   ├── dialog.tsx        # Dialog primitives
│   │   ├── mode-toggle.tsx   # Theme switcher
│   │   └── [otros componentes UI]
│   └── theme-provider.tsx    # Provider de temas
├── src/content/              # Contenido estático
│   └── blog/                # Posts en formato MDX
├── src/data/                # Configuración y datos
│   └── services.ts          # CRÍTICO - 6 servicios con precios
├── src/lib/                 # Utilidades y helpers
│   ├── utils.ts             # cn() function + utilidades
│   └── blog-content.ts      # Helpers para blog MDX
├── src/store/               # Estado global Zustand
│   └── modalStore.ts        # Estado de modales UI
├── public/                  # Assets estáticos
│   ├── pdf/                # Documentos PDF
│   └── [iconos y imágenes]
├── AGENTS.md               # ESTE archivo - Guía desarrollo
├── CLAUDE.md               # Contexto específico Claude
├── TODO.md                 # Lista tareas pendientes
├── package.json            # Dependencias y scripts
├── next.config.js          # Configuración Next.js + Vercel
├── tailwind.config.js      # Design system + tema
├── tsconfig.json           # TypeScript strict config
├── vercel.json             # Headers seguridad + redirects
└── components.json         # shadcn/ui config (New York style)
```

## 🛠️ Patrones de Desarrollo Establecidos

### Estructura de Componentes (OBLIGATORIO)
```tsx
// 1. React y Next.js imports primero
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// 2. Librerías externas
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 3. Componentes internos
import Header from '@/components/layout/Header'

// 4. Store, datos y tipos
import { useModalStore } from '@/store/modalStore'
import { servicesData } from '@/data/services'
import type { Service } from '@/data/services'
```

### Componentes UI con shadcn/ui Pattern
```tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <element
        className={cn("base-classes", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"
```

### Estado Global (Zustand Pattern)
```tsx
import { create } from 'zustand'

interface StoreState {
  value: boolean
  setValue: (value: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  value: false,
  setValue: (value) => set({ value }),
}))
```

## 🛠️ Convenciones de Desarrollo

### Estructura de Componentes
- **Functional components** con hooks exclusivamente (NO class components)
- **TypeScript interfaces** obligatorias para todas las props
- **Barrel exports** en directorios cuando corresponde (`index.ts`)
- **shadcn/ui pattern** para componentes base reutilizables
- **Forwardref** para componentes que necesitan ref forwarding

### Naming Conventions
- **Componentes**: PascalCase (`HeroSection.tsx`, `CostCalculator.tsx`)
- **Archivos de páginas**: kebab-case (`page.tsx`, `layout.tsx`)
- **Hooks personalizados**: camelCase con prefijo `use` (`useModalStore`)
- **CSS Classes**: Tailwind utilities + design tokens (NO CSS modules)
- **Variables/Functions**: camelCase (`isAnyModalOpen`, `setIsAnyModalOpen`)
- **Constants**: UPPER_SNAKE_CASE para constantes globales
- **Types/Interfaces**: PascalCase (`Service`, `ModalState`)

### Import Organization (OBLIGATORIO)
```typescript
// 1. React y Next.js core
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// 2. Librerías externas (UI, animaciones, etc.)
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 3. Componentes internos
import Header from '@/components/layout/Header'
import ServiceModal from '@/components/ui/service-modal'

// 4. Store, datos y tipos
import { useModalStore } from '@/store/modalStore'
import { servicesData } from '@/data/services'
import type { Service } from '@/data/services'
```

### Gestión de Estado (Arquitectura Obligatoria)
- **Zustand** para estado global ligero (modales, UI state)
  - `modalStore.ts` para gestión de modales
- **useState** para estado local simple (forms, toggles)
- **useReducer** para estado complejo local (>5 estados relacionados)
- **Context API** SOLO para providers de configuración (theme, etc.)
- **NO Redux** - proyecto mantiene simplicidad con Zustand

### Componentes UI (shadcn/ui Standards)
- **Base en Radix UI primitives** para accesibilidad automática
- **class-variance-authority (cva)** para variantes de componentes
- **cn()** utility OBLIGATORIA para merge de clases CSS
- **forwardRef** para todos los componentes UI que pueden recibir ref
- **displayName** establecido para debugging

## 🎨 Design System

### Colores y Theming (CSS Custom Properties)
- **Primary Brand**: Azul (#0ea5e9) con escala completa 50-900
  ```css
  primary: {
    500: "#0ea5e9",  // Color principal
    600: "#0284c7",  // Hover states
    700: "#0369a1",  // Active states
  }
  ```
- **Dark/Light mode** automático con `next-themes`
- **CSS Custom Properties** en `globals.css` con `hsl(var(--primary))`
- **Design tokens** centralizados en `tailwind.config.js`
- **Consistent spacing**: rem-based con Tailwind scale (4px base)

### Tipografía (Google Fonts Optimized)
- **Primary**: Inter variable font (`--font-inter`)
- **Monospace**: JetBrains Mono (`--font-jetbrains-mono`) para código
- **Scale**: text-xs a text-6xl siguiendo Tailwind type scale
- **Font loading**: Optimizado con `next/font/google`
- **Antialiasing**: `antialiased` por defecto

### Responsive Design (Mobile-First OBLIGATORIO)
- **Mobile-first** approach siempre
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1400px)
- **Container**: Centrado con `padding: 2rem` y `max-width: 1400px` en 2xl
- **Grid**: CSS Grid y Flexbox preferidos sobre float
- **Images**: `unoptimized: true` por compatibilidad static export

## ⚡ Performance y Optimización

### Next.js App Router Best Practices
- **Server Components por defecto** - solo usar 'use client' cuando sea necesario
- **Static exports** configurado para Cloudflare Pages
- **Image optimization disabled** (compatible con static export)
- **Metadata API** para SEO completo

### Optimizaciones Implementadas
- **Bundle splitting** automático con Next.js
- **Tree shaking** para librerías no utilizadas
- **Font optimization** con next/font/google
- **CSS-in-JS** evitado - solo Tailwind CSS

### Performance Budget
- **Initial load**: <200KB target
- **Core Web Vitals**: Optimizado para LCP, FID, CLS
- **Images**: WebP/AVIF preferido, lazy loading

## 📋 Características Clave del Proyecto

### Funcionalidades Principales Implementadas
- **Sistema de Blog MDX**: Posts dinámicos con SEO optimizado
- **Calculadora de Costos**: Componente interactivo para cotizaciones
- **Sistema de Modales**: Gestión con Zustand para detalles de servicios
- **WhatsApp Integration**: Botón flotante con ofertas y contacto directo
- **Modo Oscuro/Claro**: Theme switching con next-themes
- **SEO Completo**: Metadatos, Schema.org, sitemap/robots automáticos
- **Responsive Design**: Mobile-first con Tailwind CSS
- **Animaciones Avanzadas**: GSAP + Framer Motion para micro-interactions

### Servicios Configurados (6 Principales)
```typescript
// Definidos en src/data/services.ts
1. Desarrollo Web Personalizado
2. Tienda Online E-commerce  
3. Aplicación Web
4. Diseño Web y UI/UX
5. SEO y Marketing Digital
6. Mantenimiento y Soporte
```

### Integración WhatsApp Business
- **Número**: +56950225491 (Chile)
- **Mensaje automático** con detalles de cotización
- **Ofertas flotantes** con prompts dinámicos
- **Integración directa** desde calculadora de costos

## 🎯 Reglas de Desarrollo Críticas

### Tecnología Stack Decisions (NO CAMBIAR sin justificación)
- **Next.js App Router**: Elegido por SEO automático y performance
- **Vercel deployment**: Optimizado para Next.js con edge functions
- **Tailwind + shadcn/ui**: Por consistencia y velocidad de desarrollo
- **Zustand**: Elegido por simplicidad vs Redux complexity
- **TypeScript strict mode**: Obligatorio para calidad de código


## 🚀 Deployment y CI/CD

### Vercel Platform Setup
- **Platform**: Vercel (optimized for Next.js 16 + React 19)
- **Domain**: codigofacil.com con SSL automático
- **Build command**: `npm run build`
- **Output**: Standard Next.js output
- **Features**: Image optimization, serverless functions, edge functions
- **Analytics**: Vercel Analytics integrado

### Build Scripts
```json
{
  "dev": "next dev",              // Desarrollo local
  "build": "next build",          // Build estándar
  "build:test": "node build-test.js", // Test de build process
  "lint": "eslint",               // Linting
  "vercel:deploy": "vercel --prod", // Deploy a producción
  "vercel:preview": "vercel"      // Preview deployment
}
```

### Deployment Workflow
1. **Development**: `npm run dev` (localhost:3000)
2. **Build verification**: `npm run build:test`
3. **Linting**: `npm run lint`
4. **Deploy**: `npm run vercel:deploy` o automatic via Git push

## 📋 Reglas y Best Practices

### Calidad de Código
- **ESLint** obligatorio antes de commits
- **TypeScript strict** mode habilitado
- **Prettier** para formateo consistente
- **Husky hooks** para pre-commit (recomendado)

### Git Workflow
- **Conventional commits** obligatorio:
  ```
  feat: add new service calculator
  fix: resolve modal z-index issue
  test: add coverage for Button component
  docs: update README deployment section
  ```
- **Branch naming**: `feature/`, `fix/`, `test/`, `docs/`
- **PR reviews** obligatorias para main

### Seguridad
- **No API keys** en código cliente
- **Environment variables** para configuración
- **HTTPS only** en producción
- **CSP headers** configurados en Cloudflare

### SEO y Accesibilidad
- **Semantic HTML** obligatorio
- **Alt texts** en todas las imágenes
- **ARIA labels** donde sea necesario
- **Meta tags** completos en layout.tsx
- **Schema.org** structured data implementado

## 🔧 Development Setup

### Requisitos Previos
- Node.js 18+ (ver `.nvmrc`)
- npm o pnpm
- Git configurado

### Instalación Inicial
```bash
git clone [repository]
cd codigofacil-site
npm install
npm run dev
```

### Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://codigofacil.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Testing Setup
```bash
npm run test          # Run once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

## 📚 Documentación de Componentes

### Componentes UI Principales
- **Button**: shadcn/ui base con variantes personalizadas
- **CostCalculator**: Calculadora interactiva con 18 pruebas
- **ModeToggle**: Switch de tema con dropdown
- **ServiceModal**: Modal con animaciones GSAP

### Secciones de Página
- **HeroSection**: Landing principal con animaciones
- **ServicesSection**: Grid de servicios con modales
- **BlogSection**: Preview de artículos del blog
- **ContactSection**: Formularios y información de contacto

### Datos y Estado
- **services.ts**: Configuración de servicios (6 servicios)
- **modalStore.ts**: Estado global de modales con Zustand

## ⚠️ Consideraciones Especiales

### Limitaciones Conocidas
- **Static export** limita algunas features de Next.js
- **Image optimization** deshabilitada por compatibilidad
- **ISR/SSR** no disponible en Cloudflare Pages static

### Workarounds Implementados
- **Custom image components** para optimización
- **Client-side routing** para SPAs
- **Static sitemap/robots** generation

### Dependencies Críticas
- **@cloudflare/next-on-pages**: Adaptador obligatorio
- **gsap**: Licencia comercial si es para uso comercial
- **radix-ui**: Base de componentes UI

## 🎯 Próximos Pasos y TODOs

### Desarrollo Pendiente (Prioridad Alta)
- **Google Analytics 4** - Configurar tracking y eventos de conversión
- **Dominio personalizado** - Configurar DNS para codigofacil.com 
- **PWA features** - Service Worker y offline fallback
- **Testing suite** - Jest + React Testing Library expandido

### Sistema de Email (COMPLETADO ✅)
- ✅ **SMTP Self-Hosted** - Gmail funcionando perfectamente
- ✅ **Lead Magnet** - PDF de 25 puntos implementado
- ✅ **Notificaciones internas** - Automáticas a vecipremiun@gmail.com
- ✅ **Templates HTML** - Diseño profesional completado
- ✅ **Auto-descarga** - Sistema de backup funcional

### Performance Improvements
- **Image optimization** - Implementar WebP/AVIF automático
- **Bundle analysis** - Optimizar tamaño de bundles
- **Core Web Vitals** - Monitoreo automático
- **CDN optimization** - Cloudflare integration

### Testing Expansion
- **E2E tests** - Playwright para flujos críticos
- **Load testing** - Sistema SMTP bajo carga
- **Email deliverability** - Testing de spam scores
- **Accessibility testing** - axe-core integration

## 🔗 Links de Referencia

### Documentación Oficial
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)

### Tools y Utilidades
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🎯 Contexto de Negocio y Características Específicas

### Servicios de CodigoFacil.com (6 Servicios Principales)
```typescript
// Interface completa en src/data/services.ts
export interface Service {
  id: string                 // web-development, ecommerce, web-app, etc.
  title: string             // "Desarrollo Web Personalizado"
  description: string       // Descripción corta para cards
  icon: string             // Emoji como ícono
  fullDescription: string  // Descripción completa con emojis
  benefits: string[]       // Lista de beneficios (8 items)
  process: string[]        // Proceso paso a paso (7 items)
  technologies: string[]   // Stack tecnológico usado
  price: string           // Rango de precios en USD
  timeline: string        // Tiempo estimado de entrega
}

// 6 servicios definidos con datos completos:
// 1. Desarrollo Web Personalizado
// 2. Tienda Online E-commerce  
// 3. Aplicación Web
// 4. Diseño Web y UI/UX
// 5. SEO y Marketing Digital
// 6. Mantenimiento y Soporte
```

### Arquitectura de Componentes Principales
```
src/components/
├── layout/
│   ├── Header.tsx          # Navegación principal con modo toggle
│   └── Footer.tsx          # Footer con links y contacto
├── sections/
│   ├── HeroSection.tsx     # Landing principal con animaciones GSAP
│   ├── ServicesSection.tsx # Grid de servicios con modales
│   ├── PricingSection.tsx  # Sección de precios
│   ├── BlogSection.tsx     # Preview blog + newsletter
│   └── ContactSection.tsx  # Formularios con EmailJS
└── ui/
    ├── cost-calculator.tsx # Calculadora interactiva
    ├── service-modal.tsx   # Modales de servicios detallados
    ├── mode-toggle.tsx     # Switch de temas
    └── button.tsx          # Button base con variantes
```

### Calculadora de Costos (Funcionalidad Crítica)
- **18 pruebas automatizadas** validando cálculos matemáticos precisos
- **Componente**: `src/components/ui/cost-calculator.tsx`
- **Funcionalidades validadas**:
  - Sliders para complejidad, páginas, funcionalidades
  - Selects para diseño, integraciones, soporte
  - Cálculo dinámico de precio y tiempo en USD
  - Integración directa con WhatsApp para cotización
  - Animaciones de precio con Framer Motion
  - Formateo automático de moneda y tiempo

### Integración WhatsApp (Conversión)
```typescript
// Integración automática para cotizaciones
const whatsappMessage = `Hola! Quiero una cotización para:
- Tipo: ${selectedService}
- Presupuesto estimado: $${calculatedPrice} USD
- Tiempo estimado: ${estimatedTime}
- Características adicionales: ${features}`;

const whatsappUrl = `https://wa.me/56950225491?text=${encodeURIComponent(whatsappMessage)}`;
// Número de contacto: +56950225491 (Chile)
```

### Sistema SMTP Self-Hosted (NUEVO - Implementado)
- **Servidor**: Gmail SMTP + App Password (100% self-hosted)
- **Archivo principal**: `src/lib/smtp-server.ts` + `src/lib/email-service-local.ts`
- **Funcionalidades**:
  ```typescript
  // Lead Magnet con PDF automático
  await emailService.sendLeadMagnet({
    name: "Juan Pérez",
    email: "juan@email.com", 
    phone: "+52 55 1234 5678",
    source: "lead_magnet_checklist"
  });
  
  // Resultado: 
  // 1. ✅ Email con PDF al usuario
  // 2. ✅ Lead guardado en data/leads.json
  // 3. ✅ Notificación a vecipremiun@gmail.com
  // 4. ✅ Contador actualizado
  ```

### Notificaciones Internas Automáticas (NUEVO)
- **Email destino**: `vecipremiun@gmail.com`
- **Trigger**: Cada nuevo lead magnet
- **Template**: HTML profesional con datos completos + botones de acción
- **Contenido**:
  - 📋 Información del lead (nombre, email, teléfono, timestamp)
  - ⚡ Botones para contactar por WhatsApp/Email
  - 🔧 Estado del sistema
  - 💡 Recomendaciones de seguimiento
- **Archivo**: `createInternalNotificationTemplate()` en `email-templates.ts`

### SEO y Metadatos (Optimización LATAM)
- **Enfoque geográfico**: Latinoamérica (MX, AR, CO, CL, PE, EC, UY, BO, PY)
- **Schema.org**: Organización con datos de contacto y servicios
- **Metadatos multiidioma**: Alternates para países específicos
- **Open Graph + Twitter Cards**: Completos para redes sociales
- **Robots.txt + Sitemap.xml**: Generación automática con Next.js

### Blog System (MDX + SEO)
- **Contenido**: Archivos MDX en `src/content/blog/`
- **Routing**: Dynamic routing con `/blog/[slug]`
- **SEO optimizado**: Meta tags automáticos, structured data
- **Newsletter**: Integración en BlogSection para captura de leads

---

## 📋 Reglas de Desarrollo Específicas del Proyecto

### Reglas de Calidad OBLIGATORIAS
- **100% TypeScript** - NO JavaScript plano permitido
- **Testing obligatorio** - Nuevas features requieren tests
- **Performance budget** - <200KB bundle inicial
- **Mobile-first** - Diseño responsive mandatorio
- **Accessibility** - ARIA labels y semantic HTML siempre
- **ESLint + TypeScript strict** - Sin warnings permitidos

### Stack Decisions (NO CAMBIAR sin justificación)
- **Next.js App Router** - Elegido por SEO automático y performance
- **Static export** - Requerido para Cloudflare Pages deployment  
- **Tailwind + shadcn/ui** - Por consistencia y velocidad de desarrollo
- **Zustand** - Elegido por simplicidad vs Redux complexity
- **Jest + Testing Library** - Suite de testing establecida y funcionando

### Limitaciones Conocidas (Cloudflare Pages)
- **Static export requerido** - Limita algunas features de Next.js
- **Image optimization deshabilitada** - `unoptimized: true` necesario
- **No SSR/ISR** - Solo static generation disponible
- **API Routes limitadas** - Usar Cloudflare Workers si necesario

### Arquitectura de Decisiones Técnicas
- **App Router sobre Pages Router** - Future-proof y mejor SEO
- **Zustand sobre Redux** - Simplicidad para estado mínimo actual
- **Tailwind sobre CSS-in-JS** - Performance y developer experience
- **MDX sobre CMS externo** - Simplicidad y control total
- **GSAP + Framer Motion** - GSAP para scroll animations, Framer para micro-interactions

---

## 🔧 Comandos y Scripts Principales

### Development Workflow
```bash
# Desarrollo local
npm run dev                    # Next.js dev server en localhost:3000

# Testing completo
npm run test                   # Run todas las 112 pruebas
npm run test:watch            # Modo watch para desarrollo
npm run test:coverage         # Con reporte de cobertura
npm run test:ci               # Para CI/CD (sin watch)

# Build y deployment
npm run build                 # Build estándar Next.js
npm run pages:build           # Build para Cloudflare Pages
npm run preview              # Preview local con Wrangler
npm run deploy               # Deploy directo a Cloudflare

# Linting y calidad
npm run lint                 # ESLint check
```

### Estructura de Trabajo Recomendada
1. **Feature branch** desde main
2. **TDD approach** - Tests primero cuando sea posible
3. **npm run test:watch** durante desarrollo
4. **npm run pages:build** antes de commit
5. **PR review** obligatorio para main
6. **Deploy automático** desde main branch

---

## 🔧 Reglas de Desarrollo CRÍTICAS

### Arquitectura de Decisiones Técnicas
- **Next.js 16 + React 19** - Latest stable con App Router
- **Dual deployment** - Vercel (primary) + Cloudflare Pages (backup)
- **Zustand sobre Redux** - Simplicidad para estado mínimo actual
- **Tailwind CSS 4** - Performance y developer experience óptimo
- **shadcn/ui (New York style)** - Sistema de componentes consistente
- **GSAP + Framer Motion** - GSAP para scroll animations, Framer para micro-interactions

### Reglas de Calidad OBLIGATORIAS
- **100% TypeScript** - NO JavaScript plano permitido
- **Performance budget** - <200KB bundle inicial mandatorio
- **Mobile-first** - Diseño responsive obligatorio desde diseño
- **Accessibility** - ARIA labels y semantic HTML siempre
- **ESLint + TypeScript strict** - Sin warnings permitidos en producción
- **Build verification** - Todas las builds deben completarse sin errores

### Configuración Vercel Actual
- **Framework**: Next.js automáticamente detectado
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (estándar Next.js)
- **Node.js Version**: Automático basado en package.json
- **Headers de seguridad**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Optimización de imágenes**: WebP, AVIF con deviceSizes configurados
- **Rewrites**: Sitemap.xml y robots.txt automáticos
- **Analytics**: Vercel Analytics integrado

### Patrones de Código Establecidos

#### Estructura de Componentes (OBLIGATORIO)
```tsx
// 1. React y Next.js imports primero
import { useState, useEffect } from 'react'
import Link from 'next/link'

// 2. Librerías externas
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

// 3. Componentes internos
import Header from '@/components/layout/Header'

// 4. Store, datos y tipos
import { useModalStore } from '@/store/modalStore'
import type { Service } from '@/data/services'
```

#### Componentes UI con shadcn/ui
```tsx
// Usar forwardRef para componentes UI
const ComponentName = React.forwardRef<HTMLElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Element
        className={cn(baseClasses, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
ComponentName.displayName = "ComponentName"
```

#### Estado Global (Zustand Pattern)
```tsx
// Solo para estado que necesita compartirse entre componentes
interface StoreState {
  value: boolean
  setValue: (value: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  value: false,
  setValue: (value) => set({ value }),
}))
```

### Reglas de Calidad de Código OBLIGATORIAS
- **100% TypeScript** - NO JavaScript plano permitido
- **Mobile-first design** - Responsive obligatorio desde el diseño
- **Accessibility compliance** - ARIA labels y semantic HTML siempre
- **ESLint + TypeScript strict** - Sin warnings permitidos en producción
- **Build verification** - `npm run build:test` debe pasar antes de commits
- **Performance budget** - Lighthouse score >90 en móvil

### Convenciones de Componentes Establecidas
```tsx
// Patrón obligatorio para componentes UI
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <element
        className={cn("base-classes", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Component.displayName = "Component";
```

### Performance Guidelines

#### Optimizaciones Implementadas
- **Bundle splitting** automático con Next.js
- **Tree shaking** para librerías no utilizadas  
- **Font optimization** con next/font/google
- **Static export** para máxima velocidad de carga

#### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 🚨 Workflow de Desarrollo CRÍTICO

### Antes de Cualquier Commit (OBLIGATORIO)
1. **`npm run lint`** - Sin warnings de ESLint permitidos
2. **`npm run build`** - Build debe completarse exitosamente  
3. **`npm run build:test`** - Script de verificación debe pasar
4. **Verificar responsive** - Probar en móvil/tablet/desktop
5. **Performance check** - Verificar que no hay regresiones

### Proceso de Desarrollo Recomendado
```bash
# 1. Crear feature branch
git checkout -b feature/nueva-funcionalidad

# 2. Desarrollo con hot reload
npm run dev

# 3. Verificación continua durante desarrollo
npm run lint              # Verificar linting
npm run build:test        # Test de build

# 4. Antes de commit
npm run build            # Build completo
git add . && git commit -m "feat: descripción"

# 5. Push y PR
git push origin feature/nueva-funcionalidad
```

### Debugging Checklist Rápido
- ¿Imports correctos con aliases `@/`?
- ¿Tipos TypeScript apropiados?
- ¿Patrón shadcn/ui correcto?
- ¿Usando `cn()` para merge de clases?
- ¿Build pasa sin errores?

## 📊 Métricas de Calidad Objetivo

### Performance Targets
- **Lighthouse Score**: >90 mobile, >95 desktop
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Bundle Size**: Initial load <200KB
- **Image Optimization**: WebP/AVIF automático

### SEO y Accessibility
- **Meta tags completos**: Open Graph, Twitter Cards  
- **Schema.org**: Organization markup implementado
- **ARIA labels**: En todos los elementos interactivos
- **Semantic HTML**: Estructura correcta siempre

## 🔗 Enlaces y Recursos

### Documentación Oficial
- [Next.js 16 Docs](https://nextjs.org/docs) - Framework principal
- [Tailwind CSS 4](https://tailwindcss.com/docs) - Styling system
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vercel Platform](https://vercel.com/docs) - Deployment platform

### Herramientas de Desarrollo
- [TypeScript 5](https://www.typescriptlang.org/docs/) - Type safety
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [GSAP](https://gsap.com/docs/) - Advanced animations

---

*Última actualización: Enero 2025 - Generado automáticamente para agentes de desarrollo*

**⚡ NOTA IMPORTANTE:** Este archivo contiene las reglas esenciales para mantener la calidad y consistencia del proyecto CodigoFacil.com. Seguir estas guidelines es OBLIGATORIO para todos los desarrolladores que trabajen en este proyecto.