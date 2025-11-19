/**
 * WhatsApp utilities for LATAM countries
 * Handles number validation, formatting and message generation
 */

interface CountryConfig {
  code: string;
  prefix: string;
  length: number; // Total length including country code
  format: RegExp;
  example: string;
}

const LATAM_COUNTRIES: Record<string, CountryConfig> = {
  // América del Norte (LATAM)
  mx: {
    code: 'MX',
    prefix: '+52',
    length: 13, // +52 + 10 digits
    format: /^\+52[0-9]{10}$/,
    example: '+52 55 1234 5678'
  },
  
  // América Central
  gt: {
    code: 'GT',
    prefix: '+502',
    length: 12, // +502 + 8 digits
    format: /^\+502[0-9]{8}$/,
    example: '+502 5555 1234'
  },
  bz: {
    code: 'BZ',
    prefix: '+501',
    length: 10, // +501 + 7 digits
    format: /^\+501[0-9]{7}$/,
    example: '+501 123 4567'
  },
  sv: {
    code: 'SV',
    prefix: '+503',
    length: 12, // +503 + 8 digits
    format: /^\+503[0-9]{8}$/,
    example: '+503 7123 4567'
  },
  hn: {
    code: 'HN',
    prefix: '+504',
    length: 12, // +504 + 8 digits
    format: /^\+504[0-9]{8}$/,
    example: '+504 9123 4567'
  },
  ni: {
    code: 'NI',
    prefix: '+505',
    length: 12, // +505 + 8 digits
    format: /^\+505[0-9]{8}$/,
    example: '+505 8123 4567'
  },
  cr: {
    code: 'CR',
    prefix: '+506',
    length: 12, // +506 + 8 digits
    format: /^\+506[0-9]{8}$/,
    example: '+506 8123 4567'
  },
  pa: {
    code: 'PA',
    prefix: '+507',
    length: 12, // +507 + 8 digits
    format: /^\+507[0-9]{8}$/,
    example: '+507 6123 4567'
  },

  // El Caribe
  cu: {
    code: 'CU',
    prefix: '+53',
    length: 11, // +53 + 8 digits
    format: /^\+53[0-9]{8}$/,
    example: '+53 5123 4567'
  },
  do: {
    code: 'DO',
    prefix: '+1809',
    length: 14, // +1809 + 7 digits
    format: /^\+1809[0-9]{7}$/,
    example: '+1809 123 4567'
  },
  pr: {
    code: 'PR',
    prefix: '+1787',
    length: 11, // +1787 + 7 digits
    format: /^\+1787[0-9]{7}$/,
    example: '+1787 123 4567'
  },
  jm: {
    code: 'JM',
    prefix: '+1876',
    length: 11, // +1876 + 7 digits
    format: /^\+1876[0-9]{7}$/,
    example: '+1876 123 4567'
  },
  ht: {
    code: 'HT',
    prefix: '+509',
    length: 12, // +509 + 8 digits
    format: /^\+509[0-9]{8}$/,
    example: '+509 3123 4567'
  },

  // América del Sur
  co: {
    code: 'CO',
    prefix: '+57',
    length: 13, // +57 + 10 digits
    format: /^\+57[0-9]{10}$/,
    example: '+57 300 1234 567'
  },
  ve: {
    code: 'VE',
    prefix: '+58',
    length: 13, // +58 + 10 digits
    format: /^\+58[0-9]{10}$/,
    example: '+58 412 1234567'
  },
  gy: {
    code: 'GY',
    prefix: '+592',
    length: 10, // +592 + 7 digits
    format: /^\+592[0-9]{7}$/,
    example: '+592 123 4567'
  },
  sr: {
    code: 'SR',
    prefix: '+597',
    length: 10, // +597 + 7 digits
    format: /^\+597[0-9]{7}$/,
    example: '+597 123 4567'
  },
  gf: {
    code: 'GF',
    prefix: '+594',
    length: 13, // +594 + 9 digits (French Guiana)
    format: /^\+594[0-9]{9}$/,
    example: '+594 694 12 34 56'
  },
  br: {
    code: 'BR',
    prefix: '+55',
    length: 14, // +55 + 11 digits
    format: /^\+55[0-9]{10,11}$/,
    example: '+55 11 91234 5678'
  },
  ec: {
    code: 'EC',
    prefix: '+593',
    length: 13, // +593 + 9 digits
    format: /^\+593[0-9]{9}$/,
    example: '+593 99 123 4567'
  },
  pe: {
    code: 'PE',
    prefix: '+51',
    length: 12, // +51 + 9 digits
    format: /^\+51[0-9]{9}$/,
    example: '+51 987 654 321'
  },
  bo: {
    code: 'BO',
    prefix: '+591',
    length: 12, // +591 + 8 digits
    format: /^\+591[0-9]{8}$/,
    example: '+591 7 123 4567'
  },
  py: {
    code: 'PY',
    prefix: '+595',
    length: 13, // +595 + 9 digits
    format: /^\+595[0-9]{9}$/,
    example: '+595 981 123 456'
  },
  uy: {
    code: 'UY',
    prefix: '+598',
    length: 12, // +598 + 8 digits
    format: /^\+598[0-9]{8}$/,
    example: '+598 99 123 456'
  },
  ar: {
    code: 'AR',
    prefix: '+54',
    length: 14, // +54 + 11 digits (with area code)
    format: /^\+54[0-9]{10,11}$/,
    example: '+54 11 1234 5678'
  },
  cl: {
    code: 'CL',
    prefix: '+56',
    length: 12, // +56 + 9 digits
    format: /^\+56[0-9]{8,9}$/,
    example: '+56 9 1234 5678'
  }
};

