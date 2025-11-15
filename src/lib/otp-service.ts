// 🔐 Módulo OTP Autónomo - CodigoFacil Admin System
// Genera, valida y maneja códigos OTP sin dependencias externas

interface OTPData {
  code: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
}

class OTPService {
  private otpStorage: Map<string, OTPData> = new Map();
  private readonly AUTHORIZED_EMAIL = 'vecipremiun@gmail.com';
  private readonly OTP_EXPIRY_MINUTES = 10;
  private readonly MAX_ATTEMPTS = 3;
  
  /**
   * 🎲 Generar código OTP de 6 dígitos
   */
  private generateOTPCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * 🕒 Verificar si el OTP ha expirado
   */
  private isExpired(otpData: OTPData): boolean {
    return Date.now() > otpData.expiresAt;
  }

  /**
   * 📧 Simular envío de email (en producción aquí va el servicio real)
   */
  private async sendOTPEmail(email: string, code: string): Promise<boolean> {
    // 🚀 Aquí puedes integrar tu servicio de email preferido
    console.log(`📧 OTP Code for ${email}: ${code}`);
    
    // Para desarrollo, mostrar en consola
    if (process.env.NODE_ENV === 'development') {
      console.log(`
🔐 ADMIN OTP GENERATED
━━━━━━━━━━━━━━━━━━━━━━
📧 Email: ${email}
🔢 Code: ${code}
⏰ Expires: ${this.OTP_EXPIRY_MINUTES} minutes
━━━━━━━━━━━━━━━━━━━━━━
      `);
    }
    
    // TODO: Implementar envío real de email
    return true;
  }

  /**
   * 🚀 Generar y enviar nuevo OTP
   */
  async requestOTP(email: string): Promise<{
    success: boolean;
    message: string;
    cooldown?: number;
  }> {
    // 🛡️ Verificar email autorizado
    if (email !== this.AUTHORIZED_EMAIL) {
      return {
        success: false,
        message: 'Email no autorizado para acceso administrativo'
      };
    }

    // 🔄 Verificar cooldown (evitar spam)
    const existingOTP = this.otpStorage.get(email);
    if (existingOTP && !this.isExpired(existingOTP)) {
      const remainingTime = Math.ceil((existingOTP.expiresAt - Date.now()) / 60000);
      return {
        success: false,
        message: `Código OTP ya enviado. Espera ${remainingTime} minutos o usa el código actual.`,
        cooldown: remainingTime
      };
    }

    // ✨ Generar nuevo OTP
    const code = this.generateOTPCode();
    const now = Date.now();
    const expiresAt = now + (this.OTP_EXPIRY_MINUTES * 60 * 1000);

    const otpData: OTPData = {
      code,
      email,
      createdAt: now,
      expiresAt,
      attempts: 0
    };

    // 💾 Guardar en memoria (en producción usar Redis/DB)
    this.otpStorage.set(email, otpData);

    // 📧 Enviar email
    const emailSent = await this.sendOTPEmail(email, code);
    
    if (!emailSent) {
      return {
        success: false,
        message: 'Error al enviar el código OTP. Intenta nuevamente.'
      };
    }

    return {
      success: true,
      message: `Código OTP enviado a ${email}. Válido por ${this.OTP_EXPIRY_MINUTES} minutos.`
    };
  }

  /**
   * ✅ Verificar código OTP
   */
  verifyOTP(email: string, inputCode: string): {
    success: boolean;
    message: string;
    token?: string;
  } {
    // 🛡️ Verificar email autorizado
    if (email !== this.AUTHORIZED_EMAIL) {
      return {
        success: false,
        message: 'Email no autorizado'
      };
    }

    // 🔍 Buscar OTP
    const otpData = this.otpStorage.get(email);
    if (!otpData) {
      return {
        success: false,
        message: 'No se ha solicitado ningún código OTP'
      };
    }

    // ⏰ Verificar expiración
    if (this.isExpired(otpData)) {
      this.otpStorage.delete(email);
      return {
        success: false,
        message: 'El código OTP ha expirado. Solicita uno nuevo.'
      };
    }

    // 🚫 Verificar intentos máximos
    if (otpData.attempts >= this.MAX_ATTEMPTS) {
      this.otpStorage.delete(email);
      return {
        success: false,
        message: 'Demasiados intentos fallidos. Solicita un nuevo código.'
      };
    }

    // 🔐 Verificar código
    otpData.attempts++;
    
    if (otpData.code !== inputCode.trim()) {
      this.otpStorage.set(email, otpData);
      const remainingAttempts = this.MAX_ATTEMPTS - otpData.attempts;
      return {
        success: false,
        message: `Código incorrecto. Te quedan ${remainingAttempts} intentos.`
      };
    }

    // 🎉 Éxito! Generar token de sesión
    this.otpStorage.delete(email); // Limpiar OTP usado
    const sessionToken = this.generateSessionToken(email);

    return {
      success: true,
      message: 'Acceso autorizado. ¡Bienvenido al panel administrativo!',
      token: sessionToken
    };
  }

  /**
   * 🎫 Generar token de sesión JWT simple
   */
  private generateSessionToken(email: string): string {
    const payload = {
      email,
      role: 'admin',
      issuedAt: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
    };

    // JWT simple (en producción usar jsonwebtoken)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payloadEncoded = btoa(JSON.stringify(payload));
    const secret = process.env.ADMIN_SECRET || 'codigofacil-admin-secret-2024';
    
    // Firma simple (en producción usar crypto)
    const signature = btoa(`${header}.${payloadEncoded}.${secret}`);
    
    return `${header}.${payloadEncoded}.${signature}`;
  }

  /**
   * 🔍 Verificar token de sesión
   */
  verifySessionToken(token: string): {
    valid: boolean;
    email?: string;
    expired?: boolean;
  } {
    try {
      const [header, payload, signature] = token.split('.');
      const payloadData = JSON.parse(atob(payload));
      
      // Verificar expiración
      if (Date.now() > payloadData.expiresAt) {
        return { valid: false, expired: true };
      }

      // Verificar email autorizado
      if (payloadData.email !== this.AUTHORIZED_EMAIL) {
        return { valid: false };
      }

      return {
        valid: true,
        email: payloadData.email
      };
    } catch (error) {
      return { valid: false };
    }
  }

  /**
   * 🧹 Limpiar OTPs expirados (llamar periódicamente)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [email, otpData] of this.otpStorage.entries()) {
      if (now > otpData.expiresAt) {
        this.otpStorage.delete(email);
      }
    }
  }

  /**
   * 📊 Estadísticas del servicio OTP (para debugging)
   */
  getStats() {
    return {
      activeOTPs: this.otpStorage.size,
      authorizedEmail: this.AUTHORIZED_EMAIL,
      expiryMinutes: this.OTP_EXPIRY_MINUTES,
      maxAttempts: this.MAX_ATTEMPTS
    };
  }
}

// 🌟 Instancia singleton
export const otpService = new OTPService();

// 🔄 Cleanup automático cada 5 minutos
if (typeof window !== 'undefined') {
  setInterval(() => {
    otpService.cleanup();
  }, 5 * 60 * 1000);
}

// 📤 Tipos para TypeScript
export type { OTPData };