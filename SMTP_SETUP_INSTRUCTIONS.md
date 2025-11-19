# 📧 Configuración SMTP Self-Hosted - CodigoFacil.com

## 🚀 Sistema Implementado

✅ **EmailJS ELIMINADO** - Ahora 100% self-hosted  
✅ **Nodemailer integrado** - Envío directo desde servidor  
✅ **PDF adjunto automático** - Para lead magnet  
✅ **Templates profesionales** - HTML + texto plano  
✅ **Doble envío** - Admin + cliente automático  

---

## ⚡ Configuración Rápida (Gmail SMTP)

### 1. Crear App Password en Gmail

1. Ve a tu **cuenta de Google** → Seguridad
2. Activa la **verificación en 2 pasos** (obligatorio)
3. Ve a **Contraseñas de aplicaciones**
4. Genera una nueva para "Mail" o "Otra aplicación"
5. **Copia el password generado** (16 caracteres)

### 2. Configurar Variables de Entorno

Edita tu archivo `.env.local`:

```bash
# Email Self-Hosted Configuration - Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop  # ← App password generado
SMTP_FROM=tu-email@gmail.com
ADMIN_EMAIL=admin@codigofacil.com
```

### 3. Probar Configuración

```bash
# Verificar que el servidor está funcionando
npm run dev

# Probar la conexión SMTP
curl http://localhost:3000/api/send-email

# Deberías ver:
# {
#   "success": true,
#   "smtp_connected": true,
#   "configuration": {...}
# }
```

---

## 🏗️ Configuración Servidor SMTP Propio

### Opción A: VPS con Postfix (Más Control)

```bash
# Instalar Postfix en Ubuntu/Debian
sudo apt update
sudo apt install postfix

# Configurar en .env.local
SMTP_HOST=tu-servidor.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@tudominio.com
SMTP_PASS=tu-contraseña-segura
SMTP_FROM=noreply@tudominio.com
ADMIN_EMAIL=admin@tudominio.com
```

### Opción B: Docker SMTP Server

```yaml
# docker-compose.yml
version: '3'
services:
  mailhog:
    image: mailhog/mailhog:latest
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI
```

```bash
# .env.local para MailHog (desarrollo)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@codigofacil.com
ADMIN_EMAIL=admin@codigofacil.com
```

---

## 🧪 Testing del Sistema

### Test Automático

```bash
# GET request para verificar configuración
curl http://localhost:3000/api/send-email

# POST request para enviar email de prueba
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "mensaje": "Email de prueba",
    "tipo": "lead_magnet"
  }'
```

### Test Manual

1. Ve a `http://localhost:3000`
2. Scroll hasta la sección **"Guía Gratuita"**
3. Completa el formulario con tu email real
4. Verifica que recibes:
   - Email con PDF adjunto
   - Descarga automática del PDF
   - Mensaje de confirmación

---

## 📋 Funcionalidades Implementadas

### ✅ Lead Magnet (Sección Principal)
- **Formulario**: Nombre + Email
- **Email al admin**: Notificación de nueva descarga
- **Email al usuario**: PDF adjunto + mensaje de bienvenida
- **Descarga automática**: PDF se descarga inmediatamente
- **Analytics**: Tracking de conversiones

### ✅ Formulario de Contacto (Sección Contacto)
- **Formulario 2 pasos**: Datos básicos → Detalles del proyecto
- **Email al admin**: Información completa de la consulta
- **Email al usuario**: Confirmación de recepción
- **WhatsApp integration**: Enlace directo con datos pre-llenados

---

## 🔧 Estructura de Archivos Creados

```
src/
├── lib/
│   └── email-service.ts          # ← Servicio SMTP self-hosted
├── app/api/
│   └── send-email/
│       └── route.ts              # ← API endpoint para emails
└── components/
    ├── layout/
    │   └── LeadCaptureSection.tsx # ← Actualizado sin EmailJS
    └── ui/
        └── contact-form-latam.tsx # ← Actualizado sin EmailJS
```

---

## 📧 Templates de Email

### Para Lead Magnet
- **Asunto**: "🎁 Tu PDF está listo - Checklist 25 Puntos para Web que Vende"
- **Contenido**: PDF adjunto + oferta de consultoría gratuita
- **Call-to-action**: WhatsApp directo

### Para Formulario de Contacto
- **Asunto**: "✅ Hemos recibido tu consulta - CodigoFacil.com"
- **Contenido**: Confirmación + datos de contacto
- **Tiempo de respuesta**: Promesa de 2 horas

---

## 🛡️ Seguridad y Mejores Prácticas

### Variables de Entorno
- ✅ **Nunca** commits passwords en el código
- ✅ Usa **app passwords** para Gmail (más seguro)
- ✅ **SMTP_SECURE=false** para puerto 587
- ✅ **TLS automático** configurado

### Rate Limiting (Recomendado)
```typescript
// Implementar en route.ts si es necesario
const rateLimitMap = new Map();

// Limitar a 5 emails por IP por hora
if (rateLimitMap.get(ip) > 5) {
  return NextResponse.json(
    { success: false, message: 'Rate limit exceeded' }, 
    { status: 429 }
  );
}
```

---

## 🔄 Migración de EmailJS

### ❌ Removido
- `@emailjs/browser` dependency
- Variables `NEXT_PUBLIC_EMAILJS_*`
- Configuraciones EmailJS

### ✅ Agregado
- `nodemailer` + `@types/nodemailer`
- Variables `SMTP_*`
- API route `/api/send-email`
- Servicio self-hosted completo

---

## 🚨 Troubleshooting

### Error: "SMTP not configured"
```bash
# Verificar variables de entorno
echo $SMTP_HOST
echo $SMTP_USER

# Deben estar definidas en .env.local
```

### Error: "Authentication failed"
```bash
# Gmail: Verificar app password
# - No uses tu contraseña normal
# - Usa el password de 16 dígitos generado

# Servidor propio: Verificar credenciales
# - Usuario y contraseña correctos
# - Puerto correcto (587 para STARTTLS)
```

### Error: "Connection refused"
```bash
# Gmail: Verificar puerto 587
# Servidor propio: Verificar firewall
sudo ufw allow 587
```

### PDF no se adjunta
```bash
# Verificar que el archivo existe
ls -la public/pdf/checklist-25-puntos.pdf

# Debe tener contenido (no solo 4 bytes)
```

---

## 🎯 Próximos Pasos

### Inmediatos
1. **Configurar Gmail SMTP** con app password
2. **Probar lead magnet** con email real
3. **Verificar PDF adjunto** en email recibido

### Opcional
1. **Servidor SMTP propio** para mayor control
2. **Rate limiting** para prevenir spam
3. **Analytics avanzado** de emails enviados
4. **Templates más elaborados** con mejor diseño

---

## 📊 Beneficios vs EmailJS

| Aspecto | EmailJS | Self-Hosted |
|---------|---------|-------------|
| **Costo** | Limitado gratis | 100% Gratuito |
| **Control** | Limitado | Total |
| **Privacidad** | Datos en terceros | Todo interno |
| **Customización** | Básica | Completa |
| **Dependencies** | Cliente + servicio | Solo servidor |
| **PDF adjunto** | No directo | ✅ Nativo |
| **Escalabilidad** | Limitada | Ilimitada |

---

*Sistema implementado: Enero 2025*  
*Siguiente revisión: Configurar servidor SMTP propio*