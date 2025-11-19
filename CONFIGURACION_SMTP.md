# 🚀 Configuración SMTP Self-Hosted - CodigoFacil.com

## ✅ Opción 1: Gmail SMTP (RECOMENDADO - 100% Gratuito)

### Paso a Paso:

#### 1. Configurar Gmail App Password
```bash
# Ir a: https://myaccount.google.com/security
# 1. Activar "Verificación en dos pasos" (si no está activada)
# 2. Buscar "Contraseñas de aplicaciones" 
# 3. Seleccionar "Correo" y "Otro dispositivo personalizado"
# 4. Nombrar: "CodigoFacil SMTP"
# 5. Copiar la contraseña de 16 caracteres generada
```

#### 2. Variables de Entorno
```bash
# Crear .env.local con:
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop  # ← Contraseña de App (16 caracteres)
INTERNAL_EMAIL=tu-email@gmail.com
```

#### 3. Instalar Dependencias
```bash
npm install nodemailer @types/nodemailer zod
```

#### 4. Verificar Funcionamiento
```bash
npm run dev
# Probar formulario en: http://localhost:3000/#lead-magnet
# Revisar logs en consola para verificar envío
```

---

## 🏢 Opción 2: Servidor SMTP Propio (Para VPS/Producción Avanzada)

### Opción A: Postal (Self-hosted Email Platform)
```bash
# En tu VPS Ubuntu 20.04+:
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Postal
git clone https://github.com/postalhq/postal.git
cd postal
sudo docker-compose up -d

# Configurar DNS:
# MX: mail.tudominio.com
# A: postal.tudominio.com → IP_VPS
# CNAME: mail.tudominio.com → postal.tudominio.com
```

### Configuración .env.local para Postal:
```bash
SMTP_HOST=mail.tudominio.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=no-reply@tudominio.com
SMTP_PASSWORD=password_generado_en_postal
INTERNAL_EMAIL=admin@tudominio.com
```

### Opción B: Postfix Simple (Más básico)
```bash
# En VPS:
sudo apt install postfix mailutils

# Configurar como "Internet Site"
# Domain name: tudominio.com

# Variables .env.local:
SMTP_HOST=tu-vps-ip.com
SMTP_PORT=25
SMTP_SECURE=false
SMTP_USER=""
SMTP_PASSWORD=""
```

---

## 🧪 Opción 3: Testing Local con MailHog

### Instalación:
```bash
# macOS:
brew install mailhog
mailhog

# Docker:
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog

# Variables .env.local:
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=""
SMTP_PASSWORD=""
```

### Uso:
- SMTP Server: localhost:1025
- Web UI: http://localhost:8025
- Todos los emails enviados aparecen en la interfaz web

---

## 🔧 Troubleshooting Común

### Error: "Authentication failed"
```bash
# Gmail: Verificar que App Password esté bien copiado (sin espacios)
# Verificar que 2FA esté activado en Gmail
```

### Error: "Connection refused"
```bash
# Verificar que el puerto SMTP esté abierto
# Para VPS: sudo ufw allow 587
```

### Error: "PDF not found"
```bash
# Verificar que existe: public/pdf/checklist-25-puntos.pdf
# Verificar permisos de lectura del archivo
```

### Logs de Debug:
```bash
# Activar logs detallados:
NODE_ENV=development npm run dev

# Ver logs del API:
# Consola del navegador en Network > api/send-pdf
# Terminal donde corre next dev
```

---

## 📊 Límites y Consideraciones

### Gmail SMTP Límites:
- **500 emails/día** (suficiente para lead magnets)
- **2000 destinatarios/día** máximo
- **Sin costo** adicional

### Servidor Propio Límites:
- **Sin límites** técnicos de volumen
- **Requiere configuración DNS** correcta
- **Mayor complejidad** de mantenimiento
- **Control total** sobre deliverability

---

## 🚀 Despliegue en Producción

### Vercel (Recomendado para Gmail SMTP):
```bash
# Configurar variables de entorno en Vercel Dashboard:
vercel env add SMTP_USER
vercel env add SMTP_PASSWORD  
vercel env add INTERNAL_EMAIL

# Deploy:
npm run vercel:deploy
```

### VPS con Docker:
```bash
# Dockerfile ya incluye las dependencias nodemailer
# Variables en docker-compose.yml o .env.production
```

---

## ✅ Checklist Final

- [ ] Variables de entorno configuradas en .env.local
- [ ] Gmail App Password generado (si usas Gmail)
- [ ] PDF existe en public/pdf/checklist-25-puntos.pdf
- [ ] Dependencias instaladas: `npm install`
- [ ] Formulario probado en desarrollo
- [ ] Emails llegando correctamente
- [ ] Página /gracias funcionando
- [ ] Variables configuradas en producción (Vercel/VPS)

---

## 🆘 Soporte

Si necesitas ayuda:
1. Verificar logs en consola del navegador
2. Verificar logs en terminal de Next.js
3. Probar con MailHog primero para descartar problemas de código
4. Verificar que el archivo PDF existe y tiene permisos correctos

**¡El sistema está listo para enviar +1000 emails/día completamente gratis con Gmail SMTP!** 🎉