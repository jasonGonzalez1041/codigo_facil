// src/lib/email-service-local.ts - Servicio de email 100% self-hosted
import { getSMTPServer } from './smtp-server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

interface LeadData {
  name: string;
  email: string;
  phone: string;
  timestamp?: Date;
  source?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  message?: string;
  error?: string;
  leadSaved?: boolean;
}

class LocalEmailService {
  private leadsFilePath: string;

  constructor() {
    // Archivo para guardar leads localmente
    this.leadsFilePath = join(process.cwd(), 'data/leads.json');
    this.ensureLeadsFile();
  }

  private ensureLeadsFile(): void {
    try {
      readFileSync(this.leadsFilePath);
    } catch {
      // Si no existe, crear el directorio y archivo
      const { mkdirSync } = require('fs');
      const { dirname } = require('path');
      
      try {
        mkdirSync(dirname(this.leadsFilePath), { recursive: true });
        writeFileSync(this.leadsFilePath, JSON.stringify([], null, 2));
        console.log('✅ Archivo de leads creado en:', this.leadsFilePath);
      } catch (error) {
        console.error('❌ Error creando archivo de leads:', error);
      }
    }
  }

  private async saveNewLead(leadData: LeadData): Promise<boolean> {
    return this.saveLeadLocally(leadData);
  }

  private async saveLeadLocally(leadData: LeadData): Promise<boolean> {
    try {
      let leads: LeadData[] = [];
      
      try {
        const existingData = readFileSync(this.leadsFilePath, 'utf8');
        leads = JSON.parse(existingData);
      } catch {
        leads = [];
      }

      // Verificar si el email ya existe
      const existingLead = leads.find(lead => lead.email === leadData.email);
      if (existingLead) {
        console.log(`📧 Lead ya existe: ${leadData.email}`);
        return true; // No es error, simplemente ya existe
      }

      // Agregar timestamp si no existe
      const newLead: LeadData = {
        ...leadData,
        timestamp: leadData.timestamp || new Date(),
        source: leadData.source || 'lead-magnet-checklist'
      };

      leads.push(newLead);
      writeFileSync(this.leadsFilePath, JSON.stringify(leads, null, 2));
      
      console.log(`✅ Lead guardado: ${leadData.name} (${leadData.email})`);
      return true;

    } catch (error) {
      console.error('❌ Error guardando lead:', error);
      return false;
    }
  }

