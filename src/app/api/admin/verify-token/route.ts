// 🔍 API Route: Verificar token de sesión
import { NextRequest, NextResponse } from 'next/server';
import { otpService } from '@/lib/otp-service';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({
        valid: false,
        message: 'Token no proporcionado'
      }, { status: 400 });
    }

    // ✅ Verificar token usando nuestro servicio
    const result = otpService.verifySessionToken(token);

    if (result.valid) {
      return NextResponse.json({
        valid: true,
        email: result.email,
        message: 'Token válido'
      }, { status: 200 });
    } else {
      return NextResponse.json({
        valid: false,
        expired: result.expired,
        message: result.expired ? 'Token expirado' : 'Token inválido'
      }, { status: 401 });
    }

  } catch (error) {
    console.error('❌ Error verificando token:', error);
    return NextResponse.json({
      valid: false,
      message: 'Error interno del servidor'
    }, { status: 500 });
  }
}