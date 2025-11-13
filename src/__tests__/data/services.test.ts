import { servicesData, Service } from '@/data/services'

describe('Services Data', () => {
  it('should have the correct number of services', () => {
    expect(servicesData).toHaveLength(6)
  })

  it('should have all required properties for each service', () => {
    const requiredProperties = [
      'id',
      'title',
      'description',
      'icon',
      'fullDescription',
      'benefits',
      'process',
      'technologies',
      'price',
      'timeline'
    ]

    servicesData.forEach((service, index) => {
      requiredProperties.forEach(property => {
        expect(service).toHaveProperty(property)
        expect(service[property as keyof Service]).toBeDefined()
        expect(service[property as keyof Service]).not.toBe('')
      })
    })
  })

  it('should have unique IDs for all services', () => {
    const ids = servicesData.map(service => service.id)
    const uniqueIds = new Set(ids)
    
    expect(uniqueIds.size).toBe(servicesData.length)
  })

  it('should have proper data types for each service property', () => {
    servicesData.forEach(service => {
      expect(typeof service.id).toBe('string')
      expect(typeof service.title).toBe('string')
      expect(typeof service.description).toBe('string')
      expect(typeof service.icon).toBe('string')
      expect(typeof service.fullDescription).toBe('string')
      expect(Array.isArray(service.benefits)).toBe(true)
      expect(Array.isArray(service.process)).toBe(true)
      expect(Array.isArray(service.technologies)).toBe(true)
      expect(typeof service.price).toBe('string')
      expect(typeof service.timeline).toBe('string')
    })
  })

  it('should have non-empty arrays for benefits, process, and technologies', () => {
    servicesData.forEach(service => {
      expect(service.benefits.length).toBeGreaterThan(0)
      expect(service.process.length).toBeGreaterThan(0)
      expect(service.technologies.length).toBeGreaterThan(0)
    })
  })

  it('should have benefits as non-empty strings', () => {
    servicesData.forEach(service => {
      service.benefits.forEach(benefit => {
        expect(typeof benefit).toBe('string')
        expect(benefit.length).toBeGreaterThan(0)
      })
    })
  })

  it('should have process steps as non-empty strings', () => {
    servicesData.forEach(service => {
      service.process.forEach(step => {
        expect(typeof step).toBe('string')
        expect(step.length).toBeGreaterThan(0)
      })
    })
  })

  it('should have technologies as non-empty strings', () => {
    servicesData.forEach(service => {
      service.technologies.forEach(tech => {
        expect(typeof tech).toBe('string')
        expect(tech.length).toBeGreaterThan(0)
      })
    })
  })

  it('should have specific expected services', () => {
    const expectedServiceIds = [
      'web-app',
      'ecommerce',
      'mobile-app',
      'maintenance',
      'consulting',
      'optimization'
    ]

    expectedServiceIds.forEach(expectedId => {
      const service = servicesData.find(s => s.id === expectedId)
      expect(service).toBeDefined()
    })
  })

  it('should have consistent pricing format', () => {
    servicesData.forEach(service => {
      // Should contain $ symbol
      expect(service.price).toMatch(/\$/)
      // Should contain price numbers
      expect(service.price).toMatch(/\d/)
    })
  })

  it('should have emojis in titles and descriptions', () => {
    servicesData.forEach(service => {
      // Should have emoji in icon
      expect(service.icon).toMatch(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u)
    })
  })

  describe('Web App Service', () => {
    const webAppService = servicesData.find(s => s.id === 'web-app')!

    it('should have correct web app service properties', () => {
      expect(webAppService.title).toBe('Aplicación Web')
      expect(webAppService.icon).toBe('⚡')
      expect(webAppService.technologies).toContain('Next.js ⚛️')
    })
  })

  describe('E-commerce Service', () => {
    const ecommerceService = servicesData.find(s => s.id === 'ecommerce')!

    it('should have correct e-commerce service properties', () => {
      expect(ecommerceService.title).toBe('E-commerce Profesional')
      expect(ecommerceService.icon).toBe('🛒')
      expect(ecommerceService.technologies).toContain('Stripe 💳')
    })
  })
})