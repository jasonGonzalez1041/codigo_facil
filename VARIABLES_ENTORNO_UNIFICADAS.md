# Variables de Entorno Unificadas - CodigoFacil.com

## 🎯 **Objetivo**

Se han unificado todas las variables de entorno en un solo archivo `.env.example` para eliminar duplicación y mejorar la consistencia del proyecto.

## 📋 **Cambios Realizados**

### **✅ Archivos Eliminados:**
- `.env.local.example` - Eliminado (duplicado)
- `.env.local.production` - Eliminado (duplicado)

### **✅ Archivo Principal:**
- `.env.example` - Archivo unificado con todas las variables organizadas por categorías

### **✅ Código Actualizado:**
- `src/app/layout.tsx` - Ahora usa variables de entorno para metadatos
- `src/lib/smtp-server.ts` - Ya estaba usando variables correctas

## 📂 **Estructura de Variables Unificada**

### **🌐 Configuración del Sitio**
```env
NEXT_PUBLIC_SITE_URL=https://codigofacil.com
NEXT_PUBLIC_SITE_NAME="CodigoFacil.com"
NEXT_PUBLIC_SITE_DESCRIPTION="Desarrollo web profesional para LATAM"
NEXT_PUBLIC_COMPANY_NAME="CodigoFacil"
```

### **📧 Sistema SMTP**
```env
# Opción 1: Gmail SMTP (Recomendado)
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop

# Opción 2: Servidor SMTP personalizado
SMTP_HOST=mail.tudominio.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@tudominio.com
SMTP_PASS=password-seguro

# Configuración general
SMTP_FROM=noreply@codigofacil.com
ADMIN_EMAIL=vecipremiun@gmail.com
```

### **📊 Analytics**
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS=true
```

### **📱 WhatsApp**
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=56950225491
```

### **💾 Archivos de Datos**
```env
LEADS_DATA_PATH=data/leads.json
DOWNLOAD_STATS_PATH=data/download-stats.json
```

### **🔧 Desarrollo**
```env
NODE_ENV=production
DEBUG=false
VERCEL_ENV=production
```

## 🚀 **Beneficios de la Unificación**

1. **✅ Eliminación de duplicación** - Un solo lugar para todas las variables
2. **✅ Mejor organización** - Variables agrupadas por categorías
3. **✅ Documentación completa** - Ejemplos para diferentes entornos
4. **✅ Consistencia** - Mismo formato en todo el proyecto
5. **✅ Fácil mantenimiento** - Cambios en un solo archivo
6. **✅ Guías de seguridad** - Mejores prácticas incluidas

## 📝 **Cómo Usar**

1. **Copia el archivo ejemplo:**
   ```bash
   cp .env.example .env.local
   ```

2. **Completa con valores reales:**
   - Configura Gmail SMTP o servidor personalizado
   - Agrega Analytics IDs si tienes
   - Ajusta URLs según entorno (dev/prod)

3. **Variables obligatorias mínimas:**
   ```env
   NEXT_PUBLIC_SITE_URL=tu-url
   GMAIL_USER=tu-email@gmail.com
   GMAIL_APP_PASSWORD=tu-app-password
   SMTP_FROM=noreply@tudominio.com
   ADMIN_EMAIL=admin@tudominio.com
   ```

## 🛡️ **Seguridad**

- ✅ `.env.local` está en `.gitignore`
- ✅ Solo `.env.example` se commitea (sin valores reales)
- ✅ Guías de seguridad incluidas en el archivo
- ✅ Recomendaciones para rotación de passwords

## 🔄 **Migración desde Archivos Anteriores**

Si tenías archivos `.env` anteriores:

1. Copia valores importantes a `.env.local`
2. Usa la nueva estructura de variables
3. Elimina archivos `.env` obsoletos
4. Verifica que todo funciona correctamente

## 📚 **Documentación Adicional**

- Ver `.env.example` para ejemplos completos
- Revisar comentarios en el archivo para cada variable
- Consultar secciones de configuración específicas según necesidad

---

**Fecha:** Noviembre 2025  
**Estado:** ✅ Implementado  
**Mantenimiento:** Actualizar cuando se agreguen nuevas funcionalidades