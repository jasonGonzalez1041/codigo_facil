# AGENTS.md - Guía de Desarrollo para CodigoFacil.com

## 🎯 Información del Proyecto

### Propósito
- **Sitio web corporativo** para CodigoFacil.com - empresa de desarrollo web para LATAM
- **Landing page profesional** con servicios, blog, calculadora de costos y formularios de contacto
- **Enfoque en conversión** y experiencia de usuario optimizada para mercado latinoamericano

### Stack Tecnológico Principal
- **Framework**: Next.js 14.2.13 (App Router) con static export
- **Lenguaje**: TypeScript 5+ con configuración strict mode
- **Styling**: Tailwind CSS 4 + shadcn/ui components (New York style)
- **Estado**: Zustand 5.0.8 para gestión de estado ligera
- **Animaciones**: Framer Motion 12.23.22 + GSAP 3.13.0 con ScrollTrigger
- **Deployment**: Cloudflare Pages con @cloudflare/next-on-pages
- **Testing**: Jest 30.2.0 + Testing Library (112 pruebas al 100%)

### Dependencias Clave de UI/UX
- **UI Primitives**: Radix UI (dropdown-menu, label, slot)
- **Icons**: Lucide React 0.544.0
- **Styling**: class-variance-authority, clsx, tailwind-merge
- **Animations**: tailwindcss-animate
- **Themes**: next-themes 0.4.6 para modo claro/oscuro/sistema
- **Fonts**: Inter + JetBrains Mono via next/font/google
- **Analytics**: Vercel Analytics 1.5.0

## 🚀 Comandos de Desarrollo Rápido

### Scripts de Proyecto
```bash
# Desarrollo
npm run dev                    # Next.js dev server (localhost:3000)

# Testing
npm run test                   # Ejecutar 112 pruebas Jest
npm run test:watch            # Modo watch para desarrollo
npm run test:coverage         # Con reporte de cobertura
npm run test:ci               # Para CI/CD (sin watch)

# Build y Deploy
npm run build                 # Build estándar Next.js
npm run pages:build           # Build para Cloudflare Pages
npm run preview              # Preview local con Wrangler
npm run deploy               # Deploy directo a Cloudflare

# Calidad de Código
npm run lint                 # ESLint check
```

## 📂 Estructura de Archivos

### Directorios Principales
```
src/
├── app/                    # Next.js App Router (rutas y layouts)
│   ├── blog/              # Páginas del blog (/blog, /blog/[slug])
│   ├── globals.css        # Estilos globales y CSS custom properties
│   ├── layout.tsx         # RootLayout con metadatos SEO + Schema.org
│   ├── page.tsx           # Homepage principal
│   ├── robots.ts          # SEO robots.txt automático
│   └── sitemap.ts         # XML sitemap automático
├── components/            # Componentes React reutilizables
│   ├── layout/           # Header, Footer navegación
│   ├── sections/         # HeroSection, ServicesSection, BlogSection, etc.
│   ├── ui/              # shadcn/ui components + calculadora de costos
│   └── theme-provider.tsx # Provider de temas claro/oscuro
├── content/              # Contenido estático MDX
│   └── blog/            # Posts de blog en formato MDX
├── data/                # Configuración y datos estáticos
│   └── services.ts      # 6 servicios con precios, descripciones, procesos
├── lib/                 # Utilidades y helpers
│   └── utils.ts         # cn() function para merge de clases CSS
├── store/               # Estado global con Zustand
│   └── modalStore.ts    # Estado de modales (simple boolean store)
├── types/               # Definiciones TypeScript
│   └── jest.d.ts        # Tipos para testing
├── __mocks__/           # Mocks para testing
│   └── gsap.js         # Mock de GSAP para Jest
└── __tests__/           # Suite completa de 112 pruebas Jest
    ├── components/      # Tests de componentes UI
    ├── data/           # Tests de datos y servicios
    ├── integration/    # Tests de integración full-site
    ├── pages/          # Tests de páginas completas
    ├── store/          # Tests de Zustand store
    └── utils/          # Tests de utilidades
```

