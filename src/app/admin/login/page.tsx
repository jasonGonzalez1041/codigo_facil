"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('vecipremiun@gmail.com');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();

  // 🕒 Countdown para cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  // 📧 Solicitar código OTP
  const handleRequestOTP = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/otp/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStep('otp');
        setMessageType('success');
        setMessage(data.message);
      } else {
        setMessageType('error');
        setMessage(data.message);
        if (data.cooldown) {
          setCooldown(data.cooldown * 60); // Convertir minutos a segundos
        }
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Verificar código OTP
  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      setMessageType('error');
      setMessage('El código debe tener 6 dígitos');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: otpCode }),
      });

      const data = await response.json();

      if (data.success) {
        // 🎉 Guardar token y redirigir
        localStorage.setItem('admin-token', data.token);
        setMessageType('success');
        setMessage('¡Acceso autorizado! Redirigiendo...');
        
        setTimeout(() => {
          router.push('/admin');
        }, 1500);
      } else {
        setMessageType('error');
        setMessage(data.message);
        // Si se acabaron los intentos, volver al paso de email
        if (data.message.includes('Solicita un nuevo código')) {
          setStep('email');
          setOtpCode('');
        }
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Reiniciar proceso
  const handleReset = () => {
    setStep('email');
    setOtpCode('');
    setMessage('');
    setCooldown(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 🏠 Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Panel Administrativo
          </h1>
          <p className="text-blue-200">
            CodigoFacil.com
          </p>
        </div>

        {/* 📋 Formulario */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          
          {/* 📧 Paso 1: Email */}
          {step === 'email' && (
            <div className="space-y-6">
              <div className="text-center">
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-white mb-2">
                  Acceso Administrativo
                </h2>
                <p className="text-gray-300 text-sm">
                  Se enviará un código de verificación a tu email autorizado
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Autorizado
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="admin@codigofacil.com"
                  disabled={loading || cooldown > 0}
                  readOnly
                />
              </div>

              <button
                onClick={handleRequestOTP}
                disabled={loading || cooldown > 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando código...
                  </>
                ) : cooldown > 0 ? (
                  <>
                    <Clock className="w-5 h-5" />
                    Esperar {Math.floor(cooldown / 60)}:{(cooldown % 60).toString().padStart(2, '0')}
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Enviar Código OTP
                  </>
                )}
              </button>
            </div>
          )}

          {/* 🔐 Paso 2: OTP */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center">
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-white mb-2">
                  Verificación OTP
                </h2>
                <p className="text-gray-300 text-sm">
                  Ingresa el código de 6 dígitos enviado a tu email
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Código de Verificación
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="000000"
                  maxLength={6}
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
                >
                  Volver
                </button>
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || otpCode.length !== 6}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Verificar
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 💬 Mensajes */}
          {message && (
            <div className={`mt-6 p-4 rounded-lg border flex items-start gap-3 ${
              messageType === 'success' 
                ? 'bg-green-500/10 border-green-500/30 text-green-300'
                : messageType === 'error'
                ? 'bg-red-500/10 border-red-500/30 text-red-300'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : messageType === 'error' ? (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm leading-relaxed">{message}</p>
            </div>
          )}
        </div>

        {/* 🔒 Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Acceso restringido solo para administradores autorizados
          </p>
        </div>
      </div>
    </div>
  );
}