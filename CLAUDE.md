# CLAUDE.md - Mi Contexto de Desarrollo

## 👤 Mi Identidad
Soy **Rovo Dev**, el asistente de desarrollo para **CodigoFacil.com**. Mi misión es mantener y mejorar este sitio web siguiendo estrictos estándares de calidad.

## 🏢 Información de la Empresa
- **Nombre**: CodigoFacil.com
- **Ubicación**: Guápiles, Limón, Costa Rica
- **Email**: info@codigofacil.com
- **Teléfono**: +506 8646-2423
- **Servicios**: Desarrollo web, diseño web, e-commerce, SEO, marketing digital

## 🎯 Estado Actual del Proyecto
**✅ SITIO EN PRODUCCIÓN**
- **URL Activa**: `https://codigofacil-site.pages.dev`
- **Status**: 100% Funcional
- **Plataforma**: Cloudflare Pages
- **Performance**: Optimizado globalmente

## 🛠️ Stack Tecnológico

### Frontend Framework
- **Next.js 14**: Framework React con App Router
- **React 18**: Biblioteca de UI
- **TypeScript**: Lenguaje tipado

### UI/UX
- **Tailwind CSS 4**: Framework de CSS utility-first
- **Shadcn/UI**: Biblioteca de componentes con Radix UI
- **Framer Motion**: Librería de animaciones
- **GSAP**: Animaciones avanzadas con ScrollTrigger
- **Lucide React**: Iconos
- **Next Themes**: Soporte para modo oscuro/claro

### Deployment
- **Cloudflare Pages**: Plataforma de hosting
- **Wrangler**: CLI de Cloudflare
- **@cloudflare/next-on-pages**: Adaptador Next.js para Cloudflare

### Herramientas de Desarrollo
- **ESLint**: Linting de código
- **PostCSS**: Procesamiento de CSS
- **Vercel Analytics**: Análisis de tráfico

## 📁 Estructura del Proyecto

```
codigofacil-site/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página de inicio
│   │   ├── globals.css        # Estilos globales
│   │   └── favicon.ico        # Favicon
│   ├── components/
│   │   ├── layout/            # Componentes de layout
│   │   │   ├── Header.tsx     # Navegación principal
│   │   │   └── Footer.tsx     # Pie de página
│   │   ├── sections/          # Secciones de la página
│   │   │   ├── HeroSection.tsx      # Sección hero
│   │   │   ├── ServicesSection.tsx  # Servicios
│   │   │   ├── PricingSection.tsx   # Precios/Planes
│   │   │   ├── ProjectsSection.tsx  # Portfolio
│   │   │   ├── BlogSection.tsx      # Blog/Artículos
│   │   │   └── ContactSection.tsx   # Formulario contacto
│   │   ├── ui/                # Componentes UI reutilizables
│   │   │   ├── button.tsx     # Componente botón
│   │   │   ├── input.tsx      # Componente input
│   │   │   ├── textarea.tsx   # Componente textarea
│   │   │   ├── label.tsx      # Componente label
│   │   │   ├── dropdown-menu.tsx # Menú desplegable
│   │   │   └── mode-toggle.tsx    # Toggle tema oscuro/claro
│   │   └── theme-provider.tsx # Proveedor de temas
│   └── lib/
│       └── utils.ts           # Utilidades (cn function)
├── functions/
│   └── _middleware.ts         # Middleware para Cloudflare Pages
├── public/                    # Archivos estáticos
│   ├── file.svg, globe.svg, etc. # Iconos SVG
└── config files...
```

## 🎨 Características de Diseño

### Sistema de Colores
- **Primario**: Azules (sistema de colores extendido con 50-900)
- **Modo Oscuro**: Soporte completo con variables CSS
- **Variables CSS**: Sistema de tokens de diseño con oklch

### Tipografía
- **Inter**: Fuente principal (Google Fonts)
- **JetBrains Mono**: Fuente monoespaciada
- Variables CSS personalizadas

### Animaciones
- **GSAP ScrollTrigger**: Animaciones basadas en scroll
- **Framer Motion**: Micro-animaciones
- **Tailwind Animate**: Animaciones CSS

