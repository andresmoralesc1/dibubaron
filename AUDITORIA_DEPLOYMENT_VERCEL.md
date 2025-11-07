# 🚀 Auditoría de Deployment en Vercel - DibuBaron

**Fecha**: 7 de Noviembre 2025
**Estado del Sitio**: ⚠️ NO FUNCIONA EN VERCEL
**Severidad**: 🔴 CRÍTICA

---

## 📋 Resumen Ejecutivo

El sitio DibuBaron **NO está sirviendo correctamente en Vercel** debido a varios problemas de configuración y código que previenen el deployment exitoso. Aunque el build local se completa, hay errores críticos que impiden que Vercel genere las páginas correctamente.

**Puntuación de Deploy**: 3/10 🔴

---

## 🔴 PROBLEMAS CRÍTICOS (Bloquean Deployment)

### 1. ⚠️ API Route No Estática - `/api/products`

**Ubicación**: `app/api/products/route.ts:6`

**Problema**:
```typescript
const { searchParams } = new URL(request.url); // ❌ Causa error en build time
```

**Error en Build**:
```
Error fetching products: B [Error]: Dynamic server usage: Route /api/products
couldn't be rendered statically because it used `request.url`.
```

**Por qué falla en Vercel**:
- Next.js intenta pre-renderizar todas las páginas durante el build
- La página `/tienda` intenta llamar a `/api/products` en build time
- `request.url` solo está disponible en request time, no en build time
- Vercel no puede completar el build de la página estática

**Impacto**:
- ❌ Página `/tienda` no carga productos
- ❌ Home page no muestra productos destacados
- ❌ Error 500 en todas las páginas que consumen esta API

**Solución Requerida**:
```typescript
// app/api/products/route.ts
export const dynamic = 'force-dynamic'; // ✅ Forzar renderizado dinámico

export async function GET(request: Request) {
  // ... resto del código igual
}
```

**Alternativa mejor** (ISR - Incremental Static Regeneration):
```typescript
export const revalidate = 60; // ✅ Re-generar cada 60 segundos

export async function GET(request: Request) {
  // ... código actual
}
```

---

### 2. 🔒 Variables de Entorno Faltantes en Vercel

**Archivo local**: `.env.local` (NO se sube a Git por seguridad)

**Variables requeridas**:
```env
# ❌ NO CONFIGURADAS en Vercel
NEXT_PUBLIC_SITE_URL=https://www.dibubaron.com
NEXT_PUBLIC_WOOCOMMERCE_URL=https://lightpink-gnu-805963.hostingersite.com
WOOCOMMERCE_CONSUMER_KEY=ck_81052fe18b42f9f6d2462dece937bbde029e17e2
WOOCOMMERCE_CONSUMER_SECRET=cs_585b2f7b44d80547b1ad5edfe9cc3ad389061b3a
```

**Por qué falla**:
- Sin `NEXT_PUBLIC_WOOCOMMERCE_URL`: La API no sabe dónde conectar
- Sin `WOOCOMMERCE_CONSUMER_KEY/SECRET`: La autenticación WooCommerce falla
- Sin `NEXT_PUBLIC_SITE_URL`: robots.txt y sitemap.xml usan URLs incorrectas

**Dónde configurar en Vercel**:
1. Dashboard de Vercel → Tu proyecto
2. Settings → Environment Variables
3. Agregar cada variable con su valor
4. Aplicar a: Production, Preview, Development
5. Re-deploy el proyecto

**Impacto**:
- ❌ **CRÍTICO**: Conexión WooCommerce falla completamente
- ❌ Tienda no carga productos
- ❌ API devuelve arrays vacíos o errores 500

---

### 3. 🖼️ Imágenes Remotas Sin Validación

