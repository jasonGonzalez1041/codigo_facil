# 📧 Configuración SMTP para CodigoFacil.com

## 🎯 Sistema SMTP Implementado

El sistema usa **Node.js + nodemailer** puro, sin servicios de terceros. Soporta:

### ✅ **3 Opciones de Configuración**
1. **Gmail SMTP** - Para testing rápido y producción pequeña
2. **Servidor SMTP Propio** - Para producción profesional (Postal, Mailcow, Postfix)
3. **MailHog Local** - Para desarrollo sin envío real

---

## 🚀 **Opción 1: Gmail SMTP (Recomendado para inicio)**

### Configuración

1. **Crear App Password en Gmail:**
   - Ve a: https://myaccount.google.com/apppasswords
   - Selecciona "Mail" y el dispositivo
   - Copia la contraseña generada (16 caracteres)

2. **Configurar .env.local:**
```env
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop
SMTP_FROM=noreply@codigofacil.com
```

### ✅ **Ventajas:**
- Setup inmediato (2 minutos)
- Entrega confiable
- Sin configuración de servidor

### ⚠️ **Limitaciones:**
- 500 emails/día para cuentas gratuitas
- Aparece como "via gmail.com"
- Dependiente de Google

---

## 🏆 **Opción 2: Servidor SMTP Propio (Producción)**

### A. **Postal (Recomendado Self-Hosted)**

```bash
# Instalar Postal en Ubuntu
curl -L https://postal.atech.media/install.sh | sudo bash
```

Configuración .env.local:
```env
SMTP_HOST=postal.tudominio.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=codigofacil@tudominio.com
SMTP_PASS=tu-password-postal
SMTP_FROM=noreply@codigofacil.com
```

### B. **Mailcow (Docker)**

```bash
# Clonar e instalar Mailcow
git clone https://github.com/mailcow/mailcow-dockerized
cd mailcow-dockerized
./generate_config.sh
docker-compose up -d
```

Configuración .env.local:
```env
SMTP_HOST=mail.tudominio.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@tudominio.com
SMTP_PASS=mailcow-password
SMTP_FROM=noreply@codigofacil.com
```

### C. **Postfix Simple (VPS)**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postfix
sudo dpkg-reconfigure postfix
```

Configuración .env.local:
```env
SMTP_HOST=tu-vps.com
SMTP_PORT=25
SMTP_SECURE=false
# Sin autenticación si está en el mismo servidor
SMTP_FROM=noreply@codigofacil.com
```

---

## 🧪 **Opción 3: MailHog (Desarrollo)**

### Instalación

```bash
# Opción 1: Con Go
go install github.com/mailhog/MailHog@latest

# Opción 2: Con Docker
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog

# Ejecutar
MailHog
```

### Configuración .env.local:
```env
NODE_ENV=development
# MailHog se configura automáticamente
```

### Uso:
- Emails capturados en: http://localhost:8025
- No se envían emails reales
- Perfecto para testing

---

## ⚙️ **Variables de Entorno Completas**

```env
# ===== SMTP GENERAL =====
SMTP_FROM=noreply@codigofacil.com

# ===== GMAIL =====
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop

# ===== SMTP PERSONALIZADO =====
SMTP_HOST=mail.tudominio.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@tudominio.com
SMTP_PASS=password-seguro
SMTP_REJECT_UNAUTHORIZED=true

# ===== APLICACIÓN =====
NEXT_PUBLIC_SITE_URL=https://codigofacil.com
NODE_ENV=production
```

---

## 🧪 **Testing del Sistema**

### 1. **Verificar Estado:**
```bash
curl http://localhost:3000/api/send-pdf
```

### 2. **Script de Testing Interactivo:**
```bash
npm run test:smtp
```

### 3. **Envío de Prueba:**
```bash
curl -X POST http://localhost:3000/api/send-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+56912345678",
    "email": "test@ejemplo.com"
  }'
```

### 4. **Email de Testing (solo desarrollo):**
```bash
curl -X PUT http://localhost:3000/api/send-email-local \
  -H "Content-Type: application/json" \
  -d '{"testEmail": "test@ejemplo.com"}'
```

---

## 🔧 **Configuración DNS (Para SMTP Propio)**

### Registros Necesarios:

```dns
# MX Record
@    MX    10    mail.tudominio.com

# A Record  
mail    A    tu-ip-servidor

# SPF Record
@    TXT    "v=spf1 ip4:tu-ip-servidor include:_spf.google.com ~all"

# DKIM (generar con tu servidor de email)
default._domainkey    TXT    "v=DKIM1; k=rsa; p=TU_CLAVE_PUBLICA..."

# DMARC
_dmarc    TXT    "v=DMARC1; p=none; rua=mailto:dmarc@tudominio.com"
```

---

## 📊 **Logs y Monitoreo**

### Logs del Sistema:
```bash
# Ver logs en tiempo real
npm run dev
# Buscar líneas con ✅ ❌ 📧 📨
```

### Códigos de Estado:
- `✅ Servidor SMTP inicializado correctamente` - Todo OK
- `❌ Error inicializando servidor SMTP` - Revisar configuración
- `📧 Email enviado` - Envío exitoso
- `⚠️ Usando MailHog local como fallback` - Modo desarrollo

---

## 🚨 **Troubleshooting Común**

### **Error: "Authentication failed"**
- Verificar SMTP_USER y SMTP_PASS
- Para Gmail: verificar App Password

### **Error: "Connection timeout"**
- Verificar SMTP_HOST y SMTP_PORT
- Revisar firewall del servidor

### **Error: "Self signed certificate"**
```env
SMTP_REJECT_UNAUTHORIZED=false
```

### **Emails van a spam**
- Configurar SPF, DKIM, DMARC
- Usar dominio con buena reputación
- Calentar la IP enviando gradualmente

---

## 🎯 **Recomendaciones por Uso**

### **🧪 Desarrollo/Testing:**
- Usar **MailHog** - Captura emails sin envío real

### **🚀 Lanzamiento Rápido:**
- Usar **Gmail SMTP** - Setup en minutos, confiable

### **🏢 Producción Profesional:**
- Usar **Postal/Mailcow** - Control total, dominio propio

### **📈 Alto Volumen:**
- Usar **Postal con múltiples IPs** - Escalable ilimitadamente

---

## 📋 **Checklist de Configuración**

- [ ] Variables de entorno configuradas
- [ ] DNS configurado (si usas dominio propio)
- [ ] Servidor SMTP funcionando
- [ ] Test de envío exitoso
- [ ] PDF adjunto funcionando
- [ ] Leads guardándose correctamente
- [ ] Logs monitoreándose

---

**✅ Sistema 100% Node.js + SMTP propio - Sin dependencias externas**

*Documentación actualizada: Enero 2025*