/**
 * Validate WhatsApp number for LATAM countries
 */
export function validateWhatsAppNumber(number: string, country: string = ''): boolean {
  // Clean the number
  const cleanNumber = number.replace(/\s+/g, '').replace(/[^\d+]/g, '');
  
  // Must start with +
  if (!cleanNumber.startsWith('+')) {
    return false;
  }

  // If country is specified, validate against that country
  if (country && LATAM_COUNTRIES[country.toLowerCase()]) {
    const countryConfig = LATAM_COUNTRIES[country.toLowerCase()];
    return countryConfig.format.test(cleanNumber);
  }

  // Otherwise, validate against any LATAM country
  return Object.values(LATAM_COUNTRIES).some(config => 
    config.format.test(cleanNumber)
  );
}

/**
 * Format WhatsApp number with proper spacing
 */
export function formatWhatsAppNumber(number: string, country: string = ''): string {
  // Clean the number
  let cleanNumber = number.replace(/\s+/g, '').replace(/[^\d+]/g, '');
  
  // If it doesn't start with +, try to add country prefix
  if (!cleanNumber.startsWith('+') && country && LATAM_COUNTRIES[country.toLowerCase()]) {
    const countryConfig = LATAM_COUNTRIES[country.toLowerCase()];
    if (cleanNumber.length > 0) {
      cleanNumber = countryConfig.prefix + cleanNumber;
    }
  }

  // Format based on country patterns
  for (const [countryCode, config] of Object.entries(LATAM_COUNTRIES)) {
    if (cleanNumber.startsWith(config.prefix)) {
      const digits = cleanNumber.substring(config.prefix.length);
      
      switch (countryCode) {
        case 'mx':
          // +52 55 1234 5678
          if (digits.length >= 10) {
            return `${config.prefix} ${digits.substring(0, 2)} ${digits.substring(2, 6)} ${digits.substring(6, 10)}`;
          }
          break;
        case 'ar':
          // +54 11 1234 5678
          if (digits.length >= 10) {
            return `${config.prefix} ${digits.substring(0, 2)} ${digits.substring(2, 6)} ${digits.substring(6, 10)}`;
          }
          break;
        case 'cl':
          // +56 9 1234 5678
          if (digits.length >= 8) {
            return `${config.prefix} ${digits.substring(0, 1)} ${digits.substring(1, 5)} ${digits.substring(5, 9)}`;
          }
          break;
        case 'co':
          // +57 300 123 4567
          if (digits.length >= 10) {
            return `${config.prefix} ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6, 10)}`;
          }
          break;
        case 'br':
          // +55 11 91234 5678
          if (digits.length >= 11) {
            return `${config.prefix} ${digits.substring(0, 2)} ${digits.substring(2, 7)} ${digits.substring(7, 11)}`;
          } else if (digits.length >= 10) {
            return `${config.prefix} ${digits.substring(0, 2)} ${digits.substring(2, 6)} ${digits.substring(6, 10)}`;
          }
          break;
        case 've':
          // +58 412 1234567
          if (digits.length >= 10) {
            return `${config.prefix} ${digits.substring(0, 3)} ${digits.substring(3, 10)}`;
          }
          break;
        case 'cu':
          // +53 5123 4567
          if (digits.length >= 8) {
            return `${config.prefix} ${digits.substring(0, 4)} ${digits.substring(4, 8)}`;
          }
          break;
        case 'do':
        case 'pr':
        case 'jm':
          // +1809 123 4567, +1787 123 4567, +1876 123 4567
          if (digits.length >= 10) {
            return `${config.prefix} ${digits.substring(0, 3)} ${digits.substring(3, 7)}`;
          }
          break;
        case 'gt':
        case 'sv':
        case 'hn':
        case 'ni':
        case 'cr':
        case 'pa':
        case 'ht':
          // +502 5555 1234, +503 7123 4567, etc.
          if (digits.length >= 8) {
            return `${config.prefix} ${digits.substring(0, 4)} ${digits.substring(4, 8)}`;
          }
          break;
        case 'bz':
        case 'gy':
        case 'sr':
          // +501 123 4567, +592 123 4567, +597 123 4567
          if (digits.length >= 7) {
            return `${config.prefix} ${digits.substring(0, 3)} ${digits.substring(3, 7)}`;
          }
          break;
        case 'gf':
          // +594 694 12 34 56
          if (digits.length >= 9) {
            return `${config.prefix} ${digits.substring(0, 3)} ${digits.substring(3, 5)} ${digits.substring(5, 7)} ${digits.substring(7, 9)}`;
          }
          break;
        default:
          // Basic formatting for other countries
          if (digits.length >= 8) {
            return `${config.prefix} ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`;
          }
      }
    }
  }

  return cleanNumber;
}