## 📄 Secciones de la Página

### 1. Hero Section (`HeroSection.tsx`)
- Presentación principal de la empresa
- Call-to-action prominente
- Animaciones de entrada

### 2. Services Section (`ServicesSection.tsx`)
- Catálogo de servicios ofrecidos
- Iconos descriptivos
- Animaciones al hacer scroll

### 3. Pricing Section (`PricingSection.tsx`)
- Planes y precios de servicios
- Comparación de características
- Botones de acción

### 4. Projects Section (`ProjectsSection.tsx`)
- Portfolio de trabajos realizados
- Casos de estudio
- Enlaces a proyectos

### 5. Blog Section (`BlogSection.tsx`)
- Artículos y recursos
- Contenido educativo
- Enlaces a blog completo

### 6. Contact Section (`ContactSection.tsx`)
- Formulario de contacto
- Información de contacto
- Integración con redes sociales

### Navigation (`Header.tsx`)
- Menú de navegación responsive
- Toggle de tema oscuro/claro
- Enlaces de navegación interna

### Footer (`Footer.tsx`)
- Enlaces rápidos
- Información de contacto
- Redes sociales
- Copyright

## ⚙️ Configuración del Proyecto

### Next.js Config (`next.config.js`)
```javascript
{
  output: 'export',           // Exportación estática
  trailingSlash: true,       // URLs con slash final
  images: { unoptimized: true }, // Imágenes no optimizadas para static export
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
}
```

### Cloudflare Config (`wrangler.toml`)
- Configurado para Cloudflare Pages
- Flags de compatibilidad: `nodejs_compat`
- Output directory: `out`

### Tailwind Config
- Modo oscuro con clase
- Tema extendido con colores personalizados
- Animaciones personalizadas
- Plugin de animación

## 📦 Scripts Disponibles

```json
{
  "dev": "next dev",                    // Desarrollo local
  "build": "next build",               // Build estándar
  "start": "next start",               // Servidor de producción
  "lint": "eslint",                    // Linting
  "pages:build": "npx @cloudflare/next-on-pages", // Build para Cloudflare
  "preview": "npm run pages:build && wrangler pages dev", // Preview local
  "deploy": "npm run pages:build && wrangler pages deploy" // Deploy directo
}
```

## 🔧 Dependencias Principales

### Producción
- `next`: ^14.0.0 - Framework principal
- `react`: ^18.2.0 - UI library
- `@radix-ui/*`: Componentes UI primitivos
- `framer-motion`: ^12.23.22 - Animaciones
- `gsap`: ^3.13.0 - Animaciones avanzadas
- `next-themes`: ^0.4.6 - Gestión de temas
- `tailwind-merge`: ^3.3.1 - Merge de clases Tailwind
- `class-variance-authority`: ^0.7.1 - Variantes de componentes

### Desarrollo
- `@cloudflare/next-on-pages`: ^1.11.0 - Adaptador Cloudflare
- `wrangler`: ^3 - CLI Cloudflare
- `tailwindcss`: ^4 - CSS framework
- `typescript`: ^5 - Tipado estático

## 🚀 Deployment en Cloudflare Pages

### Configuración Actual (Verificada)
- **Build command**: `npm run pages:build` 
- **Output directory**: `.vercel/output/static`
- **Node version**: 20 (especificado en `.nvmrc`)
- **Compatibility flags**: `nodejs_compat` (configurado en `wrangler.toml`)

### Métodos de Deployment

#### Método 1: Dashboard de Cloudflare (Actual)
1. **Preparación:**
   ```bash
   npm install
   npm run pages:build
   ```

2. **Configuración en Dashboard:**
   - Comando de build: `npm run pages:build`
   - Directorio de salida: `.vercel/output/static`
   - Variables: NODE_VERSION = `20`

#### Método 2: Wrangler CLI (Alternativo)
```bash
npm install
npx wrangler login
npm run deploy
```

### Pruebas Locales
```bash
npm run preview  # Test con entorno Cloudflare local
```

## 🎯 Funcionalidades Clave

### Responsive Design
- Diseño completamente responsivo
- Mobile-first approach
- Breakpoints de Tailwind

