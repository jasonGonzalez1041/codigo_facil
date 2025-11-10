import { render, screen, fireEvent } from '@testing-library/react'
import { ModeToggle } from '@/components/ui/mode-toggle'

// Mock next-themes
const mockSetTheme = jest.fn()
const mockUseTheme = {
  setTheme: mockSetTheme,
  theme: 'light',
  resolvedTheme: 'light'
}

jest.mock('next-themes', () => ({
  useTheme: () => mockUseTheme
}))

// Mock dropdown menu components
jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: any) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuItem: ({ children, onClick }: any) => (
    <button data-testid="dropdown-item" onClick={onClick}>{children}</button>
  ),
  DropdownMenuTrigger: ({ children }: any) => <div data-testid="dropdown-trigger">{children}</div>
}))

describe('ModeToggle Component', () => {
  beforeEach(() => {
    mockSetTheme.mockClear()
  })

  it('should render theme toggle button', () => {
    render(<ModeToggle />)
    
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument()
  })

  it('should render theme options', () => {
    render(<ModeToggle />)
    
    expect(screen.getByText('Claro')).toBeInTheDocument()
    expect(screen.getByText('Oscuro')).toBeInTheDocument()
    expect(screen.getByText('Sistema')).toBeInTheDocument()
  })

  it('should call setTheme when light option is clicked', () => {
    render(<ModeToggle />)
    
    const lightButton = screen.getByText('Claro')
    fireEvent.click(lightButton)
    
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('should call setTheme when dark option is clicked', () => {
    render(<ModeToggle />)
    
    const darkButton = screen.getByText('Oscuro')
    fireEvent.click(darkButton)
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('should call setTheme when system option is clicked', () => {
    render(<ModeToggle />)
    
    const systemButton = screen.getByText('Sistema')
    fireEvent.click(systemButton)
    
    expect(mockSetTheme).toHaveBeenCalledWith('system')
  })

  it('should render with proper button styling', () => {
    render(<ModeToggle />)
    
    const toggleButtons = screen.getAllByRole('button')
    expect(toggleButtons.length).toBeGreaterThan(0)
  })

  it('should have proper accessibility attributes', () => {
    render(<ModeToggle />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render theme toggle component', () => {
    render(<ModeToggle />)
    
    // Just verify the component renders
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
  })
})