# Configuración de Variables de Entorno en Vercel

## Estado del Proyecto

El build del proyecto ahora funciona correctamente en Vercel. Sin embargo, para que la integración con WooCommerce funcione, necesitas configurar las variables de entorno en Vercel.

## Variables de Entorno Requeridas

Debes agregar las siguientes 4 variables de entorno en tu proyecto de Vercel:

### 1. NEXT_PUBLIC_SITE_URL
- **Valor**: La URL de tu sitio en Vercel (ej: `https://dibubaron.vercel.app`)
- **Descripción**: URL pública del sitio para SEO y metadata

### 2. NEXT_PUBLIC_WOOCOMMERCE_URL
- **Valor**: `https://lightpink-gnu-805963.hostingersite.com`
- **Descripción**: URL de tu tienda WooCommerce

### 3. WOOCOMMERCE_CONSUMER_KEY
- **Valor**: [OBTENER DE WOOCOMMERCE ADMIN]
- **Descripción**: Consumer Key de la API de WooCommerce
- **⚠️ IMPORTANTE**: Genera una nueva clave desde tu panel de WooCommerce

### 4. WOOCOMMERCE_CONSUMER_SECRET
- **Valor**: [OBTENER DE WOOCOMMERCE ADMIN]
- **Descripción**: Consumer Secret de la API de WooCommerce
- **⚠️ IMPORTANTE**: Genera una nueva clave desde tu panel de WooCommerce

## Cómo Configurar en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto "dibubaron"
3. Ve a **Settings** → **Environment Variables**
4. Agrega cada variable con los siguientes ajustes:
   - **Key**: Nombre de la variable (ej: `NEXT_PUBLIC_SITE_URL`)
   - **Value**: El valor correspondiente
   - **Environments**: Selecciona los 3 checkboxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
5. Haz clic en "Save" para cada variable

## Cómo Generar las Claves de WooCommerce

1. Inicia sesión en tu panel de administración de WooCommerce
2. Ve a **WooCommerce** → **Settings** → **Advanced** → **REST API**
3. Haz clic en "Add Key"
4. Configura:
   - **Description**: "Vercel Dibubaron Site"
   - **User**: Tu usuario admin
   - **Permissions**: Read/Write
5. Haz clic en "Generate API Key"
6. **IMPORTANTE**: Copia inmediatamente las claves generadas:
   - Consumer Key (ck_...)
   - Consumer Secret (cs_...)
7. Pega estos valores en las variables de entorno de Vercel

## Después de Configurar

1. Una vez agregadas todas las variables, Vercel automáticamente redesplegará tu proyecto
2. Verifica que el sitio funcione correctamente visitando:
   - `/` (página principal)
   - `/tienda` (debe mostrar productos)
   - `/api/products` (debe retornar JSON con productos)
   - `/api/categories` (debe retornar JSON con categorías)

## Comportamiento Sin Variables de Entorno

Si las variables NO están configuradas:
- ✅ El build se completará exitosamente
- ✅ El sitio cargará normalmente
- ❌ Los productos NO se mostrarán (arrays vacíos)
- ❌ Las categorías NO se mostrarán
- ⚠️ Las rutas API retornarán arrays vacíos `[]` en lugar de error

## Solución de Problemas

### El sitio carga pero no muestra productos

1. Verifica que todas las 4 variables estén configuradas en Vercel
2. Verifica que las claves de WooCommerce sean válidas
3. Revisa los logs de Vercel para ver si hay errores de API
4. Asegúrate de que la URL de WooCommerce sea accesible desde internet

### Error 500 en las rutas API

1. Revisa los logs de función en Vercel Dashboard
2. Verifica que el Consumer Key y Secret sean correctos
3. Asegúrate de que la API REST de WooCommerce esté habilitada

### Las variables no se aplican

1. Después de agregar variables, Vercel debe redesplegar automáticamente
2. Si no redesplega, fuerza un nuevo deployment desde el dashboard
3. Limpia la caché del navegador

## Seguridad

- ❌ **NUNCA** compartas las claves Consumer Key y Consumer Secret públicamente
- ❌ **NUNCA** las commits en el repositorio Git
- ✅ Solo configúralas en el panel de Vercel (están encriptadas)
- ✅ Regenera las claves si sospechas que fueron comprometidas

## Estado Actual del Código

- ✅ Build optimizado para Vercel
- ✅ Lazy initialization del cliente WooCommerce
- ✅ Verificación de credenciales antes de llamadas API
- ✅ Timeout de funciones aumentado a 30 segundos
- ✅ Manejo de errores robusto

El sitio está listo para desplegar en Vercel. Solo falta configurar las variables de entorno.
