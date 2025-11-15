// 🔐 API Route: Verificar código OTP
import { NextRequest, NextResponse } from 'next/server';
import { otpService } from '@/lib/otp-service';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // 🛡️ Validaciones básicas
    if (!email || !code) {
      return NextResponse.json({
        success: false,
        message: 'Email y código son requeridos'
      }, { status: 400 });
    }

    // 🔍 Validar formato del código
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({
        success: false,
        message: 'El código debe contener 6 dígitos numéricos'
      }, { status: 400 });
    }

    // ✅ Verificar OTP usando nuestro servicio
    const result = otpService.verifyOTP(email, code);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 401 });
    }

  } catch (error) {
    console.error('❌ Error en verify OTP:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor'
    }, { status: 500 });
  }
}