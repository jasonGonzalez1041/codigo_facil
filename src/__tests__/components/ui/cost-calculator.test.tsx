import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CostCalculator } from '@/components/ui/cost-calculator'

// Mock window.open
const mockOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true
})

// Mock document.getElementById
const mockGetElementById = jest.fn()
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true
})

describe('CostCalculator Component', () => {
  beforeEach(() => {
    mockOpen.mockClear()
    mockGetElementById.mockClear()
  })

  it('should render cost calculator with default values', () => {
    render(<CostCalculator />)
    
    expect(screen.getByText('🧮 Calculadora de Costos')).toBeInTheDocument()
    expect(screen.getByText('Estima el costo de tu proyecto web personalizado')).toBeInTheDocument()
    expect(screen.getByText('Número de Páginas: 5')).toBeInTheDocument()
    expect(screen.getByText('Funcionalidades Especiales: 3')).toBeInTheDocument()
  })

  it('should calculate cost correctly with default values', () => {
    render(<CostCalculator />)
    
    // Default: 5 pages, 3 features, basic complexity
    // Nueva lógica: $350 base + (5-3)*$50 páginas extra + 3*$75 features = $350 + $100 + $225 = $675
    expect(screen.getByText('$675 USD')).toBeInTheDocument()
  })

  it('should update pages count when slider changes', () => {
    render(<CostCalculator />)
    
    const pagesSlider = screen.getByDisplayValue('5')
    fireEvent.change(pagesSlider, { target: { value: '10' } })
    
    expect(screen.getByText('Número de Páginas: 10')).toBeInTheDocument()
  })

  it('should update features count when slider changes', () => {
    render(<CostCalculator />)
    
    const featuresSlider = screen.getByDisplayValue('3')
    fireEvent.change(featuresSlider, { target: { value: '7' } })
    
    expect(screen.getByText('Funcionalidades Especiales: 7')).toBeInTheDocument()
  })

  it('should update complexity when select changes', () => {
    render(<CostCalculator />)
    
    const complexitySelect = screen.getByRole('combobox')
    fireEvent.change(complexitySelect, { target: { value: 'advanced' } })
    
    expect(complexitySelect).toHaveValue('advanced')
  })

  it('should calculate cost correctly with advanced complexity', () => {
    render(<CostCalculator />)
    
    // Change to advanced complexity
    const complexitySelect = screen.getByRole('combobox')
    fireEvent.change(complexitySelect, { target: { value: 'advanced' } })
    
    // Nueva lógica: $1200 base + (5-15)*$60 páginas extra + 3*$150 features = $1200 + $0 + $450 = $1650
    expect(screen.getByText('$1,650 USD')).toBeInTheDocument()
  })

  it('should calculate time estimate correctly', () => {
    render(<CostCalculator />)
    
    // Default cost is $675, time = ceil(675 / 20) = 34 horas
    expect(screen.getByText('Tiempo estimado: 34 horas de desarrollo')).toBeInTheDocument()
  })

  it('should format price with commas for large numbers', () => {
    render(<CostCalculator />)
    
    // Set high values to get a large price
    const pagesSlider = screen.getByDisplayValue('5')
    const featuresSlider = screen.getByDisplayValue('3')
    const complexitySelect = screen.getByRole('combobox')
    
    fireEvent.change(pagesSlider, { target: { value: '20' } })
    fireEvent.change(featuresSlider, { target: { value: '10' } })
    fireEvent.change(complexitySelect, { target: { value: 'advanced' } })
    
    // Nueva lógica advanced: $1200 base + (20-15)*$60 páginas extra + 10*$150 features = $1200 + $300 + $1500 = $3000
    expect(screen.getByText('$3,000 USD')).toBeInTheDocument()
  })

  it('should open WhatsApp when quote button is clicked', () => {
    render(<CostCalculator />)
    
    const quoteButton = screen.getByText('💬 Cotizar Este Proyecto')
    fireEvent.click(quoteButton)
    
    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/56995022549?text='),
      '_blank'
    )
  })

  it('should scroll to contact section when proposal button is clicked', () => {
    const mockScrollIntoView = jest.fn()
    const mockElement = { scrollIntoView: mockScrollIntoView }
    mockGetElementById.mockReturnValue(mockElement)
    
    render(<CostCalculator />)
    
    const proposalButton = screen.getByText('📋 Solicitar Propuesta Detallada')
    fireEvent.click(proposalButton)
    
    expect(mockGetElementById).toHaveBeenCalledWith('contacto')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('should show disclaimer text', () => {
    render(<CostCalculator />)
    
    expect(screen.getByText('* Precios referenciales basados en planes estándar. Cotización final incluye análisis detallado')).toBeInTheDocument()
  })

  it('should animate when cost changes', async () => {
    render(<CostCalculator />)
    
    const pagesSlider = screen.getByDisplayValue('5')
    
    // Change pages to trigger animation
    fireEvent.change(pagesSlider, { target: { value: '8' } })
    
    // Wait for animation to complete
    // Nueva lógica: $350 base + (8-3)*$50 páginas extra + 3*$75 features = $350 + $250 + $225 = $825
    await waitFor(() => {
      expect(screen.getByText('$825 USD')).toBeInTheDocument()
    })
  })
})