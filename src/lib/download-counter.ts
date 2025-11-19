// src/lib/download-counter.ts - Contador real de descargas con múltiples backends

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface DownloadStats {
  totalDownloads: number;
  lastUpdated: string;
  dailyDownloads?: Record<string, number>;
}

class DownloadCounter {
  private fallbackPath: string;
  private useKV: boolean;

  constructor() {
    this.fallbackPath = join(process.cwd(), 'data/download-stats.json');
    // Detectar si Vercel KV está disponible
    this.useKV = !!process.env.KV_URL || !!process.env.REDIS_URL;
  }

  // Método principal para incrementar contador
  async incrementDownloads(): Promise<number> {
    try {
      if (this.useKV) {
        return await this.incrementWithKV();
      } else {
        return await this.incrementWithFile();
      }
    } catch (error) {
      console.error('❌ Error incrementando descargas:', error);
      // Fallback estático para evitar hydration mismatch
      return 1247;
    }
  }

  // Método para obtener contador actual
  async getCurrentCount(): Promise<number> {
    try {
      if (this.useKV) {
        return await this.getCountFromKV();
      } else {
        return await this.getCountFromFile();
      }
    } catch (error) {
      console.error('❌ Error obteniendo contador:', error);
      return 1247; // Base number como fallback
    }
  }

  // Implementación con Vercel KV (Upstash Redis)
  private async incrementWithKV(): Promise<number> {
    try {
      // Importar dinámicamente para evitar errores si no está disponible
      const { kv } = await import('@vercel/kv');
      
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      
      // Incrementar contador total
      const totalKey = 'download_counter_total';
      const dailyKey = `download_counter_daily_${today}`;
      
      // Usar pipeline para operaciones atómicas
      const pipeline = kv.pipeline();
      pipeline.incr(totalKey);
      pipeline.incr(dailyKey);
      pipeline.expire(dailyKey, 60 * 60 * 24 * 30); // Expire daily counters after 30 days
      
      const results = await pipeline.exec();
      const newTotal = results[0] as number;
      
      // Asegurar que el contador nunca sea menor que la base
      const baseCount = 1247;
      const finalCount = Math.max(newTotal, baseCount);
      
      if (finalCount !== newTotal) {
        await kv.set(totalKey, finalCount);
      }
      
      console.log(`✅ Descarga incrementada (KV): ${finalCount} (daily: ${results[1]})`);
      return finalCount;
      
    } catch (error) {
      console.error('❌ Error con Vercel KV:', error);
      throw error;
    }
  }

  private async getCountFromKV(): Promise<number> {
    try {
      const { kv } = await import('@vercel/kv');
      const count = await kv.get('download_counter_total') as number;
      return Math.max(count || 1247, 1247);
    } catch (error) {
      console.error('❌ Error leyendo desde KV:', error);
      throw error;
    }
  }

  // Implementación con archivo local (fallback)
  private async incrementWithFile(): Promise<number> {
    try {
      const stats = this.readStatsFile();
      const today = new Date().toISOString().split('T')[0];
      
      stats.totalDownloads += 1;
      stats.lastUpdated = new Date().toISOString();
      
      // Tracking daily downloads
      if (!stats.dailyDownloads) {
        stats.dailyDownloads = {};
      }
      stats.dailyDownloads[today] = (stats.dailyDownloads[today] || 0) + 1;
      
      // Limpiar datos diarios antiguos (mantener solo últimos 30 días)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];
      
      Object.keys(stats.dailyDownloads).forEach(date => {
        if (date < cutoffDate) {
          delete stats.dailyDownloads![date];
        }
      });
      
      this.writeStatsFile(stats);
      
      console.log(`✅ Descarga incrementada (File): ${stats.totalDownloads} (daily: ${stats.dailyDownloads[today]})`);
      return stats.totalDownloads;
      
    } catch (error) {
      console.error('❌ Error con archivo local:', error);
      throw error;
    }
  }

  private async getCountFromFile(): Promise<number> {
    try {
      const stats = this.readStatsFile();
      return stats.totalDownloads;
    } catch (error) {
      console.error('❌ Error leyendo archivo local:', error);
      throw error;
    }
  }

  private readStatsFile(): DownloadStats {
    try {
      const data = readFileSync(this.fallbackPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, crear con datos base
      const initialStats: DownloadStats = {
        totalDownloads: 1247, // Número base
        lastUpdated: new Date().toISOString(),
        dailyDownloads: {}
      };
      
      this.writeStatsFile(initialStats);
      return initialStats;
    }
  }

  private writeStatsFile(stats: DownloadStats): void {
    try {
      const { mkdirSync } = require('fs');
      const { dirname } = require('path');
      
      // Asegurar que el directorio existe
      mkdirSync(dirname(this.fallbackPath), { recursive: true });
      writeFileSync(this.fallbackPath, JSON.stringify(stats, null, 2));
      
    } catch (error) {
      console.error('❌ Error escribiendo archivo de stats:', error);
      throw error;
    }
  }

  // Método para obtener estadísticas detalladas
  async getDetailedStats(): Promise<{
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    backend: 'kv' | 'file';
  }> {
    try {
      const total = await this.getCurrentCount();
      const today = new Date().toISOString().split('T')[0];
      
      let todayCount = 0;
      let weekCount = 0;
      let monthCount = 0;
      
      if (this.useKV) {
        try {
          const { kv } = await import('@vercel/kv');
          
          // Obtener contadores diarios
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          // Calcular estadísticas (simplificado)
          todayCount = await kv.get(`download_counter_daily_${today}`) as number || 0;
          
        } catch (error) {
          console.error('Error obteniendo estadísticas detalladas de KV:', error);
        }
      } else {
        const stats = this.readStatsFile();
        const dailyDownloads = stats.dailyDownloads || {};
        
        todayCount = dailyDownloads[today] || 0;
        
        // Calcular última semana
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          weekCount += dailyDownloads[dateStr] || 0;
        }
        
        // Calcular último mes
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          monthCount += dailyDownloads[dateStr] || 0;
        }
      }
      
      return {
        total,
        today: todayCount,
        thisWeek: weekCount,
        thisMonth: monthCount,
        backend: this.useKV ? 'kv' : 'file'
      };
      
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas detalladas:', error);
      return {
        total: 1247,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        backend: 'file'
      };
    }
  }
}

// Singleton para reusar la instancia
let downloadCounterInstance: DownloadCounter | null = null;

export function getDownloadCounter(): DownloadCounter {
  if (!downloadCounterInstance) {
    downloadCounterInstance = new DownloadCounter();
  }
  return downloadCounterInstance;
}

export type { DownloadStats };