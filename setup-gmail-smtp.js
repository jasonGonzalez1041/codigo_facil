#!/usr/bin/env node
// setup-gmail-smtp.js - Configuración automática de Gmail SMTP para producción

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function showHeader() {
  log('🚀 Configuración Gmail SMTP - CodigoFacil.com', colors.bold + colors.blue);
  log('='.repeat(60), colors.blue);
  log('Este asistente te ayudará a configurar Gmail SMTP para producción\n', colors.cyan);
}

function showGmailInstructions() {
  log('📧 PASO 1: Crear App Password en Gmail', colors.bold + colors.yellow);
  log('1. Ve a: https://myaccount.google.com/apppasswords', colors.yellow);
  log('2. Selecciona "Mail" como app', colors.yellow);
  log('3. Selecciona "Other" y escribe "CodigoFacil"', colors.yellow);
  log('4. Google generará una contraseña de 16 caracteres', colors.yellow);
  log('5. Copia esa contraseña (ej: abcd efgh ijkl mnop)\n', colors.yellow);
  
  log('⚠️  IMPORTANTE:', colors.bold + colors.red);
  log('- Necesitas tener 2FA activado en tu cuenta Google', colors.red);
  log('- La contraseña normal de Gmail NO funcionará', colors.red);
  log('- Solo la App Password de 16 caracteres sirve\n', colors.red);
}

async function collectGmailCredentials() {
  return new Promise((resolve) => {
    log('📝 PASO 2: Configurar credenciales', colors.bold + colors.blue);
    
    rl.question('📧 Email de Gmail (ej: contacto@gmail.com): ', (email) => {
      if (!email || !email.includes('@')) {
        log('❌ Email inválido', colors.red);
        resolve(null);
        return;
      }
      
      rl.question('🔑 App Password de 16 caracteres (ej: abcd efgh ijkl mnop): ', (password) => {
        if (!password || password.replace(/\s+/g, '').length !== 16) {
          log('❌ App Password debe tener exactamente 16 caracteres', colors.red);
          resolve(null);
          return;
        }
        
        rl.question('📤 Email remitente para FROM (ej: noreply@codigofacil.com): ', (fromEmail) => {
          if (!fromEmail || !fromEmail.includes('@')) {
            log('❌ Email FROM inválido', colors.red);
            resolve(null);
            return;
          }
          
          resolve({
            gmailUser: email.trim(),
            gmailPassword: password.replace(/\s+/g, ''), // Remover espacios
            fromEmail: fromEmail.trim()
          });
        });
      });
    });
  });
}

function createEnvFile(credentials) {
  const envContent = `# .env.local - Configuración Gmail SMTP para CodigoFacil.com
# Generado automáticamente el ${new Date().toLocaleString()}

# ===== GMAIL SMTP (PRODUCCIÓN) =====
GMAIL_USER=${credentials.gmailUser}
GMAIL_APP_PASSWORD=${credentials.gmailPassword}

# ===== CONFIGURACIÓN GENERAL =====
SMTP_FROM=${credentials.fromEmail}
NEXT_PUBLIC_SITE_URL=https://codigofacil.com
NODE_ENV=production

# ===== CONFIGURACIÓN DE LEADS =====
LEADS_DATA_PATH=data/leads.json

# ===== CONFIGURACIÓN OPCIONAL =====
# Para testing en desarrollo, cambiar a:
# NODE_ENV=development

# ===== NOTAS DE SEGURIDAD =====
# - Este archivo contiene credenciales sensibles
# - NUNCA lo subas a git (ya está en .gitignore)
# - Usa diferentes credenciales para desarrollo/producción
# - Gmail tiene límite de 500 emails/día por cuenta
`;

  try {
    fs.writeFileSync('.env.local', envContent);
    return true;
  } catch (error) {
    log(`❌ Error creando archivo .env.local: ${error.message}`, colors.red);
    return false;
  }
}

