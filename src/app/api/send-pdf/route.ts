import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWelcomeEmail, sendInternalNotification } from '@/lib/email-service';

// Esquema de validación con Zod
const ContactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50, 'Máximo 50 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
});

// Contador simple en memoria (para producción usar Redis/Database)
let downloadCounter = 1247; // Contador inicial

export async function POST(request: NextRequest) {
  try {
    // 1. Validar datos del formulario
    const body = await request.json();
    const validatedData = ContactSchema.parse(body);

    console.log('📧 Procesando envío de PDF para:', validatedData.email);

    // 2. Enviar email de bienvenida con PDF adjunto
    await sendWelcomeEmail(validatedData);

    // 3. Enviar notificación interna (no bloquea si falla)
    try {
      await sendInternalNotification(validatedData);
    } catch (notificationError) {
      console.warn('⚠️ Notificación interna falló, continuando:', notificationError);
    }

    // 4. Incrementar contador de descargas
    downloadCounter += 1;

    // 5. Log del éxito
    console.log(`✅ Email enviado exitosamente a ${validatedData.email}. Total descargas: ${downloadCounter}`);

    return NextResponse.json({
      success: true,
      message: 'Email enviado correctamente',
      downloadCount: downloadCounter,
    });

  } catch (error) {
    console.error('❌ Error en API send-pdf:', error);

    // Manejar errores de validación
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Datos inválidos',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // Manejar errores de email
    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor. Inténtalo nuevamente.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Endpoint GET para obtener estadísticas (opcional)
export async function GET() {
  return NextResponse.json({
    downloadCount: downloadCounter,
    status: 'active',
  });
}