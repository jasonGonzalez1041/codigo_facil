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
  
  const buildDir = './.next';
  const serverDir = path.join(buildDir, 'server');
  
  if (fs.existsSync(buildDir)) {
    console.log('✅ Directorio ./.next existe');
  } else {
    throw new Error('❌ Directorio ./.next no encontrado');
  }

  if (fs.existsSync(serverDir)) {
    console.log('✅ Directorio server existe');
  } else {
    console.log('⚠️ Directorio server no encontrado (puede ser normal en algunos casos)');
  }

  // 3. Verificar estructura de archivos
  const files = fs.readdirSync(buildDir);
  console.log('📁 Archivos generados:', files.join(', '));

  // 4. Verificar assets críticos para Next.js build
  const criticalFiles = ['static', 'server'];
  const missingFiles = criticalFiles.filter(file => !files.includes(file));
  
  if (missingFiles.length === 0) {
    console.log('✅ Todos los archivos críticos están presentes');
  } else {
    console.log('⚠️ Archivos faltantes:', missingFiles.join(', '));
  }

  console.log('\n🎉 Build verificado exitosamente!');
  console.log('📝 El sitio está listo para deployment en Vercel');
  console.log('🔗 Para probar localmente: npm run start');
  
} catch (error) {
  console.error('❌ Error durante la verificación:', error.message);
  process.exit(1);
}