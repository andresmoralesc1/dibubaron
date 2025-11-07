# 🔐 Configuración de Variables de Entorno en Vercel

## Variables Requeridas

Para que DibuBaron funcione correctamente en Vercel, debes configurar estas 4 variables de entorno:

### 1. NEXT_PUBLIC_SITE_URL
**Valor**: `https://dibubaron.vercel.app` (o tu dominio custom)
**Descripción**: URL base del sitio para SEO y sitemap
**Scope**: Production, Preview, Development

### 2. NEXT_PUBLIC_WOOCOMMERCE_URL
**Valor**: `https://lightpink-gnu-805963.hostingersite.com`
**Descripción**: URL de tu tienda WooCommerce
**Scope**: Production, Preview, Development

### 3. WOOCOMMERCE_CONSUMER_KEY
**Valor**: `ck_81052fe18b42f9f6d2462dece937bbde029e17e2`
**Descripción**: Consumer Key de WooCommerce API
**Scope**: Production, Preview, Development
**⚠️ SENSIBLE**: No compartir públicamente

### 4. WOOCOMMERCE_CONSUMER_SECRET
**Valor**: `cs_585b2f7b44d80547b1ad5edfe9cc3ad389061b3a`
**Descripción**: Consumer Secret de WooCommerce API
**Scope**: Production, Preview, Development
**⚠️ SENSIBLE**: No compartir públicamente

---

## 📋 Pasos para Configurar en Vercel

### Opción 1: Dashboard Web (Recomendado)

1. **Ir a tu proyecto en Vercel**
   - https://vercel.com/dashboard

2. **Acceder a Settings**
   - Click en tu proyecto "dibubaron"
   - Click en "Settings" en la navegación superior

3. **Abrir Environment Variables**
   - En el menú lateral: "Environment Variables"

4. **Agregar cada variable**:
   ```
   Name: NEXT_PUBLIC_SITE_URL
   Value: https://dibubaron.vercel.app
   Environments: ✅ Production ✅ Preview ✅ Development
   [Add]
   ```

5. **Repetir para las otras 3 variables**

6. **Re-deploy**
   - Click en "Deployments"
   - Click en los 3 puntos (⋮) del último deployment
   - Click "Redeploy"
   - ✅ El sitio ahora debería funcionar

---

### Opción 2: CLI (Para desarrolladores)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Link al proyecto
vercel link

# Agregar variables (una por una)
vercel env add NEXT_PUBLIC_SITE_URL production
# Pegar valor: https://dibubaron.vercel.app

vercel env add NEXT_PUBLIC_WOOCOMMERCE_URL production
# Pegar valor: https://lightpink-gnu-805963.hostingersite.com

vercel env add WOOCOMMERCE_CONSUMER_KEY production
# Pegar valor: ck_81052fe18b42f9f6d2462dece937bbde029e17e2

vercel env add WOOCOMMERCE_CONSUMER_SECRET production
# Pegar valor: cs_585b2f7b44d80547b1ad5edfe9cc3ad389061b3a

# Re-deploy
vercel --prod
```

---

## ✅ Verificación

Después de configurar las variables:

1. **Check Vercel Dashboard**:
   - Settings → Environment Variables
   - Deberías ver 4 variables configuradas

2. **Check Deployment Logs**:
   - Deployments → Click en el último
   - Build Logs → Buscar "Environments: .env"
   - Debería mostrar las 4 variables cargadas

3. **Test en producción**:
   ```bash
   curl https://tu-sitio.vercel.app/api/products
   # Debería devolver JSON con productos, no error
   ```

---

## 🚨 Problemas Comunes

### "Failed to fetch products"
**Causa**: Variables no configuradas o scope incorrecto
**Solución**: Verifica que cada variable tenga checked ✅ "Production"

### "Consumer Key is required"
**Causa**: Variable WOOCOMMERCE_CONSUMER_KEY no cargada
**Solución**: Re-deploy después de agregar variables

### "Invalid URL"
**Causa**: NEXT_PUBLIC_WOOCOMMERCE_URL tiene espacios o formato incorrecto
**Solución**: Asegúrate que empiece con `https://`

---

## 🔒 Seguridad

⚠️ **IMPORTANTE**:
- **NO** subir `.env.local` a Git (ya está en .gitignore ✅)
- **NO** compartir Consumer Key/Secret públicamente
- **SÍ** rotar credenciales si se exponen
- **SÍ** usar permisos de "Lectura" solo en WooCommerce API

---

## 📞 Soporte

Si después de configurar todo correctamente el sitio aún no funciona:

1. Verifica logs de Vercel: Deployments → Runtime Logs
2. Revisa AUDITORIA_DEPLOYMENT_VERCEL.md
3. Contacta soporte de Vercel: https://vercel.com/support