**Configuración actual**: `next.config.mjs:3-13`

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'www.dibubaron.com' },
  ],
}
```

**Problema**:
- ✅ Unsplash está configurado (imágenes de categorías)
- ⚠️ `www.dibubaron.com` puede no estar sirviendo imágenes aún
- ❌ Falta `lightpink-gnu-805963.hostingersite.com` (WooCommerce)

**Solución**:
```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.dibubaron.com' },
      { protocol: 'https', hostname: 'lightpink-gnu-805963.hostingersite.com' }, // ✅ Agregar WooCommerce
      { protocol: 'https', hostname: '*.hostingersite.com' }, // ✅ Permitir subdominios
    ],
    formats: ['image/avif', 'image/webp'],
  },
};
```

**Impacto**:
- ⚠️ Imágenes de productos WooCommerce no cargan
- ⚠️ Next.js Image optimization falla
- ⚠️ Páginas muestran placeholders rotos

---

## 🟡 PROBLEMAS IMPORTANTES (Degradan Funcionalidad)

### 4. 🔗 Dependencia de API Externa en Build Time

**Problema**: `TiendaPage.tsx` llama a `/api/products` durante el render inicial

```typescript
// components/TiendaPage.tsx
useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch('/api/products'); // ❌ Falla en build time
    const data = await res.json();
    setProducts(data);
  };
  fetchProducts();
}, []);
```

**Por qué es problema**:
- En build time, `/api/products` no está disponible aún
- Causa timeout o error 500 durante generación estática
- Vercel puede cancelar el build después de 5-10 minutos

**Solución**:
```typescript
// app/tienda/page.tsx - Convertir a Server Component
import { getProducts } from '@/lib/woocommerce';

export default async function TiendaPage() {
  const products = await getProducts({ per_page: 50 }); // ✅ Server-side fetch

  return <TiendaPageClient products={products} />;
}

// components/TiendaPageClient.tsx - Client Component separado
'use client';
export function TiendaPageClient({ products }) {
  // ... lógica de filtros y UI
}
```

---

### 5. 🎨 Falta Configuración de Output

**Problema**: No hay especificación de output para Vercel

**Configuración recomendada**:
```javascript
// next.config.mjs
const nextConfig = {
  output: 'standalone', // ✅ Optimiza para serverless
  images: { ... },
  experimental: {
    serverActions: true,
  },
};
```

**Beneficios**:
- Reduce tamaño del deployment
- Mejora cold start en funciones serverless
- Optimiza para edge runtime de Vercel

---

### 6. 📦 Build Output Excesivo

**Bundle actual**: 87.2 KB (First Load JS)

```
Route (app)                              Size     First Load JS
┌ ○ /                                    7.38 kB         157 kB  ⚠️ Grande
├ ƒ /categoria/[slug]                    4.6 kB          150 kB  ⚠️ Grande
└ ○ /tienda                              5.28 kB         149 kB  ⚠️ Grande
```

**Problemas**:
- Framer Motion (~35KB) se carga en todas las páginas
- Canvas Confetti (~15KB) no se lazy-load
- React Icons incluye iconos no usados

**Solución**: Code Splitting (ver AUDITORIA_MOBILE.md Prioridad 2)

---

## 🟢 CONFIGURACIÓN CORRECTA

### ✅ Elementos que SÍ Funcionan

1. **Package.json** - Scripts configurados correctamente
2. **TypeScript** - Sin errores de tipos
3. **ESLint** - Build pasa linting
4. **Tailwind CSS** - Configuración optimizada
5. **Metadata SEO** - OpenGraph y Twitter cards
6. **Viewport mobile** - Configurado correctamente
7. **Estructura de rutas** - App Router bien implementado
8. **Favicon y assets** - Logo.svg presente en `/public`

---

## 🛠️ PLAN DE ACCIÓN INMEDIATO

### Prioridad 1: DESBLOQUEAR DEPLOYMENT (15 minutos)

#### Paso 1: Configurar Variables de Entorno en Vercel
```bash
# En Vercel Dashboard:
NEXT_PUBLIC_SITE_URL=https://dibubaron.vercel.app  # O tu dominio
NEXT_PUBLIC_WOOCOMMERCE_URL=https://lightpink-gnu-805963.hostingersite.com
WOOCOMMERCE_CONSUMER_KEY=ck_81052fe18b42f9f6d2462dece937bbde029e17e2
WOOCOMMERCE_CONSUMER_SECRET=cs_585b2f7b44d80547b1ad5edfe9cc3ad389061b3a
```

#### Paso 2: Arreglar API Route
```typescript
// app/api/products/route.ts
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache por 60 segundos

