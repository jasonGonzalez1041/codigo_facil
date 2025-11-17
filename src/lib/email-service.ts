import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Configuración SMTP - Gmail con App Password (Recomendado para producción)
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // tu-email@gmail.com
      pass: process.env.SMTP_PASSWORD, // App Password generado en Gmail
    },
  });

  // 🚀 ALTERNATIVA: Servidor SMTP propio (para VPS)
  // return nodemailer.createTransporter({
  //   host: process.env.SMTP_HOST, // tu-servidor.com o localhost
  //   port: parseInt(process.env.SMTP_PORT || '587'),
  //   secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // });
};

export interface EmailData {
  name: string;
  email: string;
  phone?: string;
}

export const sendWelcomeEmail = async (data: EmailData) => {
  const transporter = createTransporter();
  
  // Verificar conexión SMTP
  try {
    await transporter.verify();
    console.log('✅ SMTP conexión exitosa');
  } catch (error) {
    console.error('❌ Error SMTP:', error);
    throw new Error('Error de configuración SMTP');
  }

  // Leer el archivo PDF
  const pdfPath = path.join(process.cwd(), 'public', 'pdf', 'checklist-25-puntos.pdf');
  let pdfBuffer: Buffer;
  
  try {
    pdfBuffer = fs.readFileSync(pdfPath);
  } catch (error) {
    console.error('❌ Error leyendo PDF:', error);
    throw new Error('No se pudo leer el archivo PDF');
  }

  // Template HTML del email
  const htmlTemplate = createEmailTemplate(data);

  const mailOptions = {
    from: `"CodigoFacil.com 🚀" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: '🎁 Tu Guía Gratuita + Checklist de 25 puntos + Calculadora ROI',
    html: htmlTemplate,
    attachments: [
      {
        filename: 'Checklist-25-Puntos-Web-Que-Vende.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf',
      }
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw error;
  }
};

// Envío de notificación interna
export const sendInternalNotification = async (data: EmailData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"Sistema CodigoFacil" <${process.env.SMTP_USER}>`,
    to: process.env.INTERNAL_EMAIL || process.env.SMTP_USER, // Email interno para notificaciones
    subject: `🔔 Nuevo Lead: ${data.name} descargó el PDF`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9;">🎯 Nuevo Lead Capturado</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
          <p><strong>Recurso:</strong> Checklist 25 Puntos + Calculadora ROI</p>
        </div>
        <p style="color: #64748b;">Contactar dentro de las próximas 24 horas para máxima conversión.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Notificación interna enviada');
  } catch (error) {
    console.error('⚠️ Error notificación interna:', error);
    // No lanzar error para que no afecte al flujo principal
  }
};

// Template HTML hermoso para el email
const createEmailTemplate = (data: EmailData) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Guía Gratuita - CodigoFacil.com</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; max-width: 600px; width: 100%;">
                    
                    <!-- Header con Gradiente -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                                🎉 ¡Tu Guía Ya Está Aquí!
                            </h1>
                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">
                                Checklist + Calculadora ROI para tu sitio web
                            </p>
                        </td>
                    </tr>

                    <!-- Saludo Personalizado -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="color: #1e293b; margin: 0 0 20px; font-size: 24px;">
                                ¡Hola ${data.name}! 👋
                            </h2>
                            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                                Gracias por confiar en <strong>CodigoFacil.com</strong>. Te hemos preparado una guía completa que transformará tu sitio web en una máquina de ventas.
                            </p>
                        </td>
                    </tr>

                    <!-- Contenido Principal -->
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <div style="background: #f1f5f9; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                                <h3 style="color: #0ea5e9; margin: 0 0 15px; font-size: 20px;">
                                    📋 Lo que recibes hoy:
                                </h3>
                                <ul style="color: #475569; margin: 0; padding-left: 20px; line-height: 1.8;">
                                    <li><strong>Checklist de 25 puntos</strong> para optimizar tu sitio web</li>
                                    <li><strong>Calculadora de ROI</strong> para medir tu inversión</li>
                                    <li><strong>Estrategias probadas</strong> que aumentan conversiones</li>
                                    <li><strong>Tips exclusivos</strong> de diseño y usabilidad</li>
                                </ul>
                            </div>

                            <!-- Botón de Descarga Principal -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://codigofacil.com/pdf/checklist-25-puntos.pdf" 
                                           style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); 
                                                  color: white; 
                                                  text-decoration: none; 
                                                  padding: 18px 40px; 
                                                  border-radius: 12px; 
                                                  font-weight: bold; 
                                                  font-size: 18px; 
                                                  display: inline-block; 
                                                  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);">
                                            📥 Descargar PDF Ahora
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Oferta Especial -->
                            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 5px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <h4 style="color: #92400e; margin: 0 0 10px; font-size: 18px;">
                                    🚀 ¡Oferta Especial Solo para Ti!
                                </h4>
                                <p style="color: #92400e; margin: 0; font-size: 15px; line-height: 1.5;">
                                    Como eres uno de nuestros primeros <strong>1,247+ usuarios</strong>, te regalamos <strong>30 minutos de consultoría gratuita</strong> para revisar tu sitio web actual.
                                </p>
                            </div>

                            <!-- Siguiente Paso -->
                            <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; margin-top: 25px;">
                                <h4 style="color: #065f46; margin: 0 0 10px; font-size: 16px;">
                                    ✅ Próximo Paso:
                                </h4>
                                <p style="color: #047857; margin: 0; font-size: 14px;">
                                    Revisa el checklist, aplica los primeros 5 puntos y contáctanos para tu consultoría gratuita. ¡Estamos aquí para ayudarte a crecer!
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="color: #64748b; margin: 0 0 15px; font-size: 16px; font-weight: bold;">
                                ¿Necesitas ayuda? Estamos a un WhatsApp de distancia
                            </p>
                            <a href="https://wa.me/56950225491?text=Hola! Descargué la guía y me gustaría la consultoría gratis" 
                               style="background: #25d366; color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: bold; display: inline-block; margin-bottom: 20px;">
                                💬 WhatsApp: +56 9 5022 5491
                            </a>
                            
                            <div style="border-top: 1px solid #e2e8f0; margin: 20px 0; padding-top: 20px;">
                                <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                                    <strong>CodigoFacil.com</strong> - Desarrollo Web para LATAM<br>
                                    Transformamos ideas en sitios web que venden
                                </p>
                                <p style="color: #cbd5e1; margin: 10px 0 0; font-size: 12px;">
                                    No spam, solo contenido de valor. Puedes darte de baja cuando gustes.
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};