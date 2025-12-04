// src/lib/email-templates.ts - Plantillas HTML hermosas para emails

interface EmailTemplateData {
  name: string;
  email?: string;
  phone?: string;
  pdfName?: string;
  whatsappNumber?: string;
  siteUrl?: string;
}

export function createLeadMagnetEmailTemplate(data: EmailTemplateData): string {
  const {
    name,
    email,
    phone,
    pdfName = 'Checklist-25-Puntos-Web-Que-Vende.pdf',
    whatsappNumber = '+50672904200',
    siteUrl = 'https://codigofacil.com'
  } = data;

  // WhatsApp message personalizado
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Soy ${name}, descargué el checklist y me interesa la consulta gratuita de 30 minutos. Mi email es ${email} y mi teléfono ${phone || 'por confirmar'}.`
  );

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Tu Checklist está listo! - CodigoFacil.com</title>
  <style>
    /* Reset y compatibilidad */
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; background-color: #f8fafc; }
    table { border-collapse: collapse; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 16px !important; padding-right: 16px !important; }
      .mobile-text-center { text-align: center !important; }
      .mobile-block { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; background-color: #f8fafc;">

  <!-- Preheader -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Tu checklist de 25 puntos + consulta gratuita te están esperando 🎯
  </div>

  <!-- Main Container -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; padding: 20px 0;">
    <tr>
      <td align="center">
        
        <!-- Email Container -->
        <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header Premium -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #0ea5e9 50%, #06b6d4 75%, #0891b2 100%); padding: 0; position: relative; border-radius: 12px 12px 0 0;">
              <!-- Background Pattern -->
              <div style="background-image: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><pattern id="polka-dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="2"/></pattern><rect width="100%" height="100%" fill="url(%23polka-dots)"/></g></g></svg>'); padding: 50px 30px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <!-- Premium Logo -->
                      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; padding: 20px 40px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">
                        <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0; text-shadow: 0 2px 10px rgba(0,0,0,0.3); letter-spacing: -0.5px; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                          💻 <span style="background: linear-gradient(45deg, #ffffff, #e0f2fe); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">CodigoFacil</span><span style="color: #fbbf24; font-weight: 900;">.com</span>
                        </h1>
                        <div style="height: 3px; background: linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24); border-radius: 2px; margin-top: 8px; opacity: 0.9;"></div>
                      </div>
                      
                      <!-- Success Message Premium -->
                      <div style="text-align: center; margin-bottom: 12px;">
                        <div style="display: inline-block; background: rgba(34, 197, 94, 0.9); color: #ffffff; padding: 8px 24px; border-radius: 25px; font-size: 14px; font-weight: 600; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
                          ✅ DESCARGA EXITOSA
                        </div>
                      </div>
                      
                      <h2 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; text-shadow: 0 2px 8px rgba(0,0,0,0.3); line-height: 1.2;">
                        ¡Gracias <span style="color: #fbbf24;">${name}</span>! 🎉
                      </h2>
                      <p style="color: #e0f2fe; font-size: 18px; margin: 0 0 16px 0; text-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                        Tu Guía Premium está lista para descargar
                      </p>
                      
                      <!-- Value Proposition -->
                      <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 16px 24px; margin-top: 20px; border: 1px solid rgba(255,255,255,0.2);">
                        <p style="color: #bae6fd; font-size: 16px; margin: 0 0 8px 0; font-weight: 500;">
                          <span style="color: #fbbf24;">📊 Valor:</span> $297 USD • <span style="color: #34d399;">🎁 Tu precio:</span> GRATIS
                        </p>
                        <!-- Oferta Especial -->
                        <div style="background: rgba(251, 191, 36, 0.2); border-radius: 8px; padding: 8px 12px; margin-top: 8px; border: 1px solid rgba(251, 191, 36, 0.3);">
                          <p style="color: #fbbf24; font-size: 13px; margin: 0; font-weight: 600; text-align: center;">
                            🚨 <strong>OFERTA ESPECIAL:</strong> Los primeros 10 que descarguen recibirán 30min de consultoría GRATIS
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="mobile-padding" style="padding: 40px 30px;">
              
              <!-- Welcome Message -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <h3 style="color: #1f2937; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;">
                      Hola <span style="color: #0ea5e9;">${name}</span> 👋
                    </h3>
                    <p style="color: #4b5563; font-size: 16px; margin: 0 0 24px 0;">
                      ¡Excelente decisión! Acabas de dar el primer paso para crear un sitio web que realmente <strong>convierte visitantes en clientes</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- PDF Download Section Premium -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; border: 3px solid transparent; background-clip: padding-box; margin: 32px 0; position: relative; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 0;">
                    <!-- Premium Border Gradient -->
                    <div style="background: linear-gradient(135deg, #3b82f6, #0ea5e9, #06b6d4, #10b981); padding: 3px; border-radius: 16px;">
                      <div style="background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); border-radius: 13px; padding: 32px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td align="center">
                              <!-- Premium PDF Icon -->
                              <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; width: 80px; height: 80px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3); position: relative;">
                                <div style="font-size: 36px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">📄</div>
                                <div style="position: absolute; top: -8px; right: -8px; background: linear-gradient(135deg, #10b981, #059669); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);">✓</div>
                              </div>
                              
                              <div style="background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                                <h3 style="font-size: 22px; font-weight: 800; margin: 0 0 8px 0; text-align: center;">
                                  🎯 Tu Guía Premium Adjunta
                                </h3>
                              </div>
                              
                              <div style="background: rgba(59, 130, 246, 0.1); border-radius: 12px; padding: 16px 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
                                <p style="color: #1e40af; font-size: 16px; margin: 0; font-weight: 600; line-height: 1.5;">
                                  📎 <strong>"${pdfName}"</strong>
                                </p>
                                <p style="color: #475569; font-size: 14px; margin: 8px 0 0 0;">
                                  Archivo adjunto en este email • Descarga directa
                                </p>
                              </div>
                              
                              <!-- Premium Features -->
                              <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
                                <div style="text-align: center; min-width: 80px;">
                                  <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto; font-size: 18px;">📋</div>
                                  <div style="color: #374151; font-size: 12px; font-weight: 600;">25 Puntos</div>
                                </div>
                                <div style="text-align: center; min-width: 80px;">
                                  <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto; font-size: 18px;">🧮</div>
                                  <div style="color: #374151; font-size: 12px; font-weight: 600;">Calculadora</div>
                                </div>
                                <div style="text-align: center; min-width: 80px;">
                                  <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto; font-size: 18px;">📈</div>
                                  <div style="color: #374151; font-size: 12px; font-weight: 600;">ROI</div>
                                </div>
                              </div>
                              
                              <!-- Botón Grande de Descarga Alternativa -->
                              <div style="margin-top: 32px; text-align: center;">
                                <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px 0;">
                                  ¿No puedes ver el adjunto? 👇
                                </p>
                                
                                <!-- Botón Premium de Descarga -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                                  <tr>
                                    <td style="background: linear-gradient(135deg, #dc2626, #b91c1c); border-radius: 16px; box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4); position: relative;">
                                      <a href="${siteUrl}/pdf/checklist-25-puntos.pdf" 
                                         target="_blank"
                                         style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border: none; border-radius: 16px; color: #ffffff; display: inline-block; font-family: 'Inter', 'Segoe UI', sans-serif; font-size: 18px; font-weight: 800; line-height: 1.2; padding: 20px 40px; text-decoration: none; text-align: center; transition: all 0.3s ease; position: relative; min-width: 280px;">
                                        <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                                          <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 16px;">📥</div>
                                          <div style="text-align: left;">
                                            <div style="font-size: 18px; font-weight: 800; margin: 0;">DESCARGAR PDF</div>
                                            <div style="font-size: 13px; font-weight: 500; opacity: 0.9;">Descarga directa desde web</div>
                                          </div>
                                        </div>
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                                
                                <!-- Información adicional -->
                                <div style="background: rgba(220, 38, 38, 0.1); border-radius: 10px; padding: 12px 16px; margin-top: 16px; border-left: 3px solid #dc2626;">
                                  <p style="color: #7f1d1d; font-size: 13px; margin: 0; line-height: 1.4;">
                                    💡 <strong>Tip:</strong> Guarda este enlace para acceder a tu guía en cualquier momento
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Checklist Benefits -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                <tr>
                  <td>
                    <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                      🎯 ¿Qué encontrarás en tu Guía Gratuita?
                    </h3>
                    
                    <!-- Benefit 1 -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 12px;">
                      <tr>
                        <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                          <div style="width: 20px; height: 20px; background-color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 12px; font-weight: 600;">✓</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="color: #4b5563; font-size: 15px; margin: 0; line-height: 1.5;">
                            <strong>Checklist de 25 puntos</strong> para sitios web que convierten realmente
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Benefit 2 -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 12px;">
                      <tr>
                        <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                          <div style="width: 20px; height: 20px; background-color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 12px; font-weight: 600;">✓</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="color: #4b5563; font-size: 15px; margin: 0; line-height: 1.5;">
                            <strong>Calculadora ROI</strong> para medir el retorno de inversión de tu web
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Benefit 3 -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 12px;">
                      <tr>
                        <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                          <div style="width: 20px; height: 20px; background-color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 12px; font-weight: 600;">✓</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="color: #4b5563; font-size: 15px; margin: 0; line-height: 1.5;">
                            <strong>Estrategias probadas</strong> que aumentan conversión hasta 300%
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Benefit 4 -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 12px;">
                      <tr>
                        <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                          <div style="width: 20px; height: 20px; background-color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 12px; font-weight: 600;">✓</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="color: #4b5563; font-size: 15px; margin: 0; line-height: 1.5;">
                            <strong>Implementación práctica</strong> validada en +100 proyectos LATAM
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Bonus Section Premium -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0;">
                <tr>
                  <td style="padding: 0;">
                    <!-- Premium Golden Border -->
                    <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706, #fbbf24); padding: 4px; border-radius: 20px; box-shadow: 0 12px 30px rgba(251, 191, 36, 0.3);">
                      <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fed7aa 100%); border-radius: 16px; padding: 0; position: relative; overflow: hidden;">
                        <!-- Premium Pattern Background -->
                        <div style="background-image: url('data:image/svg+xml,<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="stars" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><polygon fill="%23fbbf24" fill-opacity="0.08" points="20,5 25,15 35,15 27,23 30,33 20,27 10,33 13,23 5,15 15,15"/></pattern></defs><rect width="100%" height="100%" fill="url(%23stars)"/></svg>'); padding: 40px 32px;">
                          
                          <!-- Exclusive Badge -->
                          <div style="text-align: center; margin-bottom: 24px;">
                            <div style="display: inline-block; background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 8px 20px; border-radius: 25px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4); margin-bottom: 16px;">
                              🏆 EXCLUSIVO
                            </div>
                          </div>
                          
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td align="center">
                                <!-- Premium Gift Icon -->
                                <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto; box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4); position: relative;">
                                  <div style="font-size: 48px; text-shadow: 0 2px 8px rgba(0,0,0,0.2);">🎁</div>
                                  <!-- Sparkle Animation -->
                                  <div style="position: absolute; top: 10px; right: 15px; font-size: 20px; animation: sparkle 2s infinite;">✨</div>
                                  <div style="position: absolute; bottom: 15px; left: 10px; font-size: 16px; animation: sparkle 2s infinite 0.5s;">⭐</div>
                                </div>
                                
                                <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                                  <h3 style="font-size: 28px; font-weight: 900; margin: 0 0 8px 0; text-align: center; line-height: 1.2;">
                                    ¡BONUS EXCLUSIVO!
                                  </h3>
                                </div>
                                
                                <div style="background: rgba(220, 38, 38, 0.1); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #fbbf24;">
                                  <!-- Urgency Badge -->
                                  <div style="text-align: center; margin-bottom: 16px;">
                                    <div style="display: inline-block; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 6px 16px; border-radius: 25px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; animation: pulse 2s infinite; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);">
                                      ⏰ SOLO PRIMEROS 10
                                    </div>
                                  </div>
                                  
                                  <h4 style="color: #92400e; font-size: 24px; font-weight: 800; margin: 0 0 12px 0; text-align: center;">
                                    Consultoría GRATUITA
                                  </h4>
                                  <div style="text-align: center; margin-bottom: 16px;">
                                    <span style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 4px 16px; border-radius: 20px; font-size: 18px; font-weight: 700;">
                                      30 MINUTOS
                                    </span>
                                  </div>
                                  <p style="color: #a16207; font-size: 16px; margin: 0 0 12px 0; line-height: 1.6; text-align: center;">
                                    Análisis <strong>personalizado</strong> de tu proyecto + recomendaciones específicas + estrategia de implementación
                                  </p>
                                  
                                  <!-- Special Offer Notice -->
                                  <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 12px; margin-top: 12px; border: 2px dashed #ef4444;">
                                    <p style="color: #7f1d1d; font-size: 14px; margin: 0; text-align: center; font-weight: 600;">
                                      🎯 <strong>¡Oferta limitada!</strong> Como descargaste la guía, calificas para esta consultoría exclusiva
                                    </p>
                                  </div>
                                </div>
                                
                                <!-- Value Proposition -->
                                <div style="background: rgba(34, 197, 94, 0.1); border-radius: 12px; padding: 16px; margin: 20px 0; border-left: 4px solid #10b981;">
                                  <p style="color: #065f46; font-size: 16px; margin: 0; font-weight: 600; text-align: center;">
                                    💰 <span style="text-decoration: line-through; color: #9ca3af;">Valor: $150 USD</span> • 
                                    <span style="color: #dc2626; font-weight: 800;">TU PRECIO: GRATIS</span>
                                  </p>
                                </div>
                                
                                <!-- Urgency Counter -->
                                <div style="text-align: center; margin: 24px 0 16px 0;">
                                  <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #92400e; padding: 12px 20px; border-radius: 25px; display: inline-block; font-weight: 700; font-size: 14px; box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4); animation: pulse 3s infinite;">
                                    ⚡ QUEDAN POCAS CONSULTAS DISPONIBLES
                                  </div>
                                </div>
                                
                                <!-- Premium WhatsApp Button -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 16px 0 24px 0;">
                                  <tr>
                                    <td style="background: linear-gradient(135deg, #25d366, #128c7e); border-radius: 50px; box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4); position: relative;">
                                      <!-- Pulse Animation Ring -->
                                      <div style="position: absolute; top: -4px; left: -4px; right: -4px; bottom: -4px; background: linear-gradient(135deg, #25d366, #128c7e); border-radius: 54px; opacity: 0.3; animation: pulse 2s infinite;"></div>
                                      
                                      <a href="https://wa.me/${whatsappNumber}?text=${whatsappMessage}" 
                                         style="background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); border: none; border-radius: 50px; color: #ffffff; display: inline-block; font-family: 'Inter', 'Segoe UI', sans-serif; font-size: 18px; font-weight: 700; line-height: 1; padding: 20px 40px; text-decoration: none; text-align: center; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; position: relative; z-index: 10;">
                                        📱 RESERVAR CONSULTA GRATIS
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                                
                                <div style="text-align: center; margin-top: 16px;">
                                  <p style="color: #78716c; font-size: 13px; margin: 0 0 8px 0;">
                                    💬 Click para WhatsApp • 🚀 Respuesta en < 2 horas
                                  </p>
                                  <p style="color: #dc2626; font-size: 12px; margin: 0; font-weight: 600;">
                                    ⏰ Aprovecha antes de que se agoten los cupos
                                  </p>
                                </div>
                                
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Social Proof -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                <tr>
                  <td>
                    <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
                      🌟 Lo que dicen nuestros clientes
                    </h3>
                    
                    <!-- Testimonial -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border-left: 4px solid #0ea5e9; border-radius: 8px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: #4b5563; font-size: 14px; font-style: italic; margin: 0 0 12px 0; line-height: 1.5;">
                            "Implementé el checklist y en 2 meses aumenté mis ventas online un 250%. Es oro puro."
                          </p>
                          <p style="color: #6b7280; font-size: 13px; font-weight: 600; margin: 0;">
                            — María González, Dueña de TiendaBella.com
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Stats -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px;">
                      <tr>
                        <td align="center" style="padding: 0 12px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td class="mobile-block" align="center" style="width: 33.33%; padding: 16px 8px;">
                                <div style="color: #0ea5e9; font-size: 24px; font-weight: 700; margin-bottom: 4px;">+1,247</div>
                                <div style="color: #6b7280; font-size: 13px;">Descargas</div>
                              </td>
                              <td class="mobile-block" align="center" style="width: 33.33%; padding: 16px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
                                <div style="color: #0ea5e9; font-size: 24px; font-weight: 700; margin-bottom: 4px;">4.9/5</div>
                                <div style="color: #6b7280; font-size: 13px;">⭐ Rating</div>
                              </td>
                              <td class="mobile-block" align="center" style="width: 33.33%; padding: 16px 8px;">
                                <div style="color: #0ea5e9; font-size: 24px; font-weight: 700; margin-bottom: 4px;">+300%</div>
                                <div style="color: #6b7280; font-size: 13px;">Conversión</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                <tr>
                  <td>
                    <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                      🚀 Próximos pasos recomendados:
                    </h3>
                    
                    <ol style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0; padding-left: 20px;">
                      <li style="margin-bottom: 8px;"><strong>Descarga el PDF</strong> desde este email</li>
                      <li style="margin-bottom: 8px;"><strong>Revisa los 25 puntos</strong> uno por uno</li>
                      <li style="margin-bottom: 8px;"><strong>Evalúa tu sitio actual</strong> o planifica el nuevo</li>
                      <li style="margin-bottom: 8px;"><strong>Agenda tu consulta gratuita</strong> para resolver dudas específicas</li>
                    </ol>
                  </td>
                </tr>
              </table>

              <!-- Contact Info -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 8px; margin: 32px 0;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <h4 style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">
                      ¿Tienes preguntas? ¡Estamos aquí para ayudarte!
                    </h4>
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px 0;">
                      📧 <strong>Email:</strong> <a href="mailto:contacto@codigofacil.com" style="color: #0ea5e9; text-decoration: none;">contacto@codigofacil.com</a><br>
                      📱 <strong>WhatsApp:</strong> <a href="https://wa.me/${whatsappNumber}" style="color: #0ea5e9; text-decoration: none;">${whatsappNumber}</a><br>
                      🌐 <strong>Web:</strong> <a href="${siteUrl}" style="color: #0ea5e9; text-decoration: none;">codigofacil.com</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Premium -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); padding: 0; border-radius: 0 0 12px 12px;">
              <!-- Footer Content -->
              <div style="padding: 40px 30px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <!-- Premium Logo Footer -->
                      <div style="margin-bottom: 24px;">
                        <h3 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 8px 0; text-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                          💻 <span style="background: linear-gradient(45deg, #ffffff, #e0f2fe); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">CodigoFacil</span><span style="color: #fbbf24; font-weight: 900;">.com</span>
                        </h3>
                        <div style="height: 2px; background: linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24); border-radius: 1px; margin: 0 auto; width: 80px; opacity: 0.8;"></div>
                      </div>
                      
                      <!-- Tagline -->
                      <p style="color: #94a3b8; font-size: 16px; margin: 0 0 24px 0; font-weight: 500;">
                        Desarrollo Web que <strong style="color: #fbbf24;">Convierte</strong> para LATAM
                      </p>
                      
                      <!-- Contact Info Premium -->
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid rgba(255,255,255,0.1);">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td align="center">
                              <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin-bottom: 16px;">
                                
                                <!-- WhatsApp -->
                                <div style="text-align: center; min-width: 120px;">
                                  <div style="background: linear-gradient(135deg, #25d366, #128c7e); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto; font-size: 18px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">📱</div>
                                  <a href="https://wa.me/${whatsappNumber}" style="color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 500;">
                                    WhatsApp<br>
                                    <span style="color: #fbbf24;">${whatsappNumber}</span>
                                  </a>
                                </div>
                                
                                <!-- Email -->
                                <div style="text-align: center; min-width: 120px;">
                                  <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto; font-size: 18px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">📧</div>
                                  <a href="mailto:contacto@codigofacil.com" style="color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 500;">
                                    Email<br>
                                    <span style="color: #fbbf24;">contacto@codigofacil.com</span>
                                  </a>
                                </div>
                                
                                <!-- Website -->
                                <div style="text-align: center; min-width: 120px;">
                                  <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto; font-size: 18px; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">🌐</div>
                                  <a href="${siteUrl}" style="color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 500;">
                                    Website<br>
                                    <span style="color: #fbbf24;">codigofacil.com</span>
                                  </a>
                                </div>
                                
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                      <!-- Trust Indicators -->
                      <div style="margin: 24px 0;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td align="center" style="width: 33.33%; padding: 8px;">
                              <div style="color: #fbbf24; font-size: 18px; font-weight: 700; margin-bottom: 4px;">+100</div>
                              <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Proyectos</div>
                            </td>
                            <td align="center" style="width: 33.33%; padding: 8px; border-left: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1);">
                              <div style="color: #fbbf24; font-size: 18px; font-weight: 700; margin-bottom: 4px;">4.9/5</div>
                              <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">⭐ Rating</div>
                            </td>
                            <td align="center" style="width: 33.33%; padding: 8px;">
                              <div style="color: #fbbf24; font-size: 18px; font-weight: 700; margin-bottom: 4px;">LATAM</div>
                              <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Especialistas</div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                      <!-- Privacy & Legal -->
                      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 20px;">
                        <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin: 0;">
                          Este email fue enviado porque solicitaste nuestra <strong>Guía Gratuita</strong>.<br>
                          🔒 Respetamos tu privacidad • No compartimos datos con terceros<br>
                          © 2025 CodigoFacil.com • Todos los derechos reservados
                        </p>
                      </div>
                      
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

// Template para emails de seguimiento
export function createFollowUpEmailTemplate(data: EmailTemplateData): string {
  const {
    name,
    whatsappNumber = '+50672904200',
    siteUrl = 'https://codigofacil.com'
  } = data;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¿Ya revisaste tu checklist? - CodigoFacil.com</title>
  <!-- Estilos similares al template principal pero más compacto -->
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <!-- Template más simple para follow-up -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 20px;">
        <div style="max-width: 600px; background: white; border-radius: 12px; padding: 40px;">
          <h2 style="color: #1f2937;">Hola ${name} 👋</h2>
          <p style="color: #4b5563;">¿Ya tuviste chance de revisar el checklist de 25 puntos?</p>
          <!-- Resto del contenido de seguimiento -->
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Template para notificaciones internas
export function createInternalNotificationTemplate(data: EmailTemplateData): string {
  const { name, email, phone } = data;
  const timestamp = new Date();
  const formattedDate = timestamp.toLocaleString('es-ES', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const whatsappMessage = encodeURIComponent(
    `Hola ${name}! Vi que te interesó nuestro checklist de 25 puntos. ¿Te gustaría que revisemos tu proyecto juntos? Tengo algunos espacios esta semana para consultas gratuitas.`
  );
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🎯 Nuevo Lead - CodigoFacil.com</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #0ea5e9, #3b82f6); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
    .lead-card { background: #f8fafc; border-left: 4px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .action-buttons { margin: 20px 0; text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px; }
    .btn-whatsapp { background: #25d366; color: white; }
    .btn-email { background: #3b82f6; color: white; }
    .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- Header -->
    <div class="header">
      <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: 800;">
        🎯 Nuevo Lead Capturado
      </h1>
      <p style="margin: 0; font-size: 16px; opacity: 0.9;">
        Descarga del Checklist 25 Puntos - CodigoFacil.com
      </p>
    </div>

    <!-- Content -->
    <div class="content">
      
      <!-- Alert Success -->
      <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
        <div style="color: #065f46; font-weight: 700; font-size: 16px;">
          ✅ Lead Magnet Exitoso - PDF Enviado Automáticamente
        </div>
      </div>

      <!-- Lead Information -->
      <h3 style="color: #1f2937; margin-bottom: 16px;">📋 Información del Lead</h3>
      
      <div class="lead-card">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 12px; background: #e5e7eb; font-weight: 600; color: #374151; width: 120px; border-radius: 4px;">👤 Nombre</td>
            <td style="padding: 8px 12px; color: #1f2937; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #e5e7eb; font-weight: 600; color: #374151; border-radius: 4px;">📧 Email</td>
            <td style="padding: 8px 12px; color: #1f2937;">
              <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #e5e7eb; font-weight: 600; color: #374151; border-radius: 4px;">📱 Teléfono</td>
            <td style="padding: 8px 12px; color: #1f2937;">${phone || '❌ No proporcionado'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #e5e7eb; font-weight: 600; color: #374151; border-radius: 4px;">🕒 Fecha/Hora</td>
            <td style="padding: 8px 12px; color: #1f2937;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #e5e7eb; font-weight: 600; color: #374151; border-radius: 4px;">📍 Fuente</td>
            <td style="padding: 8px 12px; color: #1f2937;"><strong>Lead Magnet:</strong> Checklist 25 Puntos</td>
          </tr>
        </table>
      </div>

      <!-- Quick Actions -->
      <h3 style="color: #1f2937; margin: 24px 0 16px 0;">⚡ Acciones Rápidas</h3>
      
      <div class="action-buttons">
        <!-- WhatsApp Button -->
        <a href="https://wa.me/${phone?.replace(/[^\d]/g, '') || ''}?text=${whatsappMessage}" 
           target="_blank" 
           class="btn btn-whatsapp"
           style="background: #25d366; color: white; display: inline-block; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">
          📱 Contactar por WhatsApp
        </a>
        
        <!-- Email Button -->
        <a href="mailto:${email}?subject=Hola%20${encodeURIComponent(name)}!%20Vi%20que%20descargaste%20nuestro%20checklist&body=Hola%20${encodeURIComponent(name)}!%0D%0A%0D%0AGracias%20por%20descargar%20nuestro%20checklist%20de%2025%20puntos.%20%C2%BFTe%20gustar%C3%ADa%20que%20revisemos%20tu%20proyecto%20juntos%3F%0D%0A%0D%0ATengo%20algunos%20espacios%20esta%20semana%20para%20consultas%20gratuitas.%0D%0A%0D%0ASaludos%2C%0D%0AEquipo%20CodigoFacil.com" 
           class="btn btn-email"
           style="background: #3b82f6; color: white; display: inline-block; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">
          📧 Responder por Email
        </a>
      </div>

      <!-- System Status -->
      <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <h4 style="color: #1e40af; margin: 0 0 12px 0;">🔧 Estado del Sistema</h4>
        <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
          <li>✅ Email con PDF enviado automáticamente al lead</li>
          <li>✅ Lead guardado en base de datos local</li>
          <li>✅ Notificación interna enviada exitosamente</li>
          <li>✅ Contador de descargas actualizado</li>
        </ul>
      </div>

      <!-- Recommendation -->
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <h4 style="color: #92400e; margin: 0 0 12px 0;">💡 Recomendación</h4>
        <p style="color: #92400e; margin: 0; line-height: 1.5;">
          <strong>Contactar en las próximas 2 horas</strong> para maximizar la tasa de conversión. 
          Los leads que descargan recursos gratuitos tienen 5x más probabilidad de convertir si se contactan rápidamente.
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin: 0 0 8px 0;">
        <strong>CodigoFacil.com</strong> - Sistema de Notificaciones Automáticas
      </p>
      <p style="margin: 0; font-size: 12px;">
        📧 Sistema SMTP Self-Hosted • 🔒 100% Privado • ⚡ Tiempo real
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

export type { EmailTemplateData };