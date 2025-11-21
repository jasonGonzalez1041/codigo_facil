// lib/email-service.ts - Servicio de email 100% self-hosted
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

interface EmailData {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  mensaje?: string;
  tipo?: 'lead_magnet' | 'contact_form';
}

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

class SelfHostedEmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    try {
      // Opción 1: Gmail SMTP (gratuito con app password)
      if (process.env.SMTP_HOST === 'smtp.gmail.com') {
        this.transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER, // tu-email@gmail.com
            pass: process.env.SMTP_PASS, // app password (no tu contraseña normal)
          },
        });
      }
      // Opción 2: Servidor SMTP propio o cualquier otro
      else {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'localhost',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          // Para servidores self-hosted sin certificado SSL válido
          tls: {
            rejectUnauthorized: false
          }
        });
      }

      // Verificar conexión
      await this.transporter.verify();
      console.log('✅ Servidor SMTP conectado correctamente');
    } catch (error) {
      console.error('❌ Error conectando a servidor SMTP:', error);
      throw error;
    }
  }

  private generateEmailTemplates(data: EmailData): {
    admin: EmailTemplate;
    user: EmailTemplate;
  } {
    const isLeadMagnet = data.tipo === 'lead_magnet';
    
    // Template para el administrador
    const adminTemplate: EmailTemplate = {
      subject: isLeadMagnet ? 
        `🎁 Nueva descarga del lead magnet - ${data.nombre}` :
        `📞 Nueva consulta de contacto - ${data.nombre}`,
      
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">
            ${isLeadMagnet ? '🎁 Nueva Descarga de PDF' : '📞 Nueva Consulta'}
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Información del contacto:</h3>
            <p><strong>Nombre:</strong> ${data.nombre}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.telefono ? `<p><strong>Teléfono:</strong> ${data.telefono}</p>` : ''}
            ${data.empresa ? `<p><strong>Empresa:</strong> ${data.empresa}</p>` : ''}
            ${data.mensaje ? `<p><strong>Mensaje:</strong><br>${data.mensaje}</p>` : ''}
          </div>
          
          <div style="background: #dbeafe; padding: 15px; border-radius: 8px;">
            <p style="margin: 0;"><strong>Acción recomendada:</strong></p>
            <p style="margin: 5px 0 0 0;">
              ${isLeadMagnet ? 
                'Contactar en las próximas 24 horas para seguimiento del lead magnet.' :
                'Responder consulta en las próximas 2 horas.'}
            </p>
          </div>
          
          <footer style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px;">
            <p>Email automático de CodigoFacil.com</p>
            <p>Fecha: ${new Date().toLocaleDateString('es-ES')} - ${new Date().toLocaleTimeString('es-ES')}</p>
          </footer>
        </div>
      `,
      
      text: `
        ${isLeadMagnet ? 'Nueva Descarga de PDF' : 'Nueva Consulta'} - ${data.nombre}
        
        Nombre: ${data.nombre}
        Email: ${data.email}
        ${data.telefono ? `Teléfono: ${data.telefono}\n` : ''}
        ${data.empresa ? `Empresa: ${data.empresa}\n` : ''}
        ${data.mensaje ? `Mensaje: ${data.mensaje}\n` : ''}
        
        Fecha: ${new Date().toLocaleString('es-ES')}
      `
    };

    // Template para el usuario
    const userTemplate: EmailTemplate = {
      subject: isLeadMagnet ? 
        '🎁 Tu PDF está listo - Checklist 25 Puntos para Web que Vende' :
        '✅ Hemos recibido tu consulta - CodigoFacil.com',
      
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #2563eb;">
            <h1 style="color: #2563eb; margin: 0;">CodigoFacil.com</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0;">Desarrollo Web Profesional para LATAM</p>
          </div>
          
          <div style="padding: 30px 0;">
            <h2>¡Hola ${data.nombre}! 👋</h2>
            
            ${isLeadMagnet ? `
              <div style="background: #dcfce7; border: 1px solid #16a34a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #16a34a; margin-top: 0;">🎁 Tu descarga está lista</h3>
                <p>Gracias por descargar nuestro <strong>"Checklist de 25 Puntos para una Web que Vende"</strong></p>
                <p>El PDF se adjunta a este email y también puedes descargarlo desde nuestro sitio web.</p>
              </div>
              
              <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>🚀 Oferta Especial:</strong></p>
                <p style="margin: 5px 0 0 0;">
                  Como descargaste nuestro PDF, tienes <strong>30 minutos de consultoría GRATIS</strong>. 
                  ¡Contáctanos por WhatsApp!
                </p>
              </div>
            ` : `
              <div style="background: #dbeafe; border: 1px solid #2563eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2563eb; margin-top: 0;">✅ Consulta Recibida</h3>
                <p>Hemos recibido tu consulta y nos pondremos en contacto contigo en las próximas 2 horas.</p>
              </div>
            `}
            
            <div style="margin: 30px 0;">
              <h3>📞 ¿Tienes alguna pregunta?</h3>
              <p>No dudes en contactarnos:</p>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 10px 0;">
                  📱 <strong>WhatsApp:</strong> 
                  <a href="https://wa.me/56950225491" style="color: #16a34a; text-decoration: none;">
                    +56 9 5022 5491
                  </a>
                </li>
                <li style="margin: 10px 0;">
                  🌐 <strong>Sitio Web:</strong> 
                  <a href="https://codigofacil.com" style="color: #2563eb;">codigofacil.com</a>
                </li>
                <li style="margin: 10px 0;">
                  ✉️ <strong>Email:</strong> hola@codigofacil.com
                </li>
              </ul>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #374151; margin-top: 0;">💼 Nuestros Servicios</h3>
              <p style="margin: 0; color: #6b7280;">
                Desarrollo Web • E-commerce • Aplicaciones • Diseño UI/UX • SEO • Soporte
              </p>
              <p style="margin: 10px 0 0 0; color: #16a34a; font-weight: bold;">
                Planes desde $99 USD • Hosting incluido • Soporte en español
              </p>
            </div>
          </div>
          
          <footer style="border-top: 1px solid #e5e7eb; padding: 20px 0; text-align: center; color: #6b7280; font-size: 12px;">
            <p>© ${new Date().getFullYear()} CodigoFacil.com - Desarrollo Web Profesional para LATAM</p>
            <p>Chile • México • Argentina • Colombia • Perú • Ecuador • Uruguay • Bolivia • Paraguay</p>
          </footer>
        </div>
      `,
      
      text: `
        ¡Hola ${data.nombre}!
        
        ${isLeadMagnet ? 
          'Gracias por descargar nuestro "Checklist de 25 Puntos para una Web que Vende". El PDF se adjunta a este email.' :
          'Hemos recibido tu consulta y nos pondremos en contacto contigo en las próximas 2 horas.'
        }
        
        ¿Tienes alguna pregunta? Contáctanos:
        WhatsApp: +56 9 5022 5491
        Sitio Web: https://codigofacil.com
        Email: hola@codigofacil.com
        
        © ${new Date().getFullYear()} CodigoFacil.com - Desarrollo Web Profesional para LATAM
      `
    };

    return { admin: adminTemplate, user: userTemplate };
  }

  async sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.transporter) {
        await this.initializeTransporter();
      }

      const templates = this.generateEmailTemplates(data);
      const isLeadMagnet = data.tipo === 'lead_magnet';

      // Leer PDF si es lead magnet
      let pdfAttachment = null;
      if (isLeadMagnet) {
        try {
          const pdfPath = path.join(process.cwd(), 'public', 'pdf', 'checklist-25-puntos.pdf');
          const pdfBuffer = await fs.readFile(pdfPath);
          pdfAttachment = {
            filename: 'Checklist-25-Puntos-Web-Que-Vende.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf'
          };
        } catch (pdfError) {
          console.warn('⚠️ No se pudo adjuntar PDF:', pdfError);
        }
      }

      // Envío 1: Notificación al administrador
      await this.transporter!.sendMail({
        from: `"CodigoFacil.com" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: templates.admin.subject,
        text: templates.admin.text,
        html: templates.admin.html,
      });

      // Envío 2: Confirmación al usuario
      const userEmailOptions: any = {
        from: `"CodigoFacil.com" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: data.email,
        subject: templates.user.subject,
        text: templates.user.text,
        html: templates.user.html,
      };

      // Adjuntar PDF solo para lead magnet
      if (pdfAttachment) {
        userEmailOptions.attachments = [pdfAttachment];
      }

      await this.transporter!.sendMail(userEmailOptions);

      console.log(`✅ Emails enviados correctamente a ${data.email}`);
      return { 
        success: true, 
        message: isLeadMagnet ? 
          'PDF enviado por email exitosamente' : 
          'Consulta enviada exitosamente' 
      };

    } catch (error) {
      console.error('❌ Error enviando emails:', error);
      return { 
        success: false, 
        message: `Error al enviar email: ${error instanceof Error ? error.message : 'Error desconocido'}` 
      };
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      if (!this.transporter) {
        await this.initializeTransporter();
      }
      await this.transporter!.verify();
      return true;
    } catch {
      return false;
    }
  }
}

// Singleton para reutilizar la conexión
let emailService: SelfHostedEmailService | null = null;

export function getEmailService(): SelfHostedEmailService {
  if (!emailService) {
    emailService = new SelfHostedEmailService();
  }
  return emailService;
}

export type { EmailData };