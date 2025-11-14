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
    // (500 + 5*100 + 3*150) * 1 = (500 + 500 + 450) * 1 = 1,450
    expect(screen.getByText('$1,450 USD')).toBeInTheDocument()
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
    
    // Change to advanced complexity (multiplier 2.2)
    const complexitySelect = screen.getByRole('combobox')
    fireEvent.change(complexitySelect, { target: { value: 'advanced' } })
    
    // (500 + 5*100 + 3*150) * 2.2 = 1,450 * 2.2 = 3,190
    expect(screen.getByText('$3,190 USD')).toBeInTheDocument()
  })

  it('should calculate time estimate correctly', () => {
    render(<CostCalculator />)
    
    // Default cost is 1,450, time = ceil(1,450 / 400) = 4 days
    expect(screen.getByText('Tiempo estimado: 4 días laborales')).toBeInTheDocument()
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
    
    // (500 + 20*100 + 10*150) * 2.2 = (500 + 2000 + 1500) * 2.2 = 8,800
    expect(screen.getByText('$8,800 USD')).toBeInTheDocument()
  })

  it('should open WhatsApp when quote button is clicked', () => {
    render(<CostCalculator />)
    
    const quoteButton = screen.getByText('💬 Cotizar Este Proyecto')
    fireEvent.click(quoteButton)
    
    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/56950225491?text='),
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
    
    expect(screen.getByText('* Precios referenciales. Cotización final incluye análisis detallado')).toBeInTheDocument()
  })

  it('should animate when cost changes', async () => {
    render(<CostCalculator />)
    
    const pagesSlider = screen.getByDisplayValue('5')
    
    // Change pages to trigger animation
    fireEvent.change(pagesSlider, { target: { value: '8' } })
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(screen.getByText('$1,750 USD')).toBeInTheDocument()
    })
  })
})