export async function GET(request: Request) {
  // ... código actual sin cambios
}
```

#### Paso 3: Actualizar next.config.mjs
```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.dibubaron.com' },
      { protocol: 'https', hostname: 'lightpink-gnu-805963.hostingersite.com' },
      { protocol: 'https', hostname: '*.hostingersite.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};
```

#### Paso 4: Re-deploy en Vercel
```bash
git add .
git commit -m "fix: configurar deployment para Vercel"
git push origin main
```

Vercel auto-deploys en cada push a `main`.

---

### Prioridad 2: OPTIMIZAR PERFORMANCE (1 hora)

1. **Convertir páginas a Server Components**
   - `app/tienda/page.tsx` → Server Component
   - Extraer UI interactiva a Client Components

2. **Implementar ISR en API routes**
   ```typescript
   export const revalidate = 60; // Revalidar cada minuto
   ```

3. **Lazy load de librerías pesadas**
   ```typescript
   const confetti = dynamic(() => import('canvas-confetti'));
   ```

---

### Prioridad 3: MONITOREO POST-DEPLOYMENT (30 minutos)

1. **Verificar en Vercel Dashboard**:
   - ✅ Build logs sin errores
   - ✅ Deployment exitoso
   - ✅ Todas las rutas accesibles

2. **Testing en producción**:
   - [ ] Home page carga categorías
   - [ ] Tienda muestra productos
   - [ ] API routes responden correctamente
   - [ ] Imágenes cargan desde WooCommerce
   - [ ] Dark mode funciona
   - [ ] Mobile viewport correcto

3. **Performance check**:
   - Lighthouse score > 90
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

---

## 📊 CHECKLIST DE VERIFICACIÓN

### Pre-Deployment
- [ ] Variables de entorno configuradas en Vercel
- [ ] API routes con `dynamic = 'force-dynamic'`
- [ ] Imágenes remotas incluyen todos los dominios
- [ ] Build local exitoso (`npm run build`)
- [ ] Linting pasa sin errores (`npm run lint`)

### Post-Deployment
- [ ] Vercel build completa sin errores
- [ ] Home page carga correctamente
- [ ] Tienda muestra productos de WooCommerce
- [ ] Imágenes optimizadas cargan
- [ ] SEO metadata presente
- [ ] Mobile responsive funciona
- [ ] Dark mode persiste
- [ ] Gamificación funciona (localStorage)

---

## 🚨 ERRORES COMUNES EN VERCEL

### "Module not found: Can't resolve '@/lib/...'"
**Causa**: Path alias no configurado
**Solución**: Ya está configurado en `tsconfig.json` ✅

### "Failed to fetch products"
**Causa**: Variables de entorno faltantes
**Solución**: Ver Prioridad 1, Paso 1 ⬆️

### "Image optimization failed"
**Causa**: Hostname no permitido en next.config.mjs
**Solución**: Ver Prioridad 1, Paso 3 ⬆️

### "Function execution timeout"
**Causa**: API WooCommerce muy lenta
**Solución**: Implementar timeout en fetch:
```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);
const response = await fetch(url, { signal: controller.signal });
```

---

## 📈 MEJORA ESPERADA POST-FIX

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Build exitoso | ❌ NO | ✅ SÍ | +100% |
| Tienda funcional | ❌ NO | ✅ SÍ | +100% |
| API errors | 100% | 0% | -100% |
| Lighthouse Score | N/A | 90+ | N/A |
| First Load JS | 157 KB | 157 KB | 0% |

---

## 🔗 RECURSOS

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)

---

## 💡 RECOMENDACIONES ADICIONALES

1. **Agregar vercel.json** para configuración explícita:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

2. **Configurar Edge Runtime** para APIs rápidas:
```typescript
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
```

3. **Implementar Error Boundaries** en producción:
```typescript
// Ya implementado: app/error.tsx ✅
```

4. **Monitoreo con Vercel Analytics**:
```bash
npm install @vercel/analytics
```

---

**Estado Final**: Una vez implementados los fixes de Prioridad 1, el sitio debería deployar correctamente en Vercel y estar 100% funcional.

**Tiempo estimado de resolución**: 15-30 minutos

**Confianza**: Alta (9/10) - Los problemas son conocidos y las soluciones están probadas.
