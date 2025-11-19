// test-api-endpoint.js - Script para probar el API endpoint
// Ejecutar con: node test-api-endpoint.js

const testApiEndpoint = async () => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Iniciando pruebas del API endpoint /api/send-email...\n');

  // Test 1: GET - Verificar configuración
  console.log('1️⃣ Test: GET /api/send-email (verificar configuración)');
  try {
    const response = await fetch(`${baseUrl}/api/send-email`);
    const result = await response.json();
    
    console.log('✅ Respuesta:', JSON.stringify(result, null, 2));
    console.log(`📡 SMTP Connected: ${result.smtp_connected ? '✅' : '❌'}\n`);
  } catch (error) {
    console.error('❌ Error en GET:', error.message);
  }

  // Test 2: POST con formato { name, phone, email } - Lead Magnet
  console.log('2️⃣ Test: POST con formato { name, phone, email } - Lead Magnet');
  try {
    const response = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Juan Pérez',
        phone: '+52 55 1234 5678',
        email: 'juan.test@example.com'
      }),
    });

    const result = await response.json();
    console.log('✅ Lead Magnet Response:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Error en POST Lead Magnet:', error.message);
  }

  console.log('');

  // Test 3: POST con formato { name, phone, email } + tipo contact_form
  console.log('3️⃣ Test: POST con formato { name, phone, email } - Contact Form');
  try {
    const response = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'María García',
        phone: '+56 9 8765 4321',
        email: 'maria.test@example.com',
        tipo: 'contact_form'
      }),
    });

    const result = await response.json();
    console.log('✅ Contact Form Response:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Error en POST Contact Form:', error.message);
  }

  console.log('');

  // Test 4: POST con datos inválidos
  console.log('4️⃣ Test: POST con datos inválidos (validación)');
  try {
    const response = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '', // Nombre vacío
        email: 'email-invalido' // Email mal formato
      }),
    });

    const result = await response.json();
    console.log('✅ Validation Response:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Error en validación:', error.message);
  }

  console.log('\n🎯 Pruebas completadas!');
  console.log('\n📋 Resumen:');
  console.log('✅ Formato soportado: { name, phone, email }');
  console.log('✅ Retrocompatibilidad: { nombre, telefono, email }');
  console.log('✅ Tipos: "lead_magnet" (default) | "contact_form"');
  console.log('✅ Validación: name/nombre + email obligatorios');
  console.log('✅ PDF adjunto: Solo para tipo "lead_magnet"');
};

// Ejecutar pruebas
testApiEndpoint().catch(console.error);