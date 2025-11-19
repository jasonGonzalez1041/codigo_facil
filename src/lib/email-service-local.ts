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