### Archivos de Configuración Críticos
- `next.config.js` - Static export, images unoptimized, Cloudflare Pages
- `tailwind.config.js` - Design system completo con colores brand y dark mode
- `tsconfig.json` - TypeScript strict con paths aliases (@/*)
- `jest.config.cjs` - Setup completo con mocks de GSAP/Framer Motion
- `eslint.config.mjs` - Linting Next.js + TypeScript con ignores
- `wrangler.toml` - Cloudflare Pages deployment config
- `components.json` - shadcn/ui config (New York style, Lucide icons)

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

## 🧪 Testing Strategy (112 Pruebas al 100%)

### Configuración Jest Completa
- **112 pruebas** ejecutándose al 100% de éxito
- **Jest 30.2.0** con `jest-environment-jsdom`
- **Setup completo** en `jest.setup.js` con todos los mocks necesarios
- **Coverage threshold**: 70% mínimo configurado en branches/functions/lines/statements
- **Module aliases** (@/* paths) completamente configurados
- **Transform ignore patterns** para GSAP y librerías externas

### Mocks Implementados (Críticos para Funcionamiento)
```javascript
// GSAP y animaciones (archivo: src/__mocks__/gsap.js)
jest.mock('gsap')
jest.mock('gsap/ScrollTrigger')

// Next.js features críticos
jest.mock('next/font/google')
jest.mock('next/link')
jest.mock('next/image')

// Framer Motion (animaciones)
jest.mock('framer-motion')

// Theme provider y externos
jest.mock('next-themes')
jest.mock('@vercel/analytics/next')

// Browser APIs
global.IntersectionObserver = MockClass
global.matchMedia = jest.fn()
```

### Estructura de Tests por Categoría
```
__tests__/ (112 pruebas organizadas)
├── components/ui/          # 32 pruebas
│   ├── Button.test.tsx     # 5 pruebas - variantes, eventos
│   ├── cost-calculator.test.tsx # 18 pruebas - lógica cálculos
│   └── mode-toggle.test.tsx # 8 pruebas - tema toggle
├── components/sections/    # 26 pruebas  
│   ├── ServicesSection.test.tsx # 11 pruebas - modales
│   └── BlogSection.test.tsx # 15 pruebas - newsletter
├── data/                   # 13 pruebas
│   └── services.test.ts    # Validación de 6 servicios
├── store/                  # 4 pruebas
│   └── modalStore.test.ts  # Estado Zustand
├── pages/                  # 20 pruebas
│   ├── HomePage.test.tsx   # 7 pruebas - estructura
│   └── BlogPage.test.tsx   # 13 pruebas - SEO, contenido
├── integration/            # 10 pruebas
│   └── full-site.test.tsx  # Tests de integración
└── utils/                  # 7 pruebas
    └── cn.test.ts          # Utility de clases CSS
```

### Testing Best Practices (OBLIGATORIAS)
- **@testing-library/react** para interacciones realistas de usuario
- **@testing-library/jest-dom** para assertions específicas de DOM
- **@testing-library/user-event** para eventos de usuario complejos
- **Mock functions** para todas las dependencias externas
- **Describir comportamiento**, no implementación
- **Tests independientes** - sin orden de ejecución
- **Cleanup automático** después de cada test

## 🚀 Deployment y CI/CD

### Cloudflare Pages Setup
- **Build command**: `npm run pages:build`
- **Output directory**: `out/` (static export)
- **Environment**: Node.js con variables de entorno
- **Domain**: codigofacil.com con SSL automático

### Scripts Disponibles
```json
{
  "dev": "next dev",                    // Desarrollo local
  "build": "next build",                // Build estándar
  "pages:build": "next build && npx @cloudflare/next-on-pages", // Cloudflare
  "test": "jest",                       // Pruebas
  "test:coverage": "jest --coverage",   // Cobertura
  "test:watch": "jest --watch",         // Modo watch
  "lint": "eslint"                      // Linting
}
```

### Workflow Recomendado
1. **Desarrollo** con `npm run dev`
2. **Testing** con `npm run test:watch` 
3. **Build local** con `npm run pages:build`
4. **Deploy** automático via Git push

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

### Desarrollo Pendiente (ver TODO.md)
- **Dominio personalizado** y configuración DNS
- **Google Analytics** y tracking completo
- **Formularios backend** con Cloudflare Workers
- **PWA features** para experiencia mobile

### Testing Expansion
- **E2E tests** con Playwright
- **Visual regression** tests
- **Performance testing** automatizado
- **Accessibility testing** con axe-core

### Performance Improvements
- **Image optimization** custom implementation
- **Bundle analysis** y optimización
- **Core Web Vitals** monitoring
- **CDN optimization** avanzada

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
// Datos en src/data/services.ts
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
```

### Calculadora de Costos (Funcionalidad Crítica)
- **18 pruebas automatizadas** validando cálculos matemáticos
- **Componente**: `src/components/ui/cost-calculator.tsx`
- **Funcionalidades**:
  - Sliders para complejidad, páginas, funcionalidades
  - Selects para diseño, integraciones, soporte
  - Cálculo dinámico de precio y tiempo
  - Integración con WhatsApp para cotización
  - Animaciones de precio con Framer Motion

### Integración WhatsApp (Conversión)
```typescript
// Ejemplo de integración
const whatsappMessage = `Hola! Quiero una cotización para:
- Tipo: ${selectedService}
- Presupuesto estimado: $${calculatedPrice} USD
- Tiempo estimado: ${estimatedTime}
- Características adicionales: ${features}`;

const whatsappUrl = `https://wa.me/56950225491?text=${encodeURIComponent(whatsappMessage)}`;
```

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
- **App Router sobre Pages Router** - Future-proof y mejor SEO automático
- **Zustand sobre Redux** - Simplicidad para estado mínimo actual
- **Tailwind sobre CSS-in-JS** - Performance y developer experience óptimo
- **Static export requerido** - Limitado por Cloudflare Pages deployment
- **GSAP + Framer Motion** - GSAP para scroll animations, Framer para micro-interactions

### Reglas de Calidad OBLIGATORIAS
- **100% TypeScript** - NO JavaScript plano permitido
- **Testing obligatorio** - Nuevas features requieren tests correspondientes
- **Performance budget** - <200KB bundle inicial mandatorio
- **Mobile-first** - Diseño responsive obligatorio desde diseño
- **Accessibility** - ARIA labels y semantic HTML siempre
- **ESLint + TypeScript strict** - Sin warnings permitidos en producción

### Limitaciones Conocidas (Cloudflare Pages)
- **Static export requerido** - Limita algunas features avanzadas de Next.js
- **Image optimization deshabilitada** - `unoptimized: true` necesario
- **No SSR/ISR** - Solo static generation disponible
- **API Routes limitadas** - Usar Cloudflare Workers si necesario

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

### Testing Requirements (112 Pruebas al 100%)

#### Obligatorio para Nuevos Componentes
```tsx
// Estructura básica de test
describe('ComponentName', () => {
  it('should render without crashing', () => {
    render(<ComponentName />)
    expect(screen.getByRole('...')).toBeInTheDocument()
  })
  
  it('should handle user interactions', async () => {
    const user = userEvent.setup()
    render(<ComponentName />)
    await user.click(screen.getByRole('button'))
    // Assertions...
  })
})
```

#### Mocks Configurados (NO tocar sin entender)
- **GSAP/ScrollTrigger** - Mock en `__mocks__/gsap.js`
- **Next.js features** - Configurado en `jest.setup.js`
- **Framer Motion** - Mock automático
- **IntersectionObserver** - Mock global disponible

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

## 🚨 REGLAS DE EMERGENCIA

### Antes de Cualquier Commit
1. **`npm run test`** - Todas las 112 pruebas deben pasar
2. **`npm run lint`** - Sin warnings de ESLint
3. **`npm run pages:build`** - Build debe completarse sin errores
4. **Verificar responsive** - Probar en móvil/tablet/desktop

### Si Algo se Rompe
1. **Revertir último commit** si es necesario
2. **Verificar mocks** en jest.setup.js si son problemas de testing
3. **Verificar configuración** de Cloudflare Pages si es deploy
4. **NO hacer push** hasta que todo esté funcionando

### Debugging Checklist
- ¿Están todos los imports correctos con aliases `@/`?
- ¿Se están usando los tipos TypeScript apropiados?
- ¿El componente está siguiendo el patrón shadcn/ui?
- ¿Se está usando `cn()` para merge de clases CSS?
- ¿Las pruebas cubren los casos principales?

---

*Última actualización: Diciembre 2024 - Generado automáticamente para agentes de desarrollo*

**⚡ NOTA IMPORTANTE:** Este archivo contiene las reglas esenciales para mantener la calidad y consistencia del proyecto CodigoFacil.com. Seguir estas guidelines es OBLIGATORIO para todos los desarrolladores.