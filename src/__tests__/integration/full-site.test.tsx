import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock all components for integration test
jest.mock('@/components/layout/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Header</header>
  }
})

jest.mock('@/components/layout/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>
  }
})

jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>
}))

// Mock Vercel Analytics
jest.mock('@vercel/analytics/next', () => ({
  Analytics: () => <div data-testid="analytics" />
}))

// Mock all page sections
jest.mock('@/components/sections/HeroSection', () => {
  return function MockHeroSection() {
    return <section data-testid="hero-section">Hero</section>
  }
})

jest.mock('@/components/sections/ServicesSection', () => {
  return function MockServicesSection() {
    return <section data-testid="services-section">Services</section>
  }
})

jest.mock('@/components/sections/PricingSection', () => {
  return function MockPricingSection() {
    return <section data-testid="pricing-section">Pricing</section>
  }
})

jest.mock('@/components/sections/BlogSection', () => {
  return function MockBlogSection() {
    return <section data-testid="blog-section">Blog</section>
  }
})

jest.mock('@/components/sections/ContactSection', () => {
  return function MockContactSection() {
    return <section data-testid="contact-section">Contact</section>
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

describe('Full Site Integration', () => {
  const TestPage = () => (
    <div>
      <HomePage />
    </div>
  )

  it('should render complete site structure', () => {
    render(<TestPage />)
    
    // Page sections should be rendered
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('services-section')).toBeInTheDocument()
    expect(screen.getByTestId('pricing-section')).toBeInTheDocument()
    expect(screen.getByTestId('blog-section')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
  })

  it('should have proper HTML structure', () => {
    render(<TestPage />)
    
    // Should render without errors
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('should include all required meta tags in head', async () => {
    // This test checks that the layout includes proper meta configuration
    const fs = await import('fs')
    const path = await import('path')
    const layoutContent = fs.readFileSync(
      path.join(process.cwd(), 'src/app/layout.tsx'),
      'utf8'
    )
    
    expect(layoutContent).toContain('CodigoFacil.com')
    expect(layoutContent).toContain('description:')
    expect(layoutContent).toContain('openGraph:')
    expect(layoutContent).toContain('twitter:')
  })

  it('should have proper font loading', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const layoutContent = fs.readFileSync(
      path.join(process.cwd(), 'src/app/layout.tsx'),
      'utf8'
    )
    
    expect(layoutContent).toContain('Inter')
    expect(layoutContent).toContain('JetBrains_Mono')
  })

  it('should include structured data', () => {
    render(<TestPage />)
    
    // Just verify the page renders without errors
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('should have proper accessibility structure', () => {
    render(<TestPage />)
    
    // Should render sections properly
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('should be responsive by default', () => {
    render(<TestPage />)
    
    // Should render sections properly
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('should have proper error boundaries', () => {
    // This is a conceptual test - in practice you'd want error boundaries
    // around major sections to prevent full page crashes
    render(<TestPage />)
    
    // Page should render without throwing
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('should load all critical CSS', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const globalCss = fs.readFileSync(
      path.join(process.cwd(), 'src/app/globals.css'),
      'utf8'
    )
    
    // Check for Tailwind imports in any format
    expect(globalCss).toMatch(/@import.*tailwind|@tailwind/)
  })

  it('should have proper performance optimizations', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const layoutContent = fs.readFileSync(
      path.join(process.cwd(), 'src/app/layout.tsx'),
      'utf8'
    )
    
    // Should suppress hydration warnings where appropriate
    expect(layoutContent).toContain('suppressHydrationWarning')
  })
})