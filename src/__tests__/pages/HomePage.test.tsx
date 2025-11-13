import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock all section components
jest.mock('@/components/sections/HeroSection', () => {
  return function MockHeroSection() {
    return <div data-testid="hero-section">Hero Section</div>
  }
})

jest.mock('@/components/sections/ServicesSection', () => {
  return function MockServicesSection() {
    return <div data-testid="services-section">Services Section</div>
  }
})

jest.mock('@/components/sections/PricingSection', () => {
  return function MockPricingSection() {
    return <div data-testid="pricing-section">Pricing Section</div>
  }
})

jest.mock('@/components/sections/BlogSection', () => {
  return function MockBlogSection() {
    return <div data-testid="blog-section">Blog Section</div>
  }
})

jest.mock('@/components/sections/ContactSection', () => {
  return function MockContactSection() {
    return <div data-testid="contact-section">Contact Section</div>
  }
})

// Mock GSAP
jest.mock('gsap', () => ({
  __esModule: true,
  default: {
    registerPlugin: jest.fn(),
    fromTo: jest.fn(),
  },
  ScrollTrigger: {
    getAll: jest.fn(() => []),
  }
}))

describe('HomePage', () => {
  it('should render all main sections', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('services-section')).toBeInTheDocument()
    expect(screen.getByTestId('pricing-section')).toBeInTheDocument()
    expect(screen.getByTestId('blog-section')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
  })

  it('should have proper section IDs for navigation', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('hero-section').closest('[id="inicio"]')).toBeInTheDocument()
    expect(screen.getByTestId('services-section').closest('[id="servicios"]')).toBeInTheDocument()
    expect(screen.getByTestId('pricing-section').closest('[id="pricing"]')).toBeInTheDocument()
    expect(screen.getByTestId('blog-section').closest('[id="blog"]')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section').closest('[id="contacto"]')).toBeInTheDocument()
  })

  it('should not render projects section (temporarily commented)', () => {
    render(<HomePage />)
    
    expect(screen.queryByText('proyectos')).not.toBeInTheDocument()
    expect(screen.queryByTestId('projects-section')).not.toBeInTheDocument()
  })

  it('should render sections in correct order', () => {
    render(<HomePage />)
    
    const sections = screen.getAllByTestId(/.*-section/)
    const sectionOrder = sections.map(section => section.getAttribute('data-testid'))
    
    expect(sectionOrder).toEqual([
      'hero-section',
      'services-section', 
      'pricing-section',
      'blog-section',
      'contact-section'
    ])
  })

  it('should be a client component', async () => {
    // This test verifies the component is marked as client-side
    const fs = await import('fs')
    const path = await import('path')
    const componentCode = fs.readFileSync(
      path.join(process.cwd(), 'src/app/page.tsx'),
      'utf8'
    )
    
    expect(componentCode).toContain('"use client"')
  })

  it('should import GSAP and ScrollTrigger', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentCode = fs.readFileSync(
      path.join(process.cwd(), 'src/app/page.tsx'),
      'utf8'
    )
    
    expect(componentCode).toContain('import gsap from "gsap"')
    expect(componentCode).toContain('import { ScrollTrigger } from "gsap/ScrollTrigger"')
  })

  it('should use React hooks for animations', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentCode = fs.readFileSync(
      path.join(process.cwd(), 'src/app/page.tsx'),
      'utf8'
    )
    
    expect(componentCode).toContain('useEffect')
    expect(componentCode).toContain('useRef')
  })
})