### Performance
- Exportación estática para máximo rendimiento
- Imágenes optimizadas
- Lazy loading de componentes

### SEO
- Metadatos configurados en layout
- Estructura semántica HTML
- URLs amigables

### Accesibilidad
- Componentes Radix UI (accesibles por defecto)
- Contraste de colores apropiado
- Navegación por teclado

## ✅ Estado del Deployment

### 🚀 **DEPLOYMENT EXITOSO EN CLOUDFLARE PAGES**
- **Status**: ✅ **FUNCIONANDO CORRECTAMENTE**
- **URL**: `https://codigofacil-site.pages.dev` (auto-generada)
- **Build time**: ~2-3 minutos
- **Assets**: 42 archivos estáticos desplegados
- **Performance**: Optimizado para velocidad global

### 🛠️ **Problemas Resueltos Durante Deployment**:

1. **✅ Conflictos de Dependencias**:
   - Next.js versión corregida: `14.2.13`
   - ESLint downgrade: `8.57.1` (compatible con eslint-config-next)
   - Package-lock sincronizado correctamente

2. **✅ Configuración de Cloudflare**:
   - `wrangler.toml`: Configurado con `pages_build_output_dir`
   - `.npmrc`: `legacy-peer-deps=true` para resolver conflictos
   - `.nvmrc`: Node.js 20 especificado

3. **✅ Middleware Issues**:
   - Middleware de Cloudflare removido (innecesario para sitio estático)
   - Dependencia `server-only` eliminada
   - Sin conflictos server/client components

4. **✅ Build Process**:
   - Script `npm run build:test` para verificación local
   - Static export funcionando perfectamente
   - Assets optimizados: 95.3 kB + 87.3 kB shared

### 📊 **Métricas de Build Exitoso**:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    95.3 kB         192 kB
└ ○ /_not-found                          871 B          88.2 kB
+ First Load JS shared by all            87.3 kB

