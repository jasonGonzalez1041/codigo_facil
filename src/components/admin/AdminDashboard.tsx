"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, Users, MessageSquare, Smartphone, Globe, 
  TrendingUp, Calendar, Clock, LogOut, RefreshCw,
  Eye, MousePointer, Phone, Mail, Download
} from 'lucide-react';

interface DashboardStats {
  visitors: {
    today: number;
    week: number;
    month: number;
    growth: number;
  };
  conversions: {
    forms: number;
    whatsapp: number;
    calls: number;
    rate: number;
  };
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  pages: {
    home: number;
    services: number;
    blog: number;
    contact: number;
  };
  performance: {
    loadTime: number;
    score: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const router = useRouter();

  useEffect(() => {
    loadDashboardData();
    // Auto-refresh cada 5 minutos
    const interval = setInterval(loadDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin-token');
      
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setLastUpdate(new Date());
      } else {
        throw new Error('Error loading stats');
      }
    } catch (error) {
      console.error('❌ Error loading dashboard:', error);
      // Usar datos mock en caso de error
      setStats(getMockStats());
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    router.push('/admin/login');
  };

  // 📊 Datos mock para desarrollo
  const getMockStats = (): DashboardStats => ({
    visitors: {
      today: 24,
      week: 167,
      month: 892,
      growth: 12.5
    },
    conversions: {
      forms: 8,
      whatsapp: 15,
      calls: 3,
      rate: 2.9
    },
    devices: {
      desktop: 45,
      mobile: 48,
      tablet: 7
    },
    pages: {
      home: 412,
      services: 156,
      blog: 89,
      contact: 67
    },
    performance: {
      loadTime: 1.2,
      score: 94,
      coreWebVitals: {
        lcp: 1.8,
        fid: 45,
        cls: 0.08
      }
    }
  });

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  const currentStats = stats || getMockStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 🎯 Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Panel Administrativo
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                CodigoFacil.com - Última actualización: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadDashboardData}
                disabled={loading}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 📊 Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 📈 KPIs Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Visitantes Hoy */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Visitantes Hoy</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStats.visitors.today}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 dark:text-green-400">
                +{currentStats.visitors.growth}% vs ayer
              </span>
            </div>
          </div>

          {/* Conversiones */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversiones</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStats.conversions.forms + currentStats.conversions.whatsapp}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tasa: {currentStats.conversions.rate}%
              </span>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Score Performance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStats.performance.score}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Carga: {currentStats.performance.loadTime}s
              </span>
            </div>
          </div>

          {/* Visitantes del Mes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Visitantes del Mes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStats.visitors.month}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Semana: {currentStats.visitors.week}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* 📱 Dispositivos */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Distribución por Dispositivo
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Desktop</span>
                <span className="font-medium text-gray-900 dark:text-white">{currentStats.devices.desktop}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${currentStats.devices.desktop}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Mobile</span>
                <span className="font-medium text-gray-900 dark:text-white">{currentStats.devices.mobile}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${currentStats.devices.mobile}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tablet</span>
                <span className="font-medium text-gray-900 dark:text-white">{currentStats.devices.tablet}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${currentStats.devices.tablet}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 🎯 Conversiones Detalladas */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MousePointer className="w-5 h-5" />
              Acciones de Conversión
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">WhatsApp</span>
                </div>
                <span className="font-bold text-green-600">{currentStats.conversions.whatsapp}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Formularios</span>
                </div>
                <span className="font-bold text-blue-600">{currentStats.conversions.forms}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Llamadas</span>
                </div>
                <span className="font-bold text-purple-600">{currentStats.conversions.calls}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 📄 Páginas Más Visitadas */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Páginas Más Visitadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(currentStats.pages).map(([page, views]) => (
              <div key={page} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{page}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{views}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ⚡ Core Web Vitals */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Core Web Vitals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">LCP (Largest Contentful Paint)</p>
              <p className={`text-2xl font-bold ${currentStats.performance.coreWebVitals.lcp < 2.5 ? 'text-green-600' : 'text-orange-600'}`}>
                {currentStats.performance.coreWebVitals.lcp}s
              </p>
              <p className="text-xs text-gray-500">Target: < 2.5s</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">FID (First Input Delay)</p>
              <p className={`text-2xl font-bold ${currentStats.performance.coreWebVitals.fid < 100 ? 'text-green-600' : 'text-orange-600'}`}>
                {currentStats.performance.coreWebVitals.fid}ms
              </p>
              <p className="text-xs text-gray-500">Target: < 100ms</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">CLS (Cumulative Layout Shift)</p>
              <p className={`text-2xl font-bold ${currentStats.performance.coreWebVitals.cls < 0.1 ? 'text-green-600' : 'text-orange-600'}`}>
                {currentStats.performance.coreWebVitals.cls}
              </p>
              <p className="text-xs text-gray-500">Target: < 0.1</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}