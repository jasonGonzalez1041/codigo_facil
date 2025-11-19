# 📧 Sistema de Email 100% Self-Hosted - CodigoFacil.com

## 🎯 Descripción

Sistema de envío de emails completamente **self-hosted** que NO depende de servicios externos como EmailJS, SendGrid, Resend o similares. Utiliza el servidor SMTP local del sistema operativo para máxima privacidad y control.

## ✅ Características

- ✅ **100% Self-hosted** - Sin servicios de terceros
- ✅ **Gratuito** - Sin costos mensuales ni limitaciones
- ✅ **PDF adjunto** - Envío automático del checklist
- ✅ **Base de datos local** - Leads guardados en JSON
- ✅ **Email templates** - HTML responsivo profesional
- ✅ **Validación robusta** - Zod schema validation
- ✅ **Logging completo** - Trazabilidad de envíos
- ✅ **Testing integrado** - Endpoints para pruebas

## 🚀 Cómo Funciona

### 1. Arquitectura del Sistema

```
Usuario llena formulario
         ↓
/api/send-email-local (Next.js API Route)
         ↓
LocalEmailService (Validación + Guardado)
         ↓
LocalSMTPServer (Envío con nodemailer)
         ↓
Servidor SMTP Local (sendmail/postfix)
         ↓
Email entregado con PDF adjunto
```

### 2. Componentes Principales

- **`src/lib/smtp-server.ts`** - Servidor SMTP local usando nodemailer
- **`src/lib/email-service-local.ts`** - Servicio de email con gestión de leads
- **`src/app/api/send-email-local/route.ts`** - API endpoint para formularios
- **`data/leads.json`** - Base de datos local de leads

## 🛠️ Configuración de Producción

### 1. Requisitos del Servidor

El servidor debe tener `sendmail` o `postfix` configurado:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install sendmail

# Verificar que funciona
echo "Test email" | sendmail tu@email.com
```

### 2. Variables de Entorno

Crea `.env.local` basado en `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Configura las variables:

```env
SMTP_FROM=noreply@codigofacil.com
NEXT_PUBLIC_SITE_URL=https://codigofacil.com
NODE_ENV=production
```

### 3. Permisos de Archivos

```bash
# Asegurar que Next.js puede escribir en data/
chmod 755 data/
chmod 644 data/leads.json
```

## 🔧 Desarrollo Local

### 1. Usando MailHog (Recomendado)

MailHog captura emails para testing local:

```bash
# Instalar MailHog
go install github.com/mailhog/MailHog@latest

# Ejecutar en puerto 1025
MailHog

# Ver emails en: http://localhost:8025
```

Configurar en `.env.local`:
```env
NODE_ENV=development
```

### 2. Testing del Sistema

```bash
# Verificar estado del servicio
curl http://localhost:3000/api/send-email-local

# Enviar email de prueba (solo desarrollo)
curl -X PUT http://localhost:3000/api/send-email-local \
  -H "Content-Type: application/json" \
  -d '{"testEmail": "test@ejemplo.com"}'

# Procesar lead magnet
curl -X POST http://localhost:3000/api/send-email-local \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@ejemplo.com",
    "phone": "+56912345678",
    "source": "test"
  }'
```

## 📊 Monitoreo y Logs

### 1. Verificar Estado del Servicio

El endpoint GET muestra el estado completo:

```bash
curl http://localhost:3000/api/send-email-local
```

Respuesta:
```json
{
  "status": "ok",
  "service": "local-email-service",
  "timestamp": "2025-01-27T...",
  "details": {
    "smtpReady": true,
    "leadsFileExists": true,
    "totalLeads": 15
  }
}
```

### 2. Logs de la Aplicación

Los logs aparecen en la consola de Next.js:

```
✅ Servidor SMTP local inicializado correctamente
📧 Email enviado (desarrollo): test@ejemplo.com
✅ Lead guardado: Test User (test@ejemplo.com)
📊 Resumen del envío: {...}
```

## 💾 Gestión de Leads

### 1. Archivo de Leads

Los leads se guardan en `data/leads.json`:

```json
[
  {
    "name": "María González",
    "email": "maria@ejemplo.com",
    "phone": "+56912345678",
    "timestamp": "2025-01-27T10:30:00.000Z",
    "source": "lead_magnet_checklist"
  }
]
```

### 2. Acceso a Leads

```typescript
import { getLocalEmailService } from '@/lib/email-service-local';

const emailService = getLocalEmailService();

// Contar leads
const count = await emailService.getLeadsCount();

// Obtener leads (últimos 10)
const leads = await emailService.getLeads(10);
```

## 🔒 Seguridad y Privacidad

### Ventajas del Sistema Self-Hosted

- ✅ **Sin terceros** - Los datos nunca salen de tu servidor
- ✅ **GDPR compliant** - Control total sobre datos personales
- ✅ **Sin límites** - Envíos ilimitados sin costos adicionales
- ✅ **Customizable** - Modificar cualquier parte del sistema
- ✅ **Backup local** - Todos los leads guardados localmente

### Consideraciones de Seguridad

- 🔒 Validación de datos con Zod
- 🔒 Rate limiting (implementar si es necesario)
- 🔒 Logs de auditoría completos
- 🔒 Sin almacenamiento de credenciales externas

## 🚨 Troubleshooting

### Error: "Servidor SMTP no inicializado"

1. Verificar que sendmail esté instalado y funcionando
2. Revisar permisos del usuario de Node.js
3. Usar MailHog en desarrollo

### Error: "Error enviando email"

1. Revisar logs de la aplicación
2. Verificar configuración SMTP en producción
3. Probar con email de test

### Leads no se guardan

1. Verificar permisos del directorio `data/`
2. Asegurar que el archivo `leads.json` existe
3. Revisar logs de errores de escritura

## 📈 Métricas y Analytics

### Dashboard de Leads (Futuro)

El sistema está preparado para agregar:

- 📊 Dashboard de leads en tiempo real
- 📈 Gráficos de conversión
- 📧 Tasa de entrega de emails
- 🎯 Análisis de fuentes de leads

### Exportación de Datos

```bash
# Backup de leads
cp data/leads.json backup/leads-$(date +%Y%m%d).json

# Exportar a CSV (script futuro)
node scripts/export-leads-csv.js
```

## 🆕 Próximas Mejoras

- [ ] Dashboard web para gestión de leads
- [ ] Exportación a CSV/Excel
- [ ] Templates de email personalizables
- [ ] Sistema de follow-up automático
- [ ] Integración con CRM
- [ ] A/B testing de emails
- [ ] Métricas de apertura/click (si se requiere)

---

## 🔧 Comandos Rápidos

```bash
# Desarrollo
npm run dev

# Verificar estado
curl localhost:3000/api/send-email-local

# Email de prueba
curl -X PUT localhost:3000/api/send-email-local \
  -H "Content-Type: application/json" \
  -d '{"testEmail": "test@ejemplo.com"}'

# Backup leads
cp data/leads.json backup/leads-$(date +%Y%m%d).json
```

---

**✅ Sistema implementado y funcionando al 100%**

*Documentación actualizada: Enero 2025 - CodigoFacil.com*