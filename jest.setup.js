// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock IntersectionObserver for GSAP and animations
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock GSAP for animation tests
jest.mock('gsap', () => ({
  __esModule: true,
  default: {
    registerPlugin: jest.fn(),
    fromTo: jest.fn(),
    to: jest.fn(),
    from: jest.fn(),
    set: jest.fn(),
    context: jest.fn(() => ({
      add: jest.fn(),
      revert: jest.fn(),
    })),
    timeline: jest.fn(() => ({
      to: jest.fn(),
      from: jest.fn(),
      fromTo: jest.fn(),
    })),
  },
  ScrollTrigger: {
    create: jest.fn(),
    refresh: jest.fn(),
    getAll: jest.fn(() => []),
  },
}))

// Mock next/font for font tests
jest.mock('next/font/google', () => ({
  Inter: () => ({
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  }),
  JetBrains_Mono: () => ({
    style: {
      fontFamily: 'JetBrains Mono, monospace',
    },
  }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    button: 'button',
  },
  AnimatePresence: ({ children }) => children,
}))