✅ 42 static assets generated
✅ Build time: ~24 segundos
✅ Deploy time: ~2-3 minutos
```

## 🔧 Configuración Final Verificada

### Build Configuration
```javascript
// next.config.js - Optimizado para Cloudflare
{
  output: 'export',           // Static export exitoso
  trailingSlash: true,       // URLs correctas
  images: { unoptimized: true }, // Compatible con static
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
}
```

### Scripts de Desarrollo
```json
{
  "build:test": "node build-test.js",    // ✅ Verificación local
  "pages:build": "next build && npx @cloudflare/next-on-pages", // ✅ Build CF
  "preview": "npx serve out",             // ✅ Test local
}
```

## 📝 Próximos Pasos Recomendados

### 🎯 **Inmediatos**:
1. **Custom Domain**: Configurar dominio personalizado (`codigofacil.com`)
2. **Analytics**: Implementar Google Analytics + Cloudflare Analytics
3. **Performance**: Optimizar Core Web Vitals
4. **SEO**: Metadatos, sitemap, robots.txt

### 🚀 **Desarrollo**:
1. **Contenido Real**: Actualizar servicios y proyectos de CodigoFacil.com
2. **Formularios**: Backend para contacto (Cloudflare Workers/Forms)
3. **Blog**: Integrar CMS (Contentful, Strapi, o markdown)
4. **Interactividad**: Animaciones GSAP, micro-interactions

### 🔧 **Funcionalidades Avanzadas**:
1. **E-commerce**: Integración para servicios
2. **CRM**: Automatización de leads
3. **Multi-idioma**: i18n para español/inglés
4. **PWA**: Progressive Web App features

## 🌟 **Estado Actual: PRODUCCIÓN**

✅ **Deployment**: Funcionando perfectamente en Cloudflare Pages  
✅ **Performance**: Optimizado para velocidad global  
✅ **Responsive**: Mobile-first design implementado  
✅ **Accessibility**: Componentes accesibles con Radix UI  
✅ **SEO Ready**: Estructura semántica lista  
✅ **Maintenance**: Build automatizado con GitHub integration  

Este proyecto está **completamente funcional en producción** como landing page profesional para CodigoFacil.com, con excelente performance y UX moderna.

## 🛡️ MI PROTOCOLO DE CALIDAD OBLIGATORIO

### **⚡ COMANDOS QUE DEBO EJECUTAR SIEMPRE:**

```bash
npx tsc --noEmit    # 1. TypeScript sin errores
npm run lint        # 2. ESLint limpio
npm test           # 3. Tests pasando 
npm run build      # 4. Build exitoso
```

### **✅ MI CHECKLIST ANTES DE CUALQUIER CAMBIO:**
- [ ] TypeScript: 0 errores de tipos
- [ ] ESLint: 0 warnings/errors  
- [ ] Jest: Todos los tests pasan
- [ ] Build: Compilación exitosa
- [ ] Client components: Marcados con "use client"
- [ ] Server components: Sin event handlers

### **🚨 REGLAS QUE NO PUEDO ROMPER:**
1. ❌ **NO commit** con errores TypeScript
2. ❌ **NO push** con tests fallando  
3. ✅ **SIEMPRE** verificar build antes deploy
4. ✅ **MANTENER** cobertura tests > 80%
5. ✅ **DOCUMENTAR** cambios arquitectura
6. 🧪 **TODA funcionalidad DEBE tener test Jest**

## 🧪 PROTOCOLO OBLIGATORIO DE TESTING JEST

### **🎯 REGLA DE ORO:**
**NINGUNA funcionalidad nueva o modificada puede existir sin su test Jest correspondiente.**

### **📝 PROTOCOLO DE CREACIÓN DE TESTS:**

#### **1. ANTES de escribir código:**
```bash
# Crear el archivo de test PRIMERO
touch src/__tests__/components/[ComponentName].test.tsx
```

#### **2. ESTRUCTURA OBLIGATORIA de tests:**
```typescript
// Ejemplo: src/__tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  // Test 1: Renderizado básico
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  // Test 2: Props y variants
  it('should apply correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })

  // Test 3: Eventos
  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // Test 4: Estados (disabled, loading, etc.)
  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

#### **3. TIPOS DE TESTS OBLIGATORIOS:**

**Para COMPONENTES UI:**
- [ ] ✅ Renderizado básico
- [ ] ✅ Props y variantes
- [ ] ✅ Eventos (click, hover, etc.)
- [ ] ✅ Estados (disabled, loading, error)
- [ ] ✅ Accesibilidad (aria-labels, roles)

**Para FUNCIONES/UTILS:**
- [ ] ✅ Casos positivos
- [ ] ✅ Casos negativos/errores
- [ ] ✅ Edge cases
- [ ] ✅ Valores boundary

**Para PÁGINAS/SECCIONES:**
- [ ] ✅ Renderizado completo
- [ ] ✅ Navigation/routing
- [ ] ✅ Data fetching (mock)
- [ ] ✅ User interactions

#### **4. COMANDO DE VERIFICACIÓN:**
```bash
# Ejecutar tests específicos
npm test -- --testPathPattern="ComponentName"

# Verificar cobertura
npm run test:coverage

# Watch mode durante desarrollo
npm run test:watch
```

### **📊 MÉTRICAS OBLIGATORIAS:**
- **Cobertura mínima**: 80% líneas, 80% funciones
- **Tests por componente**: Mínimo 4 tests
- **Time limit**: Tests deben ejecutar < 5 segundos

### **🔄 WORKFLOW TESTING:**
1. **Crear test** → Escribir código → **Pasar tests** → Commit
2. **Modificar funcionalidad** → **Actualizar tests** → Verificar pasan → Commit
3. **Refactor** → **Verificar tests siguen pasando** → Commit

### **📁 ESTRUCTURA DE ARCHIVOS TEST:**
```
src/__tests__/
├── components/
│   ├── ui/
│   │   ├── Button.test.tsx
│   │   ├── Input.test.tsx
│   │   └── ...
│   ├── sections/
│   │   ├── HeroSection.test.tsx
│   │   └── ...
│   └── layout/
│       ├── Header.test.tsx
│       └── Footer.test.tsx
├── pages/
│   ├── Home.test.tsx
│   └── ...
├── utils/
│   ├── cn.test.ts
│   └── ...
└── simple-examples/
    └── tdd-examples/
```