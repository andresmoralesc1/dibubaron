# Automatización YouTube → DibuBaron - Guía Completa de Configuración

## Descripción General

Este sistema automatiza la publicación de videos del canal [@DibuBaron](https://www.youtube.com/@DibuBaron) en el sitio web dibubaron.com.

### Flujo de Automatización

```
YouTube (Nuevo Video)
    ↓
n8n (RSS Feed Monitor)
    ↓
NocoDB (Base de Datos)
    ↓
DibuBaron Web (Next.js)
```

### Características

- ✅ Detección automática de nuevos videos cada 5 minutos
- ✅ Almacenamiento en base de datos NocoDB
- ✅ Página dedicada `/tutoriales` con galería completa
- ✅ Sección en homepage con últimos 4 videos
- ✅ Filtros por categoría y búsqueda
- ✅ Videos destacados (featured)
- ✅ Responsive design
- ✅ SEO optimizado

---

## Configuración Completa (Orden de Implementación)

### Fase 1: Base de Datos (NocoDB)

#### 1.1 Crear Tabla

1. Accede a https://db.neuralflow.space
2. Crea una nueva base de datos llamada "DibuBaron" (o usa una existente)
3. Crea la tabla `dibubaron_videos` con los siguientes campos:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | Auto Number | Sí | ID único |
| video_id | Single Line Text | Sí | ID del video de YouTube |
| title | Single Line Text | Sí | Título del video |
| description | Long Text | No | Descripción |
| thumbnail_url | URL | Sí | URL de la miniatura |
| video_url | URL | Sí | URL completa del video |
| published_at | DateTime | Sí | Fecha de publicación |
| category | Single Select | No | Categoría |
| featured | Checkbox | No | Video destacado |
| view_count | Number | No | Número de vistas |

**Opciones para el campo `category`**:
- Animales
- Personajes
- Naturaleza
- Vehículos
- Fantasía
- Educativo
- Otros

Ver detalles completos en: `docs/nocodb-videos-schema.md`

#### 1.2 Obtener Credenciales

1. **API Token**:
   - Profile (esquina superior derecha) → Account Settings
   - API Tokens → Create Token
   - Nombre: `n8n-dibubaron`
   - Copia el token (formato: `xc-token-xxxxx`)

2. **Base ID y Table ID**:
   - Abre la tabla `dibubaron_videos`
   - Menú (3 puntos) → Webhook & API
   - La URL contiene: `.../{BASE_ID}/{TABLE_ID}/dibubaron_videos`
   - Anota ambos IDs

---

### Fase 2: Automatización (n8n)

#### 2.1 Crear Credencial en n8n

1. Accede a https://n8n.neuralflow.space
2. Credentials → Add Credential → "HTTP Header Auth"
3. Configuración:
   - Name: `NocoDB Auth`
   - Header Name: `xc-token`
   - Header Value: [Tu token de 1.2]
4. Save

#### 2.2 Importar Workflow

1. En n8n, menú (☰) → Import from File
2. Sube: `docs/n8n-workflow-dibubaron-youtube.json`
3. Click "Import"

#### 2.3 Configurar Workflow

Edita los siguientes nodos:

**Nodo 3: "Check if Video Exists"**
- URL: `https://db.neuralflow.space/api/v1/db/data/noco/{BASE_ID}/{TABLE_ID}/dibubaron_videos?where=(video_id,eq,{{ $json.video_id }})`
- Reemplaza `{BASE_ID}` y `{TABLE_ID}` con tus valores
- Authentication: Selecciona "NocoDB Auth"

**Nodo 5: "Insert Video to NocoDB"**
- URL: `https://db.neuralflow.space/api/v1/db/data/noco/{BASE_ID}/{TABLE_ID}/dibubaron_videos`
- Reemplaza `{BASE_ID}` y `{TABLE_ID}` con tus valores
- Authentication: Selecciona "NocoDB Auth"

#### 2.4 Activar Workflow

1. Save (arriba a la derecha)
2. Toggle "Inactive" → "Active"
3. El workflow ahora se ejecuta automáticamente cada 5 minutos

#### 2.5 Prueba Manual

1. Click en "Execute Workflow" (botón play)
2. Verifica que la ejecución sea exitosa
3. Revisa NocoDB para confirmar que se insertaron videos

Ver guía detallada en: `docs/n8n-setup-guide.md`

---

### Fase 3: Sitio Web (DibuBaron Next.js)

#### 3.1 Variables de Entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edita `.env.local` y configura:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.dibubaron.com

# NocoDB API Configuration
NOCODB_API_URL=https://db.neuralflow.space/api/v1/db/data/noco/{BASE_ID}/{TABLE_ID}/dibubaron_videos
NOCODB_API_TOKEN=xc-token-your_token_here
```

Reemplaza:
- `{BASE_ID}` → Tu Base ID de NocoDB
- `{TABLE_ID}` → Tu Table ID de NocoDB
- `xc-token-your_token_here` → Tu token de NocoDB

#### 3.2 Verificar Instalación

```bash
cd /home/telchar/dibubaron-nextjs
npm install  # Instalar dependencias si es necesario
npm run dev  # Probar localmente
```

#### 3.3 Verificar Funcionalidad Local

1. Abre http://localhost:3000
2. Verifica que la sección de videos aparezca en el home
3. Ve a http://localhost:3000/tutoriales
4. Deberías ver la galería de videos

#### 3.4 Deploy a Vercel

1. Configura las mismas variables de entorno en Vercel:
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → Environment Variables
   - Agrega `NOCODB_API_URL` y `NOCODB_API_TOKEN`
   - Selecciona todos los environments (Production, Preview, Development)

2. Commit y push:
   ```bash
   git add .
   git commit -m "feat: add YouTube automation integration"
   git push
   ```

3. Vercel desplegará automáticamente

Ver instrucciones de Vercel en: `CONFIGURAR_VERCEL.md`

---

## Componentes Creados

### Archivos de Documentación

- `docs/nocodb-videos-schema.md` - Esquema de la base de datos
- `docs/n8n-setup-guide.md` - Guía detallada de n8n
- `docs/n8n-workflow-dibubaron-youtube.json` - Workflow exportable
- `docs/YOUTUBE_AUTOMATION_SETUP.md` - Este archivo

### Tipos TypeScript

- `types/video.ts` - Definiciones de tipos para videos

### API Routes

- `app/api/videos/route.ts` - Endpoint para obtener videos de NocoDB
  - GET `/api/videos` - Todos los videos
  - GET `/api/videos?limit=4` - Últimos 4 videos
  - GET `/api/videos?category=Animales` - Por categoría
  - GET `/api/videos?featured=true` - Solo destacados

### Componentes

- `components/VideoCard.tsx` - Tarjeta individual de video
- `components/VideoSection.tsx` - Sección para homepage

### Páginas

- `app/tutoriales/page.tsx` - Página de galería completa
- `app/tutoriales/layout.tsx` - Layout con metadata SEO

### Modificaciones

- `components/HomePage.tsx` - Agregada sección de videos
- `.env.local` - Variables de NocoDB agregadas
- `.env.local.example` - Plantilla de variables de entorno

---

## Testing y Verificación

### Test 1: Verificar n8n

1. Ve a n8n.neuralflow.space
2. Executions → Ver última ejecución
3. Debe estar "Success" con color verde
4. Verifica que detectó los videos del RSS feed

### Test 2: Verificar NocoDB

1. Ve a db.neuralflow.space
2. Abre tabla `dibubaron_videos`
3. Deberías ver los videos insertados
4. Verifica que los campos estén completos

### Test 3: Verificar API

1. Abre en el navegador o Postman:
   ```
   https://www.dibubaron.com/api/videos
   ```
2. Deberías recibir JSON con array de videos
3. Verifica que cada video tenga todos los campos

### Test 4: Verificar Frontend

1. **Homepage**:
   - Ve a https://www.dibubaron.com
   - Scroll hasta "🎨 Aprende a Dibujar"
   - Deberían aparecer 4 videos

2. **Página Tutoriales**:
   - Ve a https://www.dibubaron.com/tutoriales
   - Deberías ver galería completa
   - Prueba los filtros de categoría
   - Prueba la búsqueda

3. **Interactividad**:
   - Hover sobre video → Debe mostrar botón "Ver en YouTube"
   - Click en video → Debe abrir YouTube en nueva pestaña
   - Click en "Suscribirse" → Debe abrir página de suscripción

---

## Mantenimiento

### Agregar Video Manualmente

Si quieres agregar un video manualmente en NocoDB:

1. Obtén el ID del video de YouTube:
   - URL: `https://www.youtube.com/watch?v=VIDEO_ID`
   - Copia `VIDEO_ID`

2. En NocoDB, agrega un registro:
   - `video_id`: El ID copiado
   - `title`: Título del video
   - `description`: Descripción
   - `thumbnail_url`: `https://i.ytimg.com/vi/{VIDEO_ID}/maxresdefault.jpg`
   - `video_url`: URL completa
   - `published_at`: Fecha de publicación
   - `category`: Selecciona una categoría
   - `featured`: Marca si es destacado

### Destacar un Video

1. Ve a NocoDB → tabla `dibubaron_videos`
2. Encuentra el video que quieres destacar
3. Marca el checkbox `featured` como ✅
4. El video aparecerá en la sección "Destacados"

### Cambiar Categoría de un Video

1. En NocoDB, edita el registro del video
2. Cambia el campo `category` al valor deseado
3. Los cambios se reflejan inmediatamente en la web

### Eliminar un Video

1. En NocoDB, elimina el registro
2. El video desaparecerá de la web automáticamente

### Cambiar Frecuencia de Sincronización

1. Ve a n8n → Workflow "DibuBaron YouTube to NocoDB"
2. Edita el nodo "RSS Feed Trigger"
3. Cambia "Poll Interval" de 5 minutos a tu preferencia
4. Save y el workflow se actualizará

---

## Troubleshooting

### Error: No aparecen videos en la web

**Causa**: Variables de entorno no configuradas

**Solución**:
1. Verifica `.env.local` localmente
2. Verifica variables en Vercel
3. Redeploy si es necesario

### Error: Videos duplicados en NocoDB

**Causa**: El workflow no detectó el video existente

**Solución**:
1. En NocoDB, agregar índice único a `video_id`
2. Settings → Fields → video_id → Add Unique Index
3. Eliminar duplicados manualmente

### Error: n8n no ejecuta el workflow

**Causa**: Workflow desactivado o error en configuración

**Solución**:
1. Verifica que el workflow esté "Active"
2. Revisa el último error en Executions
3. Verifica las credenciales de NocoDB

### Error: Thumbnails no cargan

**Causa**: YouTube usa diferentes resoluciones para thumbnails

**Solución**:
- El componente VideoCard automáticamente usa fallback a `hqdefault.jpg`
- Si aún falla, verifica que `video_id` sea correcto

### Error: 401 Unauthorized en API

**Causa**: Token de NocoDB inválido o expirado

**Solución**:
1. Regenera el token en NocoDB
2. Actualiza en n8n credentials
3. Actualiza en `.env.local` y Vercel

---

## Mejoras Futuras (Opcional)

### 1. Actualizar View Count

Crear un segundo workflow en n8n que:
- Se ejecute 1 vez al día
- Use YouTube Data API v3
- Actualice el campo `view_count` en NocoDB

### 2. Integración con Postiz

Agregar nodo después de "Insert Video to NocoDB":
- Publicar automáticamente en redes sociales
- Instagram, Facebook, Twitter
- Usando API de Postiz (social.neuralflow.space)

### 3. Notificaciones

Agregar nodo de notificación:
- Email cuando hay nuevo video
- Telegram/Discord notification
- Slack message

### 4. Videos por Categoría de Productos

En páginas de categoría de productos WooCommerce:
- Mostrar videos relacionados
- Filtrar por categoría matching
- Ejemplo: En "Animales" mostrar videos de categoría "Animales"

### 5. Analytics

Agregar:
- Click tracking en videos
- Most viewed videos
- Popular categories dashboard

---

## Datos del Canal

- **Canal**: DibuBaron
- **URL**: https://www.youtube.com/@DibuBaron
- **Channel ID**: UCVcz3XyIbzlASMreLQxYqUw
- **RSS Feed**: https://www.youtube.com/feeds/videos.xml?channel_id=UCVcz3XyIbzlASMreLQxYqUw

---

## Soporte

Si encuentras problemas:
1. Revisa los logs de n8n en Executions
2. Verifica datos en NocoDB
3. Revisa console del navegador (F12)
4. Verifica logs de Vercel

## Conclusión

Con esta configuración, cada vez que subas un video a YouTube:
1. ⏱️ En ~5 minutos, n8n lo detectará
2. 💾 Se guardará automáticamente en NocoDB
3. 🌐 Aparecerá en dibubaron.com/tutoriales
4. 🏠 Se mostrará en la homepage
5. 🎯 Los usuarios podrán buscarlo y filtrarlo

¡Tu canal de YouTube ahora está completamente integrado con tu sitio web!
