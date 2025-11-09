# CLAUDE.md - Contexto del Proyecto

## Información General del Proyecto

### Nombre del Proyecto
**CodigoFacil.com** - Sitio Web Corporativo

### Descripción
Sitio web profesional para una empresa de desarrollo y soluciones digitales ubicada en Costa Rica. El proyecto está construido con Next.js 15 y incluye múltiples secciones para mostrar servicios, proyectos, precios y contacto.

### Tecnologías Principales
- **Framework**: Next.js 15.5.4 con App Router
- **Runtime**: React 19.1.0
- **Styling**: Tailwind CSS v4 + PostCSS
- **Animaciones**: GSAP 3.13.0 + Framer Motion 12.23.22
- **UI Components**: Radix UI + shadcn/ui
- **Theming**: next-themes (light/dark mode)
- **Analytics**: Vercel Analytics
- **TypeScript**: v5 con configuración estricta

## Estructura del Proyecto

```
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── layout.tsx       # Layout principal con metadata
│   │   ├── page.tsx         # Página principal
│   │   └── globals.css      # Estilos globales
│   ├── components/
│   │   ├── layout/          # Componentes de layout
│   │   │   ├── Header.tsx   # Header con navegación
│   │   │   └── Footer.tsx   # Footer con información de contacto
│   │   ├── sections/        # Secciones de la página
│   │   │   ├── HeroSection.tsx     # Sección principal
│   │   │   ├── ServicesSection.tsx # Servicios
│   │   │   ├── PricingSection.tsx  # Precios
│   │   │   ├── ProjectsSection.tsx # Proyectos
│   │   │   ├── BlogSection.tsx     # Blog
│   │   │   └── ContactSection.tsx  # Contacto
│   │   ├── ui/              # Componentes UI reutilizables
│   │   └── modals/          # Componentes de modales
│   └── lib/
│       └── utils.ts         # Utilidades (cn, clsx, etc.)
```

## Características Principales

### 1. Diseño Responsive
- Totalmente optimizado para móvil, tablet y desktop
- Grid systems adaptativos con Tailwind CSS

### 2. Animaciones Avanzadas
- **GSAP ScrollTrigger**: Animaciones basadas en scroll
- **Framer Motion**: Animaciones de componentes
- Transiciones suaves entre secciones

### 3. Tema Dinámico
- Soporte para modo claro/oscuro
- Persistencia de preferencias del usuario
- Transiciones suaves entre temas

### 4. SEO Optimizado
- Metadata completa en layout.tsx
- Estructura semántica HTML
- Open Graph y Twitter Cards

### 5. Performance
- Next.js con Turbopack para desarrollo rápido
- Optimización automática de imágenes
- Code splitting automático

## Información de la Empresa

### Datos de Contacto
- **Ubicación**: Guápiles, Limón, Costa Rica
- **Teléfono**: +506 8888-8888
- **Email**: info@codigofacil.com
- **Dominio**: codigofacil.com

### Servicios Principales
1. Diseño Web
2. Desarrollo Web
3. Comercio Electrónico
4. SEO
5. Marketing Digital

## Configuración de Desarrollo

### Scripts Disponibles
```bash
npm run dev     # Desarrollo con Turbopack
npm run build   # Build de producción con Turbopack
npm run start   # Servidor de producción
npm run lint    # Linting con ESLint
```

### Dependencias Clave
- **UI**: @radix-ui/react-*, lucide-react
- **Styling**: tailwindcss, tailwind-merge, clsx
- **Animation**: gsap, framer-motion
- **Development**: @shadcn/ui, eslint-config-next

## Notas de Implementación

### Animaciones GSAP
- ScrollTrigger configurado para animaciones de entrada
- Fade out del Hero al hacer scroll
- Animación de entrada para ServiceSection
- Limpieza automática de triggers en unmount

### Componentes UI
- Sistema de componentes basado en shadcn/ui
- Variantes de botones con class-variance-authority
- Dropdowns, inputs y labels con Radix UI

### Estructura de Navegación
- Header fijo con navegación responsive
- Footer con enlaces rápidos y información de contacto
- Navegación por anclas (#inicio, #servicios, etc.)

## Estado Actual
El proyecto está configurado como sitio corporativo completo con todas las secciones principales implementadas. Listo para personalización de contenido y deploy.