/**
 * Get country from WhatsApp number
 */
export function getCountryFromWhatsApp(number: string): string | null {
  const cleanNumber = number.replace(/\s+/g, '').replace(/[^\d+]/g, '');
  
  for (const [countryCode, config] of Object.entries(LATAM_COUNTRIES)) {
    if (cleanNumber.startsWith(config.prefix)) {
      return countryCode;
    }
  }
  
  return null;
}

/**
 * Generate WhatsApp message based on form data
 */
interface MessageData {
  name: string;
  businessType: string;
  source: string;
  projectDetails?: string;
  budget?: string;
  timeline?: string;
  company?: string;
}

export function generateWhatsAppMessage(data: MessageData): string {
  let message = `¡Hola! Soy ${data.name}`;
  
  if (data.company) {
    message += ` de ${data.company}`;
  }
  
  message += `.\n\n`;
  
  if (data.source === 'contact_form_step1' || data.source === 'blog_post') {
    // Quick contact message
    message += `Vi su página web y me interesa sus servicios para mi negocio de ${data.businessType}.\n\n`;
    message += `¿Podemos hablar sobre mi proyecto?`;
  } else if (data.source === 'contact_form_step2') {
    // Detailed quote message
    message += `Necesito una cotización detallada para mi proyecto:\n\n`;
    message += `🏢 **Tipo de negocio:** ${data.businessType}\n`;
    
    if (data.projectDetails) {
      message += `📝 **Proyecto:** ${data.projectDetails}\n`;
    }
    
    if (data.budget) {
      message += `💰 **Presupuesto:** ${data.budget}\n`;
    }
    
    if (data.timeline) {
      message += `⏰ **Timeline:** ${data.timeline}\n`;
    }
    
    message += `\n¿Cuándo podemos agendar una llamada para revisar los detalles?`;
  } else {
    // Default message
    message += `Me interesa conocer más sobre sus servicios de desarrollo web.\n\n`;
    message += `Mi negocio es de ${data.businessType} y me gustaría explorar opciones para mejorar mi presencia digital.`;
  }
  
  return message;
}

/**
 * Generate WhatsApp URL with message
 */
export function generateWhatsAppURL(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
}

/**
 * Extract phone number for wa.me URL (digits only)
 */
export function extractPhoneDigits(number: string): string {
  return number.replace(/[^\d]/g, '');
}

/**
 * Get example number for country
 */
export function getExampleNumber(country: string): string {
  const config = LATAM_COUNTRIES[country.toLowerCase()];
  return config ? config.example : '+56 9 1234 5678';
}

/**
 * Get all supported countries
 */
export function getSupportedCountries(): Array<{code: string, name: string, prefix: string, example: string}> {
  const countryNames: Record<string, string> = {
    // América del Norte
    mx: 'México',
    
    // América Central
    gt: 'Guatemala',
    bz: 'Belice',
    sv: 'El Salvador',
    hn: 'Honduras',
    ni: 'Nicaragua',
    cr: 'Costa Rica',
    pa: 'Panamá',
    
    // El Caribe
    cu: 'Cuba',
    do: 'República Dominicana',
    pr: 'Puerto Rico',
    jm: 'Jamaica',
    ht: 'Haití',
    
    // América del Sur
    co: 'Colombia',
    ve: 'Venezuela',
    gy: 'Guyana',
    sr: 'Surinam',
    gf: 'Guayana Francesa',
    br: 'Brasil',
    ec: 'Ecuador',
    pe: 'Perú',
    bo: 'Bolivia',
    py: 'Paraguay',
    uy: 'Uruguay',
    ar: 'Argentina',
    cl: 'Chile'
  };

  return Object.entries(LATAM_COUNTRIES).map(([code, config]) => ({
    code,
    name: countryNames[code] || code.toUpperCase(),
    prefix: config.prefix,
    example: config.example
  }));
}

/**
 * Validate and format number for display
 */
export function validateAndFormat(number: string, country?: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} {
  if (!number.trim()) {
    return {
      isValid: false,
      formatted: '',
      error: 'El número de WhatsApp es requerido'
    };
  }

  const isValid = validateWhatsAppNumber(number, country);
  const formatted = formatWhatsAppNumber(number, country);

  if (!isValid) {
    const example = country ? getExampleNumber(country) : '+52 55 1234 5678';
    return {
      isValid: false,
      formatted,
      error: `Formato inválido. Ejemplo: ${example}`
    };
  }

  return {
    isValid: true,
    formatted
  };
}