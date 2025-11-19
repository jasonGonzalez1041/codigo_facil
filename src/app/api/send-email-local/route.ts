// src/app/api/send-email-local/route.ts - API Route para email 100% self-hosted
import { NextRequest, NextResponse } from 'next/server';
import { getLocalEmailService } from '@/lib/email-service-local';
import { z } from 'zod';

// Schema de validación para los datos del formulario
const LeadSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(50),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Teléfono debe tener al menos 8 dígitos').max(20),
  source: z.string().optional().default('lead-magnet-checklist')
});

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar datos del request
    const body = await request.json();
    const validatedData = LeadSchema.parse(body);
    
    console.log('📨 Procesando lead magnet para:', validatedData.email);

    // Obtener servicio de email local
    const emailService = getLocalEmailService();
    
    // Enviar email con PDF adjunto
    const result = await emailService.sendLeadMagnet({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      source: validatedData.source,
      timestamp: new Date()
    });

    if (result.success) {
      console.log('✅ Email enviado exitosamente:', result.messageId);
      
      return NextResponse.json({
        success: true,
        message: 'Email enviado correctamente',
        redirect: '/gracias',
        data: {
          messageId: result.messageId,
          leadSaved: result.leadSaved,
          recipient: validatedData.email,
          redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/gracias`
        }
      }, { status: 200 });

    } else {
      console.error('❌ Error enviando email:', result.error);
      
      return NextResponse.json({
        success: false,
        message: 'Error enviando email',
        error: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Error en API send-email-local:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Datos inválidos',
        errors: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// Endpoint para verificar estado del servicio
export async function GET(request: NextRequest) {
  try {
    const emailService = getLocalEmailService();
    const status = await emailService.getServiceStatus();
    
    return NextResponse.json({
      status: 'ok',
      service: 'local-email-service',
      timestamp: new Date().toISOString(),
      details: status
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Error verificando estado del servicio',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// Endpoint para testing (solo en desarrollo)
export async function PUT(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({
      success: false,
      message: 'Endpoint de testing solo disponible en desarrollo'
    }, { status: 403 });
  }

  try {
    const { testEmail } = await request.json();
    
    if (!testEmail || !z.string().email().safeParse(testEmail).success) {
      return NextResponse.json({
        success: false,
        message: 'Email de prueba requerido y válido'
      }, { status: 400 });
    }

    const emailService = getLocalEmailService();
    const result = await emailService.sendTestEmail(testEmail);

    return NextResponse.json({
      success: result.success,
      message: result.success ? 'Email de prueba enviado' : 'Error enviando email de prueba',
      data: result
    }, { status: result.success ? 200 : 500 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error en endpoint de testing',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}