async function testConfiguration(credentials) {
  log('\n🧪 PASO 3: Probando configuración...', colors.bold + colors.blue);
  
  try {
    // Crear transporter de prueba
    const { createTransport } = require('nodemailer');
    
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: credentials.gmailUser,
        pass: credentials.gmailPassword
      }
    });

    log('🔍 Verificando conexión con Gmail...', colors.yellow);
    await transporter.verify();
    
    log('✅ Conexión exitosa con Gmail SMTP!', colors.green);
    return true;
    
  } catch (error) {
    log('❌ Error de conexión:', colors.red);
    log(`   ${error.message}`, colors.red);
    
    if (error.message.includes('Invalid login')) {
      log('\n💡 Posibles soluciones:', colors.yellow);
      log('1. Verifica que la App Password sea correcta (16 caracteres)', colors.yellow);
      log('2. Asegúrate de que 2FA esté activado en Gmail', colors.yellow);
      log('3. Recrea la App Password en Google Account', colors.yellow);
    }
    
    return false;
  }
}

function showNextSteps() {
  log('\n🎉 CONFIGURACIÓN COMPLETADA!', colors.bold + colors.green);
  log('='.repeat(60), colors.green);
  
  log('✅ Gmail SMTP configurado correctamente', colors.green);
  log('✅ Archivo .env.local creado', colors.green);
  log('✅ Conexión verificada', colors.green);
  
  log('\n🚀 Próximos pasos:', colors.bold + colors.blue);
  log('1. Inicia el servidor: npm run dev', colors.blue);
  log('2. Prueba el sistema: npm run test:smtp', colors.blue);
  log('3. Envía un email de prueba desde el script', colors.blue);
  
  log('\n📊 Capacidades del sistema:', colors.bold + colors.cyan);
  log('- 📧 Envío: 500 emails/día con Gmail', colors.cyan);
  log('- 🔒 Seguridad: SSL/TLS automático', colors.cyan);
  log('- 📎 Adjuntos: PDF automático incluido', colors.cyan);
  log('- 💾 Leads: Guardado automático en JSON', colors.cyan);
  
  log('\n🔗 URLs útiles:', colors.bold + colors.yellow);
  log('- API endpoint: http://localhost:3000/api/send-pdf', colors.yellow);
  log('- Testing script: npm run test:smtp', colors.yellow);
  log('- Documentación: SMTP_CONFIGURACION.md', colors.yellow);
}

async function main() {
  showHeader();
  showGmailInstructions();
  
  // Verificar si ya existe .env.local
  if (fs.existsSync('.env.local')) {
    const answer = await new Promise(resolve => {
      rl.question('⚠️  Ya existe .env.local. ¿Sobrescribir? (y/N): ', resolve);
    });
    
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      log('\n👋 Configuración cancelada', colors.blue);
      rl.close();
      return;
    }
  }
  
  // Recopilar credenciales
  let credentials = null;
  let attempts = 0;
  
  while (!credentials && attempts < 3) {
    credentials = await collectGmailCredentials();
    
    if (!credentials) {
      attempts++;
      if (attempts < 3) {
        log(`\n⚠️  Intento ${attempts}/3. Intenta nuevamente...\n`, colors.yellow);
      }
    }
  }
  
  if (!credentials) {
    log('\n❌ No se pudieron recopilar las credenciales válidas', colors.red);
    rl.close();
    return;
  }
  
  // Crear archivo .env.local
  log('\n💾 Creando archivo .env.local...', colors.blue);
  const envCreated = createEnvFile(credentials);
  
  if (!envCreated) {
    log('\n❌ Error creando configuración', colors.red);
    rl.close();
    return;
  }
  
  // Probar configuración
  const configWorks = await testConfiguration(credentials);
  
  if (configWorks) {
    showNextSteps();
  } else {
    log('\n❌ La configuración no está funcionando', colors.red);
    log('💡 Revisa las credenciales y vuelve a intentar', colors.yellow);
  }
  
  rl.close();
}

// Manejo de errores
process.on('unhandledRejection', (error) => {
  log(`❌ Error inesperado: ${error.message}`, colors.red);
  rl.close();
  process.exit(1);
});

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(error => {
    log(`❌ Error fatal: ${error.message}`, colors.red);
    process.exit(1);
  });
}