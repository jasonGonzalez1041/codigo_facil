import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
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
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts(): BlogPost[] {
  // Obtener nombres de archivos desde /src/content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map((fileName) => {
    // Remover ".mdx" del nombre del archivo para obtener el slug
    const slug = fileName.replace(/\.mdx$/, '');

    // Leer archivo markdown como string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Usar gray-matter para parsear metadata del post
    const matterResult = matter(fileContents);

    // Mapear datos del MDX a nuestro formato
    const post: BlogPost = {
      slug,
      title: matterResult.data.title || slug.replace(/-/g, ' '),
      excerpt: matterResult.data.excerpt || matterResult.content.slice(0, 200) + '...',
      readTime: matterResult.data.readTime || '10 min',
      category: matterResult.data.category || 'Desarrollo Web',
      publishedAt: matterResult.data.publishedAt || '2025-01-01',
      lastUpdated: matterResult.data.lastUpdated || '2025-01-01', 
      date: matterResult.data.date || '2025-01-01',
      image: matterResult.data.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      evergreen: matterResult.data.evergreen || true,
      featured: matterResult.data.featured || false,
      color: matterResult.data.color || 'from-blue-500 to-cyan-500',
      content: matterResult.content
    };

    return post;
  });

  // Ordenar posts por fecha
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const post: BlogPost = {
      slug,
      title: matterResult.data.title || slug.replace(/-/g, ' '),
      excerpt: matterResult.data.excerpt || matterResult.content.slice(0, 200) + '...',
      readTime: matterResult.data.readTime || '10 min',
      category: matterResult.data.category || 'Desarrollo Web',
      publishedAt: matterResult.data.publishedAt || '2025-01-01',
      lastUpdated: matterResult.data.lastUpdated || '2025-01-01',
      date: matterResult.data.date || '2025-01-01',
      image: matterResult.data.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      evergreen: matterResult.data.evergreen || true,
      featured: matterResult.data.featured || false,
      color: matterResult.data.color || 'from-blue-500 to-cyan-500',
      content: matterResult.content
    };

    return post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).map(fileName => fileName.replace(/\.mdx$/, ''));
}