// 📧 API Route: Solicitar código OTP
import { NextRequest, NextResponse } from 'next/server';
import { otpService } from '@/lib/otp-service';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // 🛡️ Validaciones básicas
    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'Email es requerido'
      }, { status: 400 });
    }

    // 📧 Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Formato de email inválido'
      }, { status: 400 });
    }

    // 🚀 Solicitar OTP usando nuestro servicio
    const result = await otpService.requestOTP(email);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 429 });
    }

  } catch (error) {
    console.error('❌ Error en request OTP:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor'
    }, { status: 500 });
  }
}