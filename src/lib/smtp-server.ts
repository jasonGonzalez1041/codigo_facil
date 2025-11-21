// src/lib/smtp-server.ts - Servidor SMTP local 100% self-hosted
import { createTransport, Transporter } from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  headers?: Record<string, string>;
  attachments?: Array<{
    filename: string;
    path: string;
    contentType?: string;
  }>;
}

class LocalSMTPServer {
  private transporter: Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    try {
      // Configuración SMTP basada en variables de entorno
      const smtpConfig = this.getSMTPConfig();
      
      this.transporter = createTransport(smtpConfig);

      console.log('✅ Servidor SMTP inicializado correctamente:', {
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        service: smtpConfig.service || 'custom'
      });
    } catch (error) {
      console.error('❌ Error inicializando servidor SMTP:', error);
      
      // Fallback para desarrollo - usar MailHog local
      this.transporter = createTransport({
        host: 'localhost',
        port: 1025,
        secure: false,
        ignoreTLS: true,
        auth: undefined
      });
      
      console.log('⚠️  Usando MailHog local como fallback');
    }
  }

  private getSMTPConfig() {
    // 1. Gmail SMTP con App Password
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      return {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      };
    }
    
    // 2. Servidor SMTP personalizado (ej: Postal, Mailcow, Postfix)
    if (process.env.SMTP_HOST) {
      return {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
        auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        } : undefined,
        // Para servidores self-hosted que pueden tener certificados auto-firmados
        tls: {
          rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
        }
      };
    }
    
    // 3. Desarrollo local - MailHog
    if (process.env.NODE_ENV === 'development') {
      return {
        host: 'localhost',
        port: 1025,
        secure: false,
        ignoreTLS: true,
        auth: undefined
      };
    }
    
    // 4. Fallback - error si no hay configuración
    throw new Error('No se encontró configuración SMTP válida. Configura GMAIL_USER/GMAIL_APP_PASSWORD o SMTP_HOST en .env');
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.transporter) {
      return { success: false, error: 'Servidor SMTP no inicializado' };
    }

    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@codigofacil.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo,
        headers: options.headers,
        attachments: options.attachments
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      // En desarrollo, mostrar el email en console
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Email enviado (desarrollo):', {
          to: options.to,
          subject: options.subject,
          messageId: info.messageId,
          response: info.response
        });
      }

      return { 
        success: true, 
        messageId: info.messageId 
      };

    } catch (error) {
      console.error('❌ Error enviando email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  async sendLeadMagnetEmail(
    email: string, 
    name: string, 
    phone: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // Importar template HTML hermoso
      const { createLeadMagnetEmailTemplate } = await import('./email-templates');
      
      // Leer el PDF desde el directorio public
      const pdfPath = join(process.cwd(), 'public/pdf/checklist-25-puntos.pdf');
      
      // Generar HTML usando la plantilla hermosa
      const emailHTML = createLeadMagnetEmailTemplate({
        name,
        email,
        phone,
        pdfName: 'Guía-Gratuita-CodigoFacil.pdf',
        whatsappNumber: '+56950225491',
        siteUrl: 'https://codigofacil.com'
      });

      return await this.sendEmail({
        to: email,
        subject: '🎁 Tu Guía Gratuita + Checklist de 25 puntos + Calculadora ROI',
        html: emailHTML,
        attachments: [
          {
            filename: 'Guía-Gratuita-CodigoFacil.pdf',
            path: pdfPath,
            contentType: 'application/pdf'
          }
        ]
      });

    } catch (error) {
      console.error('❌ Error enviando lead magnet email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error procesando email' 
      };
    }
  }

  // Método para verificar que el servidor está funcionando
  async verifyConnection(): Promise<boolean> {
    if (!this.transporter) return false;
    
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('❌ Error verificando conexión SMTP:', error);
      return false;
    }
  }
}

// Singleton para reusar la instancia
let smtpServerInstance: LocalSMTPServer | null = null;

export function getSMTPServer(): LocalSMTPServer {
  if (!smtpServerInstance) {
    smtpServerInstance = new LocalSMTPServer();
  }
  return smtpServerInstance;
}

export type { EmailOptions };