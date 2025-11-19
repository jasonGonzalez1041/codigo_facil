// app/api/send-email/route.ts - API Route para envío self-hosted
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getEmailService, type EmailData } from '@/lib/email-service';

// Validación con Zod - Schema robusto para { name, phone, email }
const SendEmailSchema = z.object({
  // Campos principales (formato { name, phone, email })
  name: z.string()
    .min(2, 'Name debe tener al menos 2 caracteres')
    .max(100, 'Name no puede exceder 100 caracteres')
    .trim()
    .optional(),
  
  phone: z.string()
    .regex(/^[\+]?[1-9][\d\s\-\(\)]{7,15}$/, 'Formato de teléfono inválido (+52 55 1234 5678)')
    .optional(),
  
  email: z.string()
    .email('Formato de email inválido')
    .min(5, 'Email debe tener al menos 5 caracteres')
    .max(254, 'Email no puede exceder 254 caracteres')
    .toLowerCase(),
  
  // Campos adicionales opcionales
  empresa: z.string()
    .min(1, 'Empresa no puede estar vacía')
    .max(200, 'Empresa no puede exceder 200 caracteres')
    .trim()
    .optional(),
  
  mensaje: z.string()
    .min(1, 'Mensaje no puede estar vacío')
    .max(2000, 'Mensaje no puede exceder 2000 caracteres')
    .trim()
    .optional(),
  
  tipo: z.enum(['lead_magnet', 'contact_form'], {
    errorMap: () => ({ message: 'Tipo debe ser "lead_magnet" o "contact_form"' })
  }).default('lead_magnet'),
  
  // Retrocompatibilidad con nombres en español
  nombre: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre no puede exceder 100 caracteres')
    .trim()
    .optional(),
  
  telefono: z.string()
    .regex(/^[\+]?[1-9][\d\s\-\(\)]{7,15}$/, 'Formato de teléfono inválido')
    .optional(),
}).refine(
  (data) => data.name || data.nombre, 
  {
    message: 'name o nombre es obligatorio',
    path: ['name']
  }
);

// Schema transformado para normalizar datos
const TransformedEmailSchema = SendEmailSchema.transform((data) => {
  // Normalizar nombre: usar 'name' si existe, sino 'nombre'
  const nombre = (data.name || data.nombre)!;
  
  // Normalizar teléfono: usar 'phone' si existe, sino 'telefono' 
  const telefono = data.phone || data.telefono;
  
  // Generar mensaje automático si no se proporciona
  const mensaje = data.mensaje || `Contacto desde formulario web.
Nombre: ${nombre}
Email: ${data.email}${telefono ? `\nTeléfono: ${telefono}` : ''}${data.empresa ? `\nEmpresa: ${data.empresa}` : ''}`;

  return {
    nombre,
    email: data.email,
    telefono,
    empresa: data.empresa,
    mensaje,
    tipo: data.tipo
  };
});

type SendEmailRequest = z.infer<typeof SendEmailSchema>;
type TransformedEmailData = z.infer<typeof TransformedEmailSchema>;

export async function POST(request: NextRequest) {
  try {
    // Verificar que las variables de entorno estén configuradas
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('❌ Variables de entorno SMTP no configuradas');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Servidor de email no configurado. Contacta al administrador.' 
        },
        { status: 500 }
      );
    }

    // Leer datos del request
    const body = await request.json();

    // Validar con Zod
    const validationResult = TransformedEmailSchema.safeParse(body);

    if (!validationResult.success) {
      const zodErrors = validationResult.error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      );
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Datos inválidos', 
          errors: zodErrors,
          received: body
        },
        { status: 400 }
      );
    }

    // Datos validados y transformados
    const validatedData = validationResult.data;
    
    const emailData: EmailData = {
      nombre: validatedData.nombre,
      email: validatedData.email,
      telefono: validatedData.telefono,
      empresa: validatedData.empresa,
      mensaje: validatedData.mensaje,
      tipo: validatedData.tipo
    };

    // Enviar email usando el servicio self-hosted
    const emailService = getEmailService();
    const result = await emailService.sendEmail(emailData);

    if (result.success) {
      // Respuesta exitosa
      return NextResponse.json({
        success: true,
        message: result.message,
        data: {
          nombre: emailData.nombre,
          email: emailData.email,
          tipo: emailData.tipo,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      // Error en el envío
      console.error('Error en servicio de email:', result.message);
      return NextResponse.json(
        { 
          success: false, 
          message: result.message 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Error en API /send-email:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}

// Endpoint de test para verificar configuración
export async function GET() {
  try {
    const emailService = getEmailService();
    const isConnected = await emailService.testConnection();

    return NextResponse.json({
      success: true,
      message: 'API de email funcionando',
      smtp_connected: isConnected,
      configuration: {
        smtp_host: process.env.SMTP_HOST || 'No configurado',
        smtp_user: process.env.SMTP_USER ? 'Configurado' : 'No configurado',
        smtp_pass: process.env.SMTP_PASS ? 'Configurado' : 'No configurado',
        admin_email: process.env.ADMIN_EMAIL || 'Usando SMTP_USER como fallback'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error verificando configuración',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}