// Mock GSAP for Jest tests
const gsapMock = {
  timeline: jest.fn(() => ({
    fromTo: jest.fn(() => gsapMock),
    to: jest.fn(() => gsapMock),
    from: jest.fn(() => gsapMock),
    set: jest.fn(() => gsapMock),
    add: jest.fn(() => gsapMock),
    kill: jest.fn(),
    repeat: jest.fn(() => gsapMock),
  })),
  fromTo: jest.fn(() => gsapMock),
  to: jest.fn(() => gsapMock),
  from: jest.fn(() => gsapMock),
  set: jest.fn(() => gsapMock),
  registerPlugin: jest.fn(),
  context: jest.fn((fn) => {
    if (fn) fn()
    return { revert: jest.fn() }
  }),
}

export const ScrollTrigger = {
  create: jest.fn(() => ({})),
  refresh: jest.fn(),
  update: jest.fn(),
}

export { gsapMock as gsap }
export default gsapMock