#!/usr/bin/env node

// Script para verificar el build localmente sin depender del CLI de Cloudflare
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Verificando build local para Cloudflare Pages...\n');

try {
  // 1. Build de Next.js
  console.log('1️⃣ Ejecutando Next.js build...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Next.js build completado\n');

  // 2. Verificar archivos generados
  console.log('2️⃣ Verificando archivos generados...');
  
  const outDir = './out';
  const indexPath = path.join(outDir, 'index.html');
  
  if (fs.existsSync(outDir)) {
    console.log('✅ Directorio ./out existe');
  } else {
    throw new Error('❌ Directorio ./out no encontrado');
  }

  if (fs.existsSync(indexPath)) {
    const stats = fs.statSync(indexPath);
    console.log(`✅ index.html existe (${Math.round(stats.size / 1024)}KB)`);
  } else {
    throw new Error('❌ index.html no encontrado');
  }

  // 3. Verificar estructura de archivos
  const files = fs.readdirSync(outDir);
  console.log('📁 Archivos generados:', files.join(', '));

  // 4. Verificar assets críticos
  const criticalFiles = ['index.html', 'favicon.ico', '_next'];
  const missingFiles = criticalFiles.filter(file => !files.includes(file));
  
  if (missingFiles.length === 0) {
    console.log('✅ Todos los archivos críticos están presentes');
  } else {
    console.log('⚠️ Archivos faltantes:', missingFiles.join(', '));
  }

  console.log('\n🎉 Build verificado exitosamente!');
  console.log('📝 El sitio está listo para deployment en Cloudflare Pages');
  console.log('🔗 Para probar localmente: npx serve out');
  
} catch (error) {
  console.error('❌ Error durante la verificación:', error.message);
  process.exit(1);
}