/**
 * Analytics utilities for CodigoFacil.com
 * Handles GTM events and GDPR/LGPD compliance for LATAM
 */

interface EventParams {
  [key: string]: any;
}

interface LeadFormData {
  form_type: string;
  form_location: string;
  source?: string;
}

interface WhatsAppData {
  phone_number: string;
  click_location: string;
  message_type?: string;
  conversion_value?: number;
}

/**
 * Track custom events with GTM dataLayer
 */
export function trackEvent(eventName: string, parameters: EventParams = {}) {
  if (typeof window === 'undefined') return;

  // Check consent before tracking
  try {
    const consent = localStorage.getItem('analytics_consent');
    if (!consent || !JSON.parse(consent)) {
      console.log('Analytics tracking blocked - no consent');
      return;
    }
  } catch (error) {
    console.log('Error checking analytics consent:', error);
    return;
  }

  // Initialize dataLayer if not exists
  window.dataLayer = window.dataLayer || [];

  // Common event data
  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    page_title: document.title,
    user_agent: navigator.userAgent,
    ...parameters
  };

  // Push to dataLayer
  window.dataLayer.push(eventData);

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, eventData);
  }
}

/**
 * Track lead form start event
 */
export function trackLeadFormStart(data: LeadFormData) {
  trackEvent('lead_form_start', {
    form_type: data.form_type,
    form_location: data.form_location,
    source: data.source || 'organic',
    conversion_value: 1
  });
}

/**
 * Track lead form submission
 */
export function trackLeadFormSubmit(data: LeadFormData) {
  trackEvent('lead_form_submit', {
    form_type: data.form_type,
    form_location: data.form_location,
    source: data.source || 'organic',
    conversion_value: 5
  });
}

/**
 * Track WhatsApp click events
 */
export function trackWhatsAppClick(data: WhatsAppData) {
  trackEvent('whatsapp_click', {
    phone_number: data.phone_number,
    click_location: data.click_location,
    message_type: data.message_type || 'general',
    conversion_value: data.conversion_value || 10
  });
}

/**
 * Track file downloads (PDFs, checklists)
 */
export function trackDownload(fileName: string, location: string) {
  trackEvent('download_checklist', {
    file_name: fileName,
    download_location: location,
    file_type: fileName.split('.').pop(),
    conversion_value: 3
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number) {
  // Only track major milestones
  if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
    trackEvent('scroll', {
      percent_scrolled: percentage,
      page_title: document.title,
      engagement_time_msec: performance.now()
    });
  }
}

/**
 * Track time on page milestones
 */
export function trackTimeOnPage(seconds: number) {
  if (seconds === 30 || seconds === 60 || seconds === 120) {
    trackEvent('engaged_user', {
      engagement_time_msec: seconds * 1000,
      page_title: document.title,
      user_engagement: seconds >= 120 ? 'high' : seconds >= 60 ? 'medium' : 'low'
    });
  }
}

/**
 * Track calculator usage
 */
export function trackCalculatorUsage(calculatorType: string, result: any) {
  trackEvent('calculator_used', {
    calculator_type: calculatorType,
    estimated_price: result.price || 0,
    estimated_time: result.time || '',
    complexity: result.complexity || '',
    conversion_value: 15
  });
}

/**
 * Track service modal opens
 */
export function trackServiceModalOpen(serviceName: string, serviceId: string) {
  trackEvent('service_modal_open', {
    service_name: serviceName,
    service_id: serviceId,
    modal_location: 'services_section',
    conversion_value: 2
  });
}

/**
 * Track blog engagement
 */
export function trackBlogEngagement(postTitle: string, action: string, value?: any) {
  trackEvent('blog_engagement', {
    post_title: postTitle,
    engagement_action: action,
    engagement_value: value,
    conversion_value: action === 'cta_click' ? 8 : 1
  });
}

/**
 * Track country/region selection
 */
export function trackCountrySelection(country: string, source: string) {
  let previousCountry = 'none';
  
  if (typeof window !== 'undefined') {
    try {
      previousCountry = localStorage.getItem('selected_country') || 'none';
    } catch (error) {
      console.log('Error reading previous country:', error);
    }
  }
  
  trackEvent('country_selection', {
    selected_country: country,
    selection_source: source,
    previous_country: previousCountry
  });
  
  // Store for future reference
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('selected_country', country);
    } catch (error) {
      console.log('Error storing selected country:', error);
    }
  }
}

/**
 * Enhanced scroll tracking with intersection observer
 */
export function initScrollTracking() {
  if (typeof window === 'undefined') return;

  let scrollPercentages = [25, 50, 75, 100];
  let trackedPercentages = new Set<number>();

  const trackScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    scrollPercentages.forEach(percentage => {
      if (scrollPercent >= percentage && !trackedPercentages.has(percentage)) {
        trackScrollDepth(percentage);
        trackedPercentages.add(percentage);
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        trackScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Initialize time tracking
 */
export function initTimeTracking() {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const intervals = [30, 60, 120]; // seconds
  const trackedIntervals = new Set<number>();

  const checkTimeOnPage = () => {
    const currentTime = Date.now();
    const timeOnPage = Math.floor((currentTime - startTime) / 1000);

    intervals.forEach(interval => {
      if (timeOnPage >= interval && !trackedIntervals.has(interval)) {
        trackTimeOnPage(interval);
        trackedIntervals.add(interval);
      }
    });
  };

  // Check every 10 seconds
  const timeInterval = setInterval(checkTimeOnPage, 10000);

  return () => {
    clearInterval(timeInterval);
  };
}

/**
 * Track page view with enhanced data
 */
export function trackPageView(customData: EventParams = {}) {
  if (typeof window === 'undefined') return;

  const pageData = {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_search: window.location.search,
    page_referrer: document.referrer,
    user_language: navigator.language,
    screen_resolution: `${screen.width}x${screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    ...customData
  };

  trackEvent('page_view', pageData);
}

/**
 * GDPR/LGPD consent management
 */
export function setAnalyticsConsent(consent: boolean) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('analytics_consent', JSON.stringify(consent));
    
    if (consent) {
      trackEvent('consent_granted', {
        consent_type: 'analytics',
        consent_source: 'banner'
      });
    }
  } catch (error) {
    console.log('Error setting analytics consent:', error);
  }
}

export function getAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('analytics_consent');
    return consent ? JSON.parse(consent) : false;
  } catch (error) {
    console.log('Error getting analytics consent:', error);
    return false;
  }
}