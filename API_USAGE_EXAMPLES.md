# 📧 API Email Self-Hosted - Ejemplos de Uso

## 🎯 Endpoint Principal

```
POST /api/send-email
GET /api/send-email (test de configuración)
```

---

## 📝 Formato Principal: { name, phone, email }

### ✅ Lead Magnet (PDF adjunto)
```javascript
// Lead magnet con PDF adjunto automático
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan Pérez',
    phone: '+52 55 1234 5678',    // ← Opcional
    email: 'juan@example.com'
    // tipo: 'lead_magnet' ← Default automático
  })
});

// Respuesta esperada:
{
  "success": true,
  "message": "PDF enviado por email exitosamente",
  "data": {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "tipo": "lead_magnet",
    "timestamp": "2025-01-15T..."
  }
}
```

### ✅ Formulario de Contacto
```javascript
// Consulta general sin PDF
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'María García',
    phone: '+56 9 8765 4321',
    email: 'maria@example.com',
    tipo: 'contact_form'          // ← Especificar tipo
  })
});

// Respuesta esperada:
{
  "success": true,
  "message": "Consulta enviada exitosamente",
  "data": {
    "nombre": "María García",
    "email": "maria@example.com",
    "tipo": "contact_form",
    "timestamp": "2025-01-15T..."
  }
}
```

---

## 🔄 Retrocompatibilidad (Español)

### ✅ Formato Anterior Soportado
```javascript
// También acepta nombres en español
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Carlos López',       // ← name o nombre
    telefono: '+54 11 1234 5678', // ← phone o telefono  
    email: 'carlos@example.com',
    mensaje: 'Consulta personalizada',
    tipo: 'contact_form'
  })
});
```

---

## 🧪 Test de Configuración

### ✅ Verificar Estado del Servidor
```javascript
// GET para verificar configuración SMTP
const response = await fetch('/api/send-email');
const config = await response.json();

console.log(config);
// {
//   "success": true,
//   "message": "API de email funcionando",
//   "smtp_connected": true,        // ← ¡Importante!
//   "configuration": {
//     "smtp_host": "smtp.gmail.com",
//     "smtp_user": "Configurado",
//     "smtp_pass": "Configurado",
//     "admin_email": "admin@codigofacil.com"
//   }
// }
```

---

## ⚠️ Validaciones Implementadas

### ✅ Campos Obligatorios
```javascript
// ❌ Error - Datos faltantes
{
  "name": "",                    // ← Mínimo 2 caracteres
  "email": "email-invalido"      // ← Formato inválido
}

// Respuesta error:
{
  "success": false,
  "message": "Datos inválidos",
  "errors": [
    "name/nombre es requerido y debe tener al menos 2 caracteres",
    "Formato de email inválido"
  ]
}
```

### ✅ Campos Opcionales
```javascript
// ✅ Válido - Solo campos obligatorios
{
  "name": "Ana Silva",
  "email": "ana@example.com"
  // phone es opcional
  // tipo defaults a 'lead_magnet'
}
```

---

## 📧 Emails Enviados Automáticamente

### 🔔 Para el Administrador
```
De: CodigoFacil.com <tu-email@gmail.com>
Para: admin@codigofacil.com
Asunto: 🎁 Nueva descarga del lead magnet - Juan Pérez

[HTML profesional con toda la información del contacto]
```

### 📥 Para el Usuario (Lead Magnet)
```
De: CodigoFacil.com <tu-email@gmail.com>
Para: juan@example.com  
Asunto: 🎁 Tu PDF está listo - Checklist 25 Puntos para Web que Vende

[Adjunto: Checklist-25-Puntos-Web-Que-Vende.pdf]
[HTML profesional con enlaces y ofertas]
```

### 📥 Para el Usuario (Contact Form)
```
De: CodigoFacil.com <tu-email@gmail.com>
Para: maria@example.com
Asunto: ✅ Hemos recibido tu consulta - CodigoFacil.com

[HTML profesional con confirmación y datos de contacto]
```

---

## 🎯 Casos de Uso Comunes

### 1️⃣ **Formulario Lead Magnet Simple**
```html
<form id="leadForm">
  <input name="name" placeholder="Tu nombre" required>
  <input name="email" type="email" placeholder="Tu email" required>
  <button type="submit">Descargar PDF</button>
</form>

<script>
document.getElementById('leadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email')
      // Automáticamente tipo: 'lead_magnet'
    })
  });
  
  const result = await response.json();
  if (result.success) {
    alert('¡PDF enviado a tu email!');
  }
});
</script>
```

### 2️⃣ **Formulario Contacto Completo**
```html
<form id="contactForm">
  <input name="name" placeholder="Nombre" required>
  <input name="phone" placeholder="+52 55 1234 5678">
  <input name="email" type="email" placeholder="Email" required>
  <textarea name="message" placeholder="Tu mensaje"></textarea>
  <button type="submit">Enviar Consulta</button>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      mensaje: formData.get('message'),
      tipo: 'contact_form'
    })
  });
  
  const result = await response.json();
  if (result.success) {
    alert('¡Consulta enviada correctamente!');
  }
});
</script>
```

---

## 🔧 Testing Rápido

```bash
# 1. Verificar configuración
curl http://localhost:3000/api/send-email

# 2. Probar lead magnet
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# 3. Probar contacto
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"+52 55 1234","email":"test@example.com","tipo":"contact_form"}'
```

---

## 💡 Tips de Integración

### ✅ **React/Next.js**
```typescript
interface EmailRequest {
  name: string;
  phone?: string;
  email: string;
  tipo?: 'lead_magnet' | 'contact_form';
}

const sendEmail = async (data: EmailRequest) => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  return response.json();
};
```

### ✅ **Error Handling**
```javascript
try {
  const result = await sendEmail({
    name: 'Usuario',
    email: 'usuario@example.com'
  });
  
  if (result.success) {
    // Mostrar éxito
    showSuccess(result.message);
  } else {
    // Mostrar errores de validación
    showErrors(result.errors || [result.message]);
  }
} catch (error) {
  // Error de red o servidor
  showError('Error de conexión');
}
```

---

*API implementada: Enero 2025*  
*Formato principal: { name, phone, email }*  
*100% Self-hosted y gratuito*