  async sendLeadMagnet(leadData: LeadData): Promise<EmailResult> {
    const smtpServer = getSMTPServer();
    
    try {
      // 1. Guardar lead localmente
      const leadSaved = await this.saveLeadLocally(leadData);
      
      // 2. Enviar email con PDF al usuario
      const emailResult = await smtpServer.sendLeadMagnetEmail(
        leadData.email,
        leadData.name,
        leadData.phone
      );

      // 3. Enviar notificación interna a vecipremiun@gmail.com (no bloquea si falla)
      try {
        const notificationResult = await this.sendInternalNotification(leadData);
        if (notificationResult.success) {
          console.log('📧 Notificación interna enviada exitosamente a vecipremiun@gmail.com');
        } else {
          console.warn('⚠️ Falló notificación interna:', notificationResult.error);
        }
      } catch (notificationError) {
        console.warn('⚠️ Error en notificación interna (continuando):', notificationError);
      }

      // 4. Log para desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Resumen del envío:', {
          lead: `${leadData.name} <${leadData.email}>`,
          phone: leadData.phone,
          emailSent: emailResult.success,
          leadSaved: leadSaved,
          messageId: emailResult.messageId
        });
      }

      return {
        success: emailResult.success,
        messageId: emailResult.messageId,
        error: emailResult.error,
        leadSaved: leadSaved
      };

    } catch (error) {
      console.error('❌ Error en servicio de email local:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        leadSaved: false
      };
    }
  }

  async getLeadsCount(): Promise<number> {
    try {
      const data = readFileSync(this.leadsFilePath, 'utf8');
      const leads: LeadData[] = JSON.parse(data);
      return leads.length;
    } catch {
      return 0;
    }
  }

  async getLeads(limit?: number): Promise<LeadData[]> {
    try {
      const data = readFileSync(this.leadsFilePath, 'utf8');
      const leads: LeadData[] = JSON.parse(data);
      
      // Ordenar por timestamp más reciente
      const sortedLeads = leads.sort((a, b) => {
        const dateA = new Date(a.timestamp || 0);
        const dateB = new Date(b.timestamp || 0);
        return dateB.getTime() - dateA.getTime();
      });

      return limit ? sortedLeads.slice(0, limit) : sortedLeads;

    } catch (error) {
      console.error('❌ Error leyendo leads:', error);
      return [];
    }
  }

  // Método para verificar estado del servicio
  async getServiceStatus(): Promise<{
    smtpReady: boolean;
    leadsFileExists: boolean;
    totalLeads: number;
  }> {
    const smtpServer = getSMTPServer();
    const smtpReady = await smtpServer.verifyConnection();
    const totalLeads = await this.getLeadsCount();
    
    let leadsFileExists = false;
    try {
      readFileSync(this.leadsFilePath);
      leadsFileExists = true;
    } catch {
      leadsFileExists = false;
    }

    return {
      smtpReady,
      leadsFileExists,
      totalLeads
    };
  }

  // Método para enviar notificaciones internas
  async sendInternalNotification(leadData: LeadData): Promise<EmailResult> {
    const smtpServer = getSMTPServer();
    
    try {
      // Importar template de notificación interna
      const { createInternalNotificationTemplate } = await import('./email-templates');
      
      // Generar HTML usando la plantilla de notificación
      const emailHTML = createInternalNotificationTemplate({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || 'No proporcionado'
      });

      // Enviar notificación a vecipremiun@gmail.com
      const result = await smtpServer.sendEmail({
        to: 'vecipremiun@gmail.com',
        subject: `🎯 Nuevo Lead: ${leadData.name} - CodigoFacil.com`,
        html: emailHTML
      });

      return result;

    } catch (error) {
      console.error('❌ Error enviando notificación interna:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error en notificación interna'
      };
    }
  }

  // Método para enviar formulario de contacto
  async sendContactForm(data: LeadData & { message?: string }): Promise<EmailResult> {
    try {
      console.log('📧 Enviando formulario de contacto para:', data.email);

      // Template para formulario de contacto
      const contactTemplate = this.createContactFormTemplate({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message || 'Sin mensaje adicional',
        timestamp: data.timestamp || new Date()
      });

      const smtpServer = getSMTPServer();

      // Crear email de respuesta personalizado para WhatsApp
      const whatsappClean = data.phone.replace(/[^\d]/g, '');
      const clientResponseEmail = `cliente-${whatsappClean}@codigofacil.com`;

      const result = await smtpServer.sendEmail({
        to: 'vecipremiun@gmail.com',
        subject: `📞 Nuevo Contacto: ${data.name} - WhatsApp: ${data.phone}`,
        html: contactTemplate,
        replyTo: clientResponseEmail,  // Email que redirecciona al WhatsApp
        headers: {
          'X-Client-WhatsApp': data.phone,
          'X-Client-Name': data.name,
          'X-Response-Type': 'whatsapp-redirect'
        }
      });

      if (result.success) {
        console.log('✅ Formulario de contacto enviado:', result.messageId);
        
        // Guardar contacto en leads (sin PDF)
        await this.saveLeadLocally({
          ...data,
          source: 'contact_form'
        });
      }

      return {
        success: result.success,
        messageId: result.messageId,
        message: 'Formulario de contacto enviado correctamente',
        leadSaved: result.success,
        error: result.error
      };

    } catch (error) {
      console.error('❌ Error enviando formulario de contacto:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        leadSaved: false
      };
    }
  }

  private createContactFormTemplate(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    timestamp: Date;
  }): string {
    // Crear email de respuesta que redirija al WhatsApp del cliente
    const whatsappClean = data.phone.replace(/[^\d]/g, '');
    const clientResponseEmail = `cliente-${whatsappClean}@codigofacil.com`;
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <!-- HEADER CON INSTRUCCIÓN DE RESPUESTA -->
          <div style="background: #dcfce7; border: 2px solid #22c55e; padding: 20px; border-radius: 10px; margin-bottom: 25px; text-align: center;">
            <h2 style="color: #15803d; margin: 0 0 10px 0; font-size: 18px;">
              🔔 RESPUESTA AUTOMÁTICA HABILITADA
            </h2>
            <p style="color: #166534; margin: 0; font-weight: bold; font-size: 15px;">
              Para responder al cliente: Haz clic en "RESPONDER" en tu email
            </p>
            <p style="color: #15803d; margin: 8px 0 0 0; font-size: 13px;">
              Tu respuesta llegará automáticamente al WhatsApp: <strong>${data.phone}</strong>
            </p>
          </div>
          
          <h2 style="color: #0ea5e9; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            📞 Nuevo Contacto - CodigoFacil.com
          </h2>
          
          <div style="background: #f1f5f9; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #334155; margin: 0 0 20px 0; font-size: 16px;">👤 Información del Cliente:</h3>
            <table style="width: 100%; border-spacing: 0;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 120px;">Nombre:</td>
                <td style="padding: 10px 0 10px 15px; font-size: 16px; color: #1f2937;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">WhatsApp:</td>
                <td style="padding: 10px 0 10px 15px;">
                  <span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 15px;">
                    ${data.phone}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">Email Respuesta:</td>
                <td style="padding: 10px 0 10px 15px;">
                  <span style="background: #e0f2fe; color: #0c4a6e; padding: 6px 10px; border-radius: 4px; font-family: monospace; font-size: 11px;">
                    ${clientResponseEmail}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">Fecha:</td>
                <td style="padding: 10px 0 10px 15px; color: #64748b;">
                  ${data.timestamp.toLocaleString('es-ES', { 
                    timeZone: 'America/Santiago',
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
              </tr>
            </table>
          </div>

          <div style="background: #fef7cd; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px;">💬 Mensaje del Cliente:</h3>
            <div style="color: #451a03; line-height: 1.6; margin: 0; white-space: pre-wrap; background: white; padding: 20px; border-radius: 8px; border: 1px solid #fbbf24; font-size: 15px; font-style: italic;">
"${data.message}"</div>
          </div>

          <!-- SECCIÓN DE RESPUESTA PRINCIPAL -->
          <div style="background: #f0fdf4; border: 3px solid #22c55e; padding: 30px; border-radius: 12px; margin: 30px 0;">
            <h3 style="color: #15803d; margin: 0 0 20px 0; text-align: center; font-size: 18px;">
              📧 RESPONDER AL CLIENTE
            </h3>
            
            <div style="background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border: 1px solid #bbf7d0;">
              <h4 style="color: #166534; margin: 0 0 15px 0; font-size: 16px;">✅ MÉTODO RECOMENDADO - Respuesta Directa:</h4>
              <p style="color: #15803d; margin: 0 0 15px 0; font-size: 14px; line-height: 1.5;">
                <strong>1.</strong> Haz clic en <strong>"RESPONDER"</strong> en tu cliente de email<br>
                <strong>2.</strong> Escribe tu mensaje normalmente<br>
                <strong>3.</strong> Envía - llegará automáticamente al WhatsApp del cliente
              </p>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="mailto:${clientResponseEmail}?subject=Re: Tu consulta desde CodigoFacil.com&body=Hola ${encodeURIComponent(data.name)}!%0D%0A%0D%0AGracias por contactarnos desde CodigoFacil.com.%0D%0A%0D%0AHe recibido tu mensaje:%0D%0A"${data.message}"%0D%0A%0D%0A[Escribe tu respuesta aquí]%0D%0A%0D%0ASaludos,%0D%0AEquipo CodigoFacil%0D%0A%0D%0A---%0D%0AWhatsApp: +50672904200%0D%0Awww.codigofacil.com" 
                   style="background: #16a34a; color: white; padding: 18px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  📧 RESPONDER AHORA
                </a>
              </div>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #bbf7d0;">
              <h4 style="color: #166534; margin: 0 0 10px 0;">💚 Alternativa - WhatsApp Directo:</h4>
              <div style="text-align: center; margin: 15px 0;">
                <a href="https://wa.me/${whatsappClean}?text=Hola%20${encodeURIComponent(data.name)}!%20👋%0D%0A%0D%0AGracias%20por%20contactarnos%20desde%20CodigoFacil.com.%0D%0A%0D%0AHe%20recibido%20tu%20mensaje%20y%20te%20ayudaré%20con%20tu%20consulta.%0D%0A%0D%0A¿En%20qué%20puedo%20ayudarte%20específicamente?" 
                   style="background: #25d366; color: white; padding: 15px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 14px;">
                  📱 Abrir WhatsApp: ${data.phone}
                </a>
              </div>
            </div>
          </div>

          <!-- PLANTILLA DE RESPUESTA -->
          <div style="background: #fef3c7; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin: 0 0 15px 0;">📝 Plantilla de Respuesta Sugerida:</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #fbbf24; font-family: 'Courier New', monospace; font-size: 13px; color: #451a03; line-height: 1.5;">
Hola ${data.name}! 👋

Gracias por contactarnos desde CodigoFacil.com.

He recibido tu mensaje:
"${data.message}"

[Aquí escribes tu respuesta personalizada]

¿Te gustaría agendar una llamada para revisar tu proyecto en detalle?

Saludos,
Equipo CodigoFacil.com
📱 WhatsApp: +50672904200
🌐 www.codigofacil.com
            </div>
          </div>

          <hr style="border: none; border-top: 2px solid #e2e8f0; margin: 30px 0;">
          
          <div style="text-align: center; color: #64748b; font-size: 14px;">
            <p style="margin: 5px 0; font-weight: bold;">🌟 CodigoFacil.com - Sistema de Contacto Automático</p>
            <p style="margin: 5px 0;">📧 Email configurado para respuesta directa al WhatsApp del cliente</p>
            <p style="margin: 5px 0;">📱 WhatsApp Empresa: +50672904200 | 🌐 www.codigofacil.com</p>
          </div>
        </div>
      </div>
    `;
  }

  // Método para testing - enviar email de prueba
  async sendTestEmail(toEmail: string): Promise<EmailResult> {
    const smtpServer = getSMTPServer();
    
    try {
      const testResult = await smtpServer.sendEmail({
        to: toEmail,
        subject: '🧪 Test Email - CodigoFacil.com Local SMTP',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #0ea5e9;">✅ Servidor SMTP Local Funcionando</h2>
            <p>Este es un email de prueba del servidor SMTP local de CodigoFacil.com.</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Entorno:</strong> ${process.env.NODE_ENV || 'unknown'}</p>
            <p>Si recibes este email, el sistema está funcionando correctamente.</p>
            <hr>
            <p style="color: #64748b; font-size: 14px;">
              CodigoFacil.com - Sistema de Email Self-Hosted
            </p>
          </div>
        `
      });

      return testResult;

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error en test email'
      };
    }
  }
}

// Singleton para reusar la instancia
let emailServiceInstance: LocalEmailService | null = null;

export function getLocalEmailService(): LocalEmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new LocalEmailService();
  }
  return emailServiceInstance;
}

export type { LeadData, EmailResult };