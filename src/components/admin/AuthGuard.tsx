"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Loader } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      
      if (!token) {
        redirectToLogin();
        return;
      }

      // 🔍 Verificar token con el backend
      const response = await fetch('/api/admin/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.valid) {
        setIsAuthenticated(true);
      } else {
        // Token inválido o expirado
        localStorage.removeItem('admin-token');
        redirectToLogin();
      }
    } catch (error) {
      console.error('❌ Error verificando autenticación:', error);
      redirectToLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToLogin = () => {
    router.push('/admin/login');
  };

  // 🔄 Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Loader className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
          <p className="text-white">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // 🔐 Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h1>
          <p className="text-gray-300">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  // ✅ Authenticated - mostrar contenido
  return <>{children}</>;
}