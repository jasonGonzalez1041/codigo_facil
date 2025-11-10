import { create } from 'zustand'

interface ModalState {
  isAnyModalOpen: boolean
  setIsAnyModalOpen: (isOpen: boolean) => void
}

export const useModalStore = create<ModalState>((set) => ({
  isAnyModalOpen: false,
  setIsAnyModalOpen: (isOpen: boolean) => set({ isAnyModalOpen: isOpen }),
}))