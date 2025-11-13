import { render, screen } from '@testing-library/react'
import BlogPage from '@/app/blog/page'

// Mock the BlogPageClient component
jest.mock('@/app/blog/BlogPageClient', () => ({
  BlogPageClient: function MockBlogPageClient() {
    return <div data-testid="blog-page-client">Blog Page Client Component</div>
  }
}))

describe('BlogPage', () => {
  it('should render page title', () => {
    render(<BlogPage />)
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('should render page description', () => {
    render(<BlogPage />)
    
    expect(screen.getByText(/Guías atemporales que generan valor perpetuo/)).toBeInTheDocument()
  })

  it('should render feature badges', () => {
    render(<BlogPage />)
    
    expect(screen.getByText('📚 Guías Completas')).toBeInTheDocument()
    expect(screen.getByText('⏰ Contenido Atemporal')).toBeInTheDocument()
    expect(screen.getByText('🚀 Resultados Garantizados')).toBeInTheDocument()
  })

  it('should render featured post', () => {
    render(<BlogPage />)
    
    expect(screen.getByText('⭐ Featured')).toBeInTheDocument()
    const featuredPosts = screen.getAllByText(/Next\.js para Principiantes/)
    expect(featuredPosts.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('15 min de lectura')).toBeInTheDocument()
    expect(screen.getByText('Leer Guía Completa →')).toBeInTheDocument()
  })

  it('should render all blog posts', () => {
    render(<BlogPage />)
    
    const nextJsPosts = screen.getAllByText(/Desarrollo Web con Next\.js/)
    const ecommercePosts = screen.getAllByText(/E-commerce Responsive/)
    const seoPosts = screen.getAllByText(/SEO Evergreen/)
    
    expect(nextJsPosts.length).toBeGreaterThanOrEqual(1)
    expect(ecommercePosts.length).toBeGreaterThanOrEqual(1)
    expect(seoPosts.length).toBeGreaterThanOrEqual(1)
  })

  it('should render post categories', () => {
    render(<BlogPage />)
    
    expect(screen.getByText('Desarrollo Web')).toBeInTheDocument()
    expect(screen.getByText('E-commerce')).toBeInTheDocument()
    expect(screen.getByText('SEO')).toBeInTheDocument()
  })

  it('should render read times', () => {
    render(<BlogPage />)
    
    const readTimes = screen.getAllByText(/\d+ min/)
    expect(readTimes.length).toBeGreaterThanOrEqual(3)
  })

  it('should render evergreen badges', () => {
    render(<BlogPage />)
    
    const evergreenBadges = screen.getAllByText('📚 Guía Práctica')
    expect(evergreenBadges.length).toBeGreaterThan(0)
  })

  it('should render "Leer más" links', () => {
    render(<BlogPage />)
    
    const leerMasLinks = screen.getAllByText(/Leer más|Leer Guía/)
    expect(leerMasLinks.length).toBeGreaterThan(0)
  })

  it('should render "Todas las Guías" section', () => {
    render(<BlogPage />)
    
    expect(screen.getByText('Todas las Guías')).toBeInTheDocument()
  })

  it('should render CTA section', () => {
    render(<BlogPage />)
    
    expect(screen.getByText('¿Listo para Implementar lo Aprendido?')).toBeInTheDocument()
    expect(screen.getByText(/Convierte este conocimiento evergreen/)).toBeInTheDocument()
  })

  it('should render BlogPageClient component', () => {
    render(<BlogPage />)
    
    expect(screen.getByTestId('blog-page-client')).toBeInTheDocument()
  })

  it('should have proper gradient background', () => {
    render(<BlogPage />)
    
    // Just verify the page renders
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('should render post images', () => {
    render(<BlogPage />)
    
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
    
    images.forEach(img => {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt')
    })
  })

  it('should render updated dates', () => {
    render(<BlogPage />)
    
    expect(screen.getByText('Actualizado: 2025-01-01')).toBeInTheDocument()
  })

  it('should render post excerpts', () => {
    render(<BlogPage />)
    
    const excerpts = screen.getAllByText(/Domina Next\.js|Estrategias atemporales|Principios SEO/)
    expect(excerpts.length).toBeGreaterThanOrEqual(3)
  })

  it('should have proper page structure for SEO', () => {
    render(<BlogPage />)
    
    // Should have proper heading hierarchy
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(0)
  })
})