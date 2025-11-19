# 🚀 Setup de Producción - Gmail SMTP (5 minutos)

## ⚡ **Configuración Automática (Recomendada)**

```bash
# 1. Ejecutar configuración automática
npm run setup:gmail

# 2. Seguir las instrucciones en pantalla
# 3. ¡Listo! El sistema estará configurado
```

## 📋 **Configuración Manual (Si prefieres hacerlo paso a paso)**

### **Paso 1: Crear App Password en Gmail**

1. **Ve a:** https://myaccount.google.com/apppasswords
2. **Selecciona:** "Mail" como aplicación
3. **Selecciona:** "Other (Custom name)" → escribe "CodigoFacil"
4. **Copia** la contraseña de 16 caracteres (ej: `abcd efgh ijkl mnop`)

### **Paso 2: Configurar Variables de Entorno**

Crea `.env.local` con:

```env
# Gmail SMTP
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop

# Configuración general
SMTP_FROM=noreply@codigofacil.com
NEXT_PUBLIC_SITE_URL=https://codigofacil.com
NODE_ENV=production
```

### **Paso 3: Verificar Configuración**

```bash
# Probar el sistema completo
npm run test:smtp

# Verificar estado rápido
npm run test:email
```

---

## ✅ **¿Por qué Gmail SMTP?**

### **🎯 Ventajas para Producción**
- ✅ **Setup en 5 minutos** - Sin configurar servidores
- ✅ **99.9% uptime** - Infraestructura Google
- ✅ **Entrega garantizada** - Buena reputación automática
- ✅ **SSL/TLS automático** - Seguridad sin configuración
- ✅ **Sin mantenimiento** - Google maneja todo
- ✅ **Gratis** - Sin costos adicionales

### **📊 Capacidades**
- **Límite**: 500 emails/día por cuenta Gmail
- **Velocidad**: Entrega inmediata
- **Adjuntos**: Hasta 25MB por email
- **Seguridad**: Encriptación automática

---

## 🚨 **Troubleshooting Común**

### **Error: "Invalid login"**
- ✅ Verifica que usas la **App Password** (16 caracteres)
- ✅ NO uses la contraseña normal de Gmail
- ✅ Asegúrate de tener **2FA activado**

### **Error: "Authentication failed"**
- ✅ Recrea la App Password en Google
- ✅ Verifica que no hay espacios extra en las credenciales
- ✅ Confirma el email exacto

### **Emails van a spam**
- ✅ Usa un `SMTP_FROM` con dominio válido
- ✅ Incluye contenido de calidad en el email
- ✅ Evita palabras "spam" en el asunto

---

## 🎯 **Testing de Producción**

### **1. Verificar Estado del Sistema**
```bash
curl https://tudominio.com/api/send-pdf
```

### **2. Enviar Email de Prueba**
```bash
curl -X POST https://tudominio.com/api/send-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Producción",
    "phone": "+56912345678",
    "email": "test@tudominio.com"
  }'
```

### **3. Verificar Entrega**
- ✅ Email recibido en bandeja de entrada
- ✅ PDF adjunto descargable
- ✅ Links funcionando correctamente
- ✅ Diseño HTML correcto

---

## 📈 **Escalabilidad**

### **Para Más de 500 emails/día:**

**Opción 1: Múltiples cuentas Gmail**
```env
# Rotar entre múltiples cuentas automáticamente
GMAIL_USER_1=cuenta1@gmail.com
GMAIL_APP_PASSWORD_1=xxxx-xxxx-xxxx-xxxx
GMAIL_USER_2=cuenta2@gmail.com  
GMAIL_APP_PASSWORD_2=yyyy-yyyy-yyyy-yyyy
```

**Opción 2: Servidor SMTP Propio**
```env
# Migrar a Postal/Mailcow para volumen ilimitado
SMTP_HOST=postal.tudominio.com
SMTP_PORT=587
SMTP_USER=noreply@tudominio.com
SMTP_PASS=password-postal
```

---

## 🔒 **Seguridad en Producción**

### **Variables de Entorno**
- ✅ Nunca commitear `.env.local` a git
- ✅ Usar credenciales diferentes para dev/prod
- ✅ Rotar App Passwords periódicamente
- ✅ Monitorear logs de envío

### **Backup de Leads**
```bash
# Automatizar backup diario
cp data/leads.json backup/leads-$(date +%Y%m%d).json
```

### **Monitoreo**
- 📊 Revisar logs de envío diariamente
- 📊 Monitorear tasa de entrega
- 📊 Verificar leads guardándose correctamente

---

## 🎯 **Configuración Completa Lista**

Una vez completado el setup:

### **URLs Disponibles:**
- `GET /api/send-pdf` - Estado del servicio
- `POST /api/send-pdf` - Enviar PDF con datos completos
- `GET /api/send-email-local` - Estado del sistema de email

### **Archivos Creados:**
- ✅ `.env.local` - Credenciales de producción
- ✅ `data/leads.json` - Base de datos de leads
- ✅ Logs automáticos en consola

### **Scripts Disponibles:**
- `npm run setup:gmail` - Configuración automática
- `npm run test:smtp` - Testing completo
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción

---

## 📞 **Soporte**

Si tienes problemas:

1. **Ejecuta:** `npm run test:smtp` para diagnóstico completo
2. **Revisa:** Los logs en la consola del servidor
3. **Verifica:** Las credenciales en `.env.local`
4. **Consulta:** `SMTP_CONFIGURACION.md` para detalles avanzados

---

**✅ Con Gmail SMTP tendrás un sistema de email robusto y confiable en menos de 5 minutos**

*Documentación actualizada: Enero 2025 - CodigoFacil.com*