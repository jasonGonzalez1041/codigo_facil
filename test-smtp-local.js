#!/usr/bin/env node
// test-smtp-local.js - Script de testing para sistema SMTP local

const readline = require('readline');

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
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { success: response.ok, data, status: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function testServiceStatus() {
  log('\n🔍 Verificando estado del servicio SMTP...', colors.blue);
  
  const result = await makeRequest('http://localhost:3000/api/send-email-local');
  
  if (result.success) {
    log('✅ Servicio SMTP funcionando correctamente', colors.green);
    log(`📊 Detalles del sistema:`, colors.blue);
    console.log(JSON.stringify(result.data.details, null, 2));
    return true;
  } else {
    log('❌ Error verificando servicio SMTP', colors.red);
    console.log(result.error || result.data);
    return false;
  }
}

async function testSendPDFEndpoint() {
  log('\n🔍 Verificando endpoint /api/send-pdf...', colors.blue);
  
  const result = await makeRequest('http://localhost:3000/api/send-pdf');
  
  if (result.success) {
    log('✅ Endpoint send-pdf funcionando correctamente', colors.green);
    log(`📋 Configuración:`, colors.blue);
    console.log(`- Método: ${result.data.usage?.method}`);
    console.log(`- Validación: ${result.data.usage ? 'Activa' : 'No configurada'}`);
    console.log(`- Estado SMTP: ${result.data.serviceStatus?.smtpReady ? '✅' : '❌'}`);
    return true;
  } else {
    log('❌ Error verificando endpoint send-pdf', colors.red);
    console.log(result.error || result.data);
    return false;
  }
}

async function checkSMTPConfig() {
  log('\n🔧 Verificando configuración SMTP...', colors.blue);
  
  const hasGmail = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD;
  const hasSMTP = process.env.SMTP_HOST;
  const isDev = process.env.NODE_ENV === 'development';
  
  if (hasGmail) {
    log('✅ Gmail SMTP configurado', colors.green);
    log(`  - Usuario: ${process.env.GMAIL_USER}`, colors.yellow);
    log(`  - App Password: ${'*'.repeat(16)}`, colors.yellow);
  } else if (hasSMTP) {
    log('✅ SMTP personalizado configurado', colors.green);
    log(`  - Host: ${process.env.SMTP_HOST}`, colors.yellow);
    log(`  - Puerto: ${process.env.SMTP_PORT || '587'}`, colors.yellow);
    log(`  - Seguro: ${process.env.SMTP_SECURE || 'false'}`, colors.yellow);
    log(`  - Usuario: ${process.env.SMTP_USER || 'No configurado'}`, colors.yellow);
  } else if (isDev) {
    log('⚠️ Modo desarrollo - usando MailHog local', colors.yellow);
    log(`  - Host: localhost`, colors.yellow);
    log(`  - Puerto: 1025`, colors.yellow);
    log(`  - Web UI: http://localhost:8025`, colors.yellow);
  } else {
    log('❌ No se encontró configuración SMTP', colors.red);
    log('  Configura una de estas opciones en .env.local:', colors.red);
    log('  1. Gmail: GMAIL_USER + GMAIL_APP_PASSWORD', colors.red);
    log('  2. SMTP: SMTP_HOST + SMTP_USER + SMTP_PASS', colors.red);
    log('  3. Dev: NODE_ENV=development', colors.red);
    return false;
  }
  
  return true;
}

async function testEmailSending() {
  return new Promise((resolve) => {
    rl.question('\n📧 Ingresa un email para testing: ', async (testEmail) => {
      if (!testEmail || !testEmail.includes('@')) {
        log('❌ Email inválido', colors.red);
        resolve(false);
        return;
      }

      log(`\n📤 Enviando email de prueba a: ${testEmail}`, colors.yellow);
      
      const result = await makeRequest('http://localhost:3000/api/send-email-local', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testEmail })
      });

      if (result.success) {
        log('✅ Email de prueba enviado exitosamente', colors.green);
        log(`📧 Message ID: ${result.data.data?.messageId || 'N/A'}`, colors.blue);
        resolve(true);
      } else {
        log('❌ Error enviando email de prueba', colors.red);
        console.log(result.error || result.data);
        resolve(false);
      }
    });
  });
}

async function testLeadMagnet() {
  return new Promise((resolve) => {
    log('\n🎯 Testing Lead Magnet completo...', colors.blue);
    
    rl.question('Nombre de prueba: ', (name) => {
      rl.question('Email de prueba: ', (email) => {
        rl.question('Teléfono de prueba (opcional): ', async (phone) => {
          
          if (!name || !email || !email.includes('@')) {
            log('❌ Datos inválidos', colors.red);
            resolve(false);
            return;
          }

          log(`\n📋 Procesando lead magnet para: ${name} <${email}>`, colors.yellow);
          
          const result = await makeRequest('http://localhost:3000/api/send-email-local', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              email,
              phone: phone || '',
              source: 'test-script'
            })
          });

          if (result.success) {
            log('✅ Lead magnet procesado exitosamente', colors.green);
            log(`📧 Email enviado con ID: ${result.data.data?.messageId || 'N/A'}`, colors.blue);
            log(`💾 Lead guardado: ${result.data.data?.leadSaved ? 'Sí' : 'No'}`, colors.blue);
            resolve(true);
          } else {
            log('❌ Error procesando lead magnet', colors.red);
            console.log(result.error || result.data);
            resolve(false);
          }
        });
      });
    });
  });
}

async function checkFiles() {
  log('\n📁 Verificando archivos necesarios...', colors.blue);
  
  const fs = require('fs');
  const path = require('path');
  
  const files = [
    'public/pdf/checklist-25-puntos.pdf',
    'data/leads.json',
    'src/lib/smtp-server.ts',
    'src/lib/email-service-local.ts',
    'src/app/api/send-email-local/route.ts'
  ];

  let allExists = true;
  
  for (const file of files) {
    if (fs.existsSync(file)) {
      log(`✅ ${file}`, colors.green);
    } else {
      log(`❌ ${file} - NO ENCONTRADO`, colors.red);
      allExists = false;
    }
  }
  
  return allExists;
}

async function showLeadsStats() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const leadsPath = path.join(process.cwd(), 'data/leads.json');
    const leadsData = fs.readFileSync(leadsPath, 'utf8');
    const leads = JSON.parse(leadsData);
    
    log(`\n📊 Estadísticas de leads:`, colors.blue);
    log(`📈 Total leads: ${leads.length}`, colors.yellow);
    
    if (leads.length > 0) {
      const lastLead = leads[leads.length - 1];
      log(`📧 Último lead: ${lastLead.name} <${lastLead.email}>`, colors.yellow);
      log(`📅 Fecha: ${new Date(lastLead.timestamp).toLocaleString()}`, colors.yellow);
    }
    
    // Agrupar por fuente
    const sources = leads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {});
    
    log(`📊 Por fuente:`, colors.yellow);
    Object.entries(sources).forEach(([source, count]) => {
      log(`  - ${source}: ${count}`, colors.yellow);
    });
    
  } catch (error) {
    log(`❌ Error leyendo estadísticas: ${error.message}`, colors.red);
  }
}

async function main() {
  log('🧪 Testing Sistema SMTP - CodigoFacil.com', colors.bold + colors.blue);
  log('='.repeat(60), colors.blue);
  
  // 1. Verificar configuración SMTP
  log('\n1️⃣ Verificando configuración SMTP...', colors.bold);
  const configOk = await checkSMTPConfig();
  if (!configOk) {
    log('\n❌ Configuración SMTP incompleta. Revisa .env.local', colors.red);
    log('📖 Ver: SMTP_CONFIGURACION.md para instrucciones', colors.blue);
    process.exit(1);
  }
  
  // 2. Verificar archivos
  log('\n2️⃣ Verificando archivos...', colors.bold);
  const filesOk = await checkFiles();
  if (!filesOk) {
    log('\n❌ Faltan archivos necesarios. Revisa la instalación.', colors.red);
    process.exit(1);
  }
  
  // 3. Verificar servicios
  log('\n3️⃣ Verificando servicios...', colors.bold);
  const serviceOk = await testServiceStatus();
  const pdfEndpointOk = await testSendPDFEndpoint();
  
  if (!serviceOk || !pdfEndpointOk) {
    log('\n❌ Algunos servicios no están funcionando. ¿Está el servidor corriendo?', colors.red);
    log('💡 Ejecuta: npm run dev', colors.yellow);
    process.exit(1);
  }
  
  // 4. Mostrar estadísticas
  log('\n4️⃣ Estadísticas actuales...', colors.bold);
  await showLeadsStats();
  
  // 5. Menú de testing
  console.log('\n' + '='.repeat(60));
  log('🔧 Opciones de testing:', colors.bold + colors.blue);
  log('1. Enviar email de prueba (desarrollo)');
  log('2. Probar lead magnet completo (/api/send-email-local)');
  log('3. Probar endpoint send-pdf (/api/send-pdf)');
  log('4. Ver estadísticas de leads');
  log('5. Ver configuración SMTP actual');
  log('6. Salir');
  
  rl.question('\nSelecciona una opción (1-6): ', async (option) => {
    switch (option) {
      case '1':
        await testEmailSending();
        break;
      case '2':
        await testLeadMagnet();
        break;
      case '3':
        await testSendPDFEndpoint();
        break;
      case '4':
        await showLeadsStats();
        break;
      case '5':
        await checkSMTPConfig();
        break;
      case '6':
        log('\n👋 ¡Hasta luego!', colors.blue);
        rl.close();
        return;
      default:
        log('\n❌ Opción inválida', colors.red);
        break;
    }
    
    rl.question('\n¿Continuar testing? (y/N): ', (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        main(); // Reiniciar menú
      } else {
        log('\n✅ Testing completado. ¡Sistema funcionando correctamente!', colors.green);
        rl.close();
      }
    });
  });
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(error => {
    log(`❌ Error fatal: ${error.message}`, colors.red);
    process.exit(1);
  });
}

module.exports = { main, testServiceStatus, testEmailSending, testLeadMagnet };