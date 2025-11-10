import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('bg-blue-500', 'text-white', 'p-4')
    expect(result).toBe('bg-blue-500 text-white p-4')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class active-class')
  })

  it('handles false conditional classes', () => {
    const isActive = false
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class')
  })

  it('merges conflicting Tailwind classes correctly', () => {
    // tailwind-merge should handle conflicting classes
    const result = cn('bg-red-500', 'bg-blue-500')
    expect(result).toBe('bg-blue-500') // Last one should win
  })

  it('handles undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'other-class')
    expect(result).toBe('base-class other-class')
  })

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('handles complex conditional logic', () => {
    function getButtonClasses(variant: 'primary' | 'secondary', size: 'lg' | 'sm') {
      return cn(
        'base-button',
        variant === 'primary' && 'bg-blue-500',
        variant === 'secondary' && 'bg-gray-500',
        size === 'lg' && 'px-8 py-4',
        size === 'sm' && 'px-4 py-2'
      )
    }
    
    expect(getButtonClasses('primary', 'lg')).toBe('base-button bg-blue-500 px-8 py-4')
    expect(getButtonClasses('secondary', 'sm')).toBe('base-button bg-gray-500 px-4 py-2')
  })
})