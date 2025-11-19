// src/app/api/download-counter/route.ts - API para contador de descargas

import { NextRequest, NextResponse } from 'next/server';
import { getDownloadCounter } from '@/lib/download-counter';

// GET - Obtener contador actual
export async function GET(request: NextRequest) {
  try {
    const counter = getDownloadCounter();
    const count = await counter.getCurrentCount();
    
    return NextResponse.json({
      success: true,
      count,
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Error obteniendo contador:', error);
    
    return NextResponse.json({
      success: false,
      count: 1247, // Fallback number
      error: error instanceof Error ? error.message : 'Error desconocido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// POST - Incrementar contador
export async function POST(request: NextRequest) {
  try {
    const counter = getDownloadCounter();
    const newCount = await counter.incrementDownloads();
    
    console.log(`📊 Download counter incremented to: ${newCount}`);
    
    return NextResponse.json({
      success: true,
      count: newCount,
      increment: true,
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Error incrementando contador:', error);
    
    // Intentar obtener contador actual como fallback
    try {
      const counter = getDownloadCounter();
      const currentCount = await counter.getCurrentCount();
      
      return NextResponse.json({
        success: false,
        count: currentCount,
        increment: false,
        error: error instanceof Error ? error.message : 'Error incrementando',
        timestamp: new Date().toISOString()
      }, { status: 500 });
      
    } catch (fallbackError) {
      return NextResponse.json({
        success: false,
        count: 1247,
        increment: false,
        error: 'Error completo en contador',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  }
}

// GET con query params para estadísticas detalladas
export async function GET_DETAILED(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const detailed = searchParams.get('detailed');
  
  if (detailed === 'true') {
    try {
      const counter = getDownloadCounter();
      const stats = await counter.getDetailedStats();
      
      return NextResponse.json({
        success: true,
        ...stats,
        timestamp: new Date().toISOString()
      }, { status: 200 });
      
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas detalladas:', error);
      
      return NextResponse.json({
        success: false,
        total: 1247,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        backend: 'fallback',
        error: error instanceof Error ? error.message : 'Error desconocido',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  }
  
  // Si no es detailed, usar GET normal
  return GET(request);
}