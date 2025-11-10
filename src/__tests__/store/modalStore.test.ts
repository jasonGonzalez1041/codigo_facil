import { renderHook, act } from '@testing-library/react'
import { useModalStore } from '@/store/modalStore'

describe('ModalStore', () => {
  it('should have default state', () => {
    const { result } = renderHook(() => useModalStore())
    
    expect(result.current.isAnyModalOpen).toBe(false)
  })

  it('should update isAnyModalOpen state', () => {
    const { result } = renderHook(() => useModalStore())
    
    act(() => {
      result.current.setIsAnyModalOpen(true)
    })
    
    expect(result.current.isAnyModalOpen).toBe(true)
  })

  it('should toggle modal state correctly', () => {
    const { result } = renderHook(() => useModalStore())
    
    // Reset store state first
    act(() => {
      result.current.setIsAnyModalOpen(false)
    })
    
    // Initially false
    expect(result.current.isAnyModalOpen).toBe(false)
    
    // Set to true
    act(() => {
      result.current.setIsAnyModalOpen(true)
    })
    expect(result.current.isAnyModalOpen).toBe(true)
    
    // Set back to false
    act(() => {
      result.current.setIsAnyModalOpen(false)
    })
    expect(result.current.isAnyModalOpen).toBe(false)
  })

  it('should maintain state across multiple hook instances', () => {
    const { result: result1 } = renderHook(() => useModalStore())
    const { result: result2 } = renderHook(() => useModalStore())
    
    act(() => {
      result1.current.setIsAnyModalOpen(true)
    })
    
    expect(result1.current.isAnyModalOpen).toBe(true)
    expect(result2.current.isAnyModalOpen).toBe(true)
  })
})