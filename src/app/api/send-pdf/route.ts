// src/app/api/send-pdf/route.ts - API Route para envío de PDF con datos completos
import { NextRequest, NextResponse } from 'next/server';
import { getLocalEmailService } from '@/lib/email-service-local';
import { getDownloadCounter } from '@/lib/download-counter';
import { z } from 'zod';

// Schema de validación para los datos del formulario
const SendPDFSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(50),
  phone: z.string().min(8, 'Teléfono debe tener al menos 8 dígitos').max(20),
  email: z.string().email('Email inválido'),
  source: z.string().optional().default('send-pdf-endpoint')
});

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar datos del request
    const body = await request.json();
    const validatedData = SendPDFSchema.parse(body);
    
    console.log('📨 Procesando envío de PDF para:', {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone
    });

    // Obtener servicio de email local
    const emailService = getLocalEmailService();
    
    // Enviar email con PDF adjunto usando el sistema self-hosted
    const result = await emailService.sendLeadMagnet({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      source: validatedData.source,
      timestamp: new Date()
    });

    if (result.success) {
      console.log('✅ PDF enviado exitosamente:', {
        messageId: result.messageId,
        recipient: validatedData.email,
        leadSaved: result.leadSaved
      });
      
      // Incrementar contador de descargas
      let downloadCount = 1247;
      try {
        const counter = getDownloadCounter();
        downloadCount = await counter.incrementDownloads();
        console.log('📊 Contador incrementado a:', downloadCount);
      } catch (error) {
        console.error('⚠️ Error incrementando contador (continuando):', error);
      }
      
      return NextResponse.json({
        success: true,
        message: 'PDF enviado correctamente por email',
        redirect: '/gracias',
        data: {
          messageId: result.messageId,
          leadSaved: result.leadSaved,
          recipient: validatedData.email,
          name: validatedData.name,
          phone: validatedData.phone,
          downloadCount: downloadCount,
          timestamp: new Date().toISOString(),
          redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/gracias`
        }
      }, { status: 200 });

    } else {
      console.error('❌ Error enviando PDF:', result.error);
      
      return NextResponse.json({
        success: false,
        message: 'Error enviando PDF por email',
        error: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Error en API send-pdf:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Datos inválidos',
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// Endpoint GET para verificar estado del servicio
export async function GET(request: NextRequest) {
  try {
    const emailService = getLocalEmailService();
    const status = await emailService.getServiceStatus();
    
    return NextResponse.json({
      endpoint: 'send-pdf',
      status: 'ok',
      description: 'Envío de PDF con datos completos: name, phone, email',
      timestamp: new Date().toISOString(),
      usage: {
        method: 'POST',
        body: {
          name: 'string (required, min 2 chars)',
          phone: 'string (required, min 8 chars)', 
          email: 'string (required, valid email)',
          source: 'string (optional, default: "send-pdf-endpoint")'
        }
      },
      serviceStatus: status
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      endpoint: 'send-pdf',
      status: 'error',
      message: 'Error verificando estado del servicio',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// Método OPTIONS para CORS si es necesario
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}