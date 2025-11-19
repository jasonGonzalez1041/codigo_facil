// Datos temporales de blog mientras configuramos MDX
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  readTime: string;
  category: string;
  publishedAt: string;
  lastUpdated: string;
  date: string;
  image: string;
  evergreen: boolean;
  featured?: boolean;
  color: string;
  fileName?: string;
}

// Mapear archivos MDX reales a datos del blog
export const realBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Mejores Prácticas Evergreen para E-commerce Responsive",
    slug: "mejores-practicas-ecommerce-evergreen",
    fileName: "mejores-practicas-ecommerce-evergreen.mdx",
    excerpt: "Estrategias atemporales para crear tiendas online exitosas. UX optimizado, mejores prácticas de conversión y principios fundamentales que nunca caducan.",
    readTime: "12 min",
    category: "E-commerce",
    publishedAt: "2025-01-08",
    lastUpdated: "2025-01-08",
    date: "2025-01-08",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    evergreen: true,
    featured: true,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 2,
    title: "Guía Completa: Pagos Online para E-commerce en LATAM 2025",
    slug: "latam-guia-pagos-online-2025",
    fileName: "latam-guia-pagos-online-2025.mdx",
    excerpt: "Todo lo que necesitas saber sobre pagos digitales en Latinoamérica. Pasarelas, métodos locales, regulaciones y mejores prácticas por país.",
    readTime: "15 min",
    category: "E-commerce",
    publishedAt: "2025-01-15",
    lastUpdated: "2025-01-15", 
    date: "2025-01-15",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    evergreen: true,
    color: "from-blue-500 to-purple-500"
  },
  {
    id: 3,
    title: "E-commerce en Argentina 2025: Checklist Completo para Vender Online",
    slug: "ar-ecommerce-argentina-2025-checklist", 
    fileName: "ar-ecommerce-argentina-2025-checklist.mdx",
    excerpt: "Guía completa para lanzar tu tienda online en Argentina. Desde aspectos legales hasta estrategias de marketing digital específicas del mercado argentino.",
    readTime: "18 min",
    category: "E-commerce LATAM",
    publishedAt: "2025-01-20",
    lastUpdated: "2025-01-20",
    date: "2025-01-20", 
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    evergreen: true,
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 4,
    title: "Cómo Hacer una Página Web que Venda en México 2025",
    slug: "mx-como-hacer-pagina-web-venda-mexico",
    fileName: "mx-como-hacer-pagina-web-venda-mexico.mdx", 
    excerpt: "Estrategias específicas para el mercado mexicano. Desde el diseño hasta la conversión, todo lo que necesitas para vender online en México.",
    readTime: "14 min",
    category: "Marketing Digital",
    publishedAt: "2025-01-25",
    lastUpdated: "2025-01-25",
    date: "2025-01-25",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80", 
    evergreen: true,
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "Guía Definitiva: Desarrollo Web con Next.js para Principiantes",
    slug: "guia-desarrollo-web-nextjs-principiantes",
    fileName: "guia-desarrollo-web-nextjs-principiantes.mdx",
    excerpt: "Domina Next.js desde cero con esta guía evergreen. Pasos atemporales, mejores prácticas y checklist descargable para crear apps web profesionales.",
    readTime: "15 min",
    category: "Desarrollo Web", 
    publishedAt: "2025-01-01",
    lastUpdated: "2025-01-01",
    date: "2025-01-01",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    evergreen: true,
    featured: false,
    color: "from-blue-500 to-cyan-500"
  }
];

// Función para obtener un post por slug
export function getPostBySlug(slug: string): BlogPost | null {
  return realBlogPosts.find(post => post.slug === slug) || null;
}

// Función para obtener todos los posts
export function getAllPosts(): BlogPost[] {
  return realBlogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}