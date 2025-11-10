# Guía de Configuración n8n - YouTube a DibuBaron

## Requisitos Previos

1. Tabla `dibubaron_videos` creada en NocoDB (ver nocodb-videos-schema.md)
2. Token de API de NocoDB
3. Acceso a n8n.neuralflow.space

## Paso 1: Obtener Credenciales de NocoDB

### 1.1 Obtener API Token
1. Ve a https://db.neuralflow.space
2. Click en tu avatar (esquina superior derecha)
3. Selecciona "Account Settings" o "API Tokens"
4. Click en "Create Token"
5. Nombre: `n8n-dibubaron-youtube`
6. Copia el token generado (formato: `xc-token-xxxxxx`)

### 1.2 Obtener Base ID y Table ID
1. En NocoDB, abre la tabla `dibubaron_videos`
2. Click en los 3 puntos (menú) → "Webhook & API"
3. En la URL verás algo como:
   ```
   https://db.neuralflow.space/api/v1/db/data/noco/{BASE_ID}/{TABLE_ID}/dibubaron_videos
   ```
4. Copia el `BASE_ID` y `TABLE_ID`

## Paso 2: Configurar Credenciales en n8n

### 2.1 Crear Credencial de Autenticación
1. Ve a https://n8n.neuralflow.space
2. Click en "Credentials" en el menú lateral
3. Click en "Add Credential"
4. Busca "HTTP Header Auth"
5. Configura:
   - **Credential Name**: `NocoDB Auth`
   - **Header Name**: `xc-token`
   - **Header Value**: [Tu token de NocoDB copiado en 1.1]
6. Click "Save"

## Paso 3: Importar Workflow

### 3.1 Importar desde archivo JSON
1. En n8n, click en el menú hamburguesa (☰) arriba a la izquierda
2. Selecciona "Import from File"
3. Sube el archivo `n8n-workflow-dibubaron-youtube.json`
4. Click "Import"

### 3.2 Configurar el Workflow

#### Nodo 1: RSS Feed Trigger
- Ya está configurado con la URL correcta del canal DibuBaron
- Poll Interval: 5 minutes (default)
- Puedes cambiar a 15 min para reducir requests

#### Nodo 2: Transform Video Data
- No requiere configuración (código JavaScript ya incluido)
- Extrae: video_id, title, description, thumbnail, URL

#### Nodo 3: Check if Video Exists
1. Click en el nodo "Check if Video Exists"
2. En "URL", reemplaza los placeholders:
   ```
   https://db.neuralflow.space/api/v1/db/data/noco/{BASE_ID}/{TABLE_ID}/dibubaron_videos?where=(video_id,eq,{{ $json.video_id }})
   ```
   Reemplaza:
   - `{BASE_ID}` → Tu Base ID de NocoDB
   - `{TABLE_ID}` → Tu Table ID de NocoDB
3. En "Authentication" selecciona "NocoDB Auth" (la credencial que creaste)

#### Nodo 4: If Video Not Exists
- Ya está configurado
- Verifica si el video ya existe antes de insertar

#### Nodo 5: Insert Video to NocoDB
1. Click en el nodo "Insert Video to NocoDB"
2. En "URL", reemplaza:
   ```
   https://db.neuralflow.space/api/v1/db/data/noco/{BASE_ID}/{TABLE_ID}/dibubaron_videos
   ```
   Con tus IDs reales
3. En "Authentication" selecciona "NocoDB Auth"

### 3.3 Guardar y Activar
1. Click en "Save" (arriba a la derecha)
2. Cambia el nombre si quieres: "DibuBaron YouTube to NocoDB"
3. Click en el toggle "Inactive/Active" para activar el workflow
4. El workflow ahora revisará cada 5 minutos si hay nuevos videos

## Paso 4: Probar el Workflow

### 4.1 Test Manual
1. En el workflow, click en "Execute Workflow" (botón de play)
2. Si hay videos en el canal, deberías ver la ejecución completarse
3. Verifica en NocoDB que los videos se insertaron correctamente

### 4.2 Verificar en NocoDB
1. Ve a https://db.neuralflow.space
2. Abre la tabla `dibubaron_videos`
3. Deberías ver los videos del canal listados

## Paso 5: Monitoreo

### Ver Ejecuciones
1. En n8n, ve a "Executions" en el menú lateral
2. Verás el historial de ejecuciones automáticas
3. Click en cualquier ejecución para ver detalles

### Errores Comunes

**Error: 401 Unauthorized**
- Solución: Verifica que el token de NocoDB sea correcto
- Regenera el token si es necesario

**Error: 404 Not Found**
- Solución: Verifica los IDs de Base y Table en las URLs
- Asegúrate de que la tabla `dibubaron_videos` existe

**No se insertan videos**
- Verifica que el canal tenga videos públicos
- Revisa el nodo "If Video Not Exists" para ver si detecta duplicados
- Borra un video de la tabla y ejecuta manualmente para probar

**Videos duplicados**
- El workflow verifica duplicados por `video_id`
- Si aún así se duplican, agrega índice único en NocoDB en el campo `video_id`

## Configuración Avanzada (Opcional)

### Agregar Notificaciones
Puedes agregar un nodo adicional después de "Insert Video to NocoDB":
- Email (envía notificación cuando hay nuevo video)
- Telegram/Discord/Slack
- Webhook a otro servicio

### Integración con Postiz (Publicar en Redes Sociales)
1. Agrega un nodo HTTP Request después de insertar
2. Llama a la API de Postiz (social.neuralflow.space)
3. Publica automáticamente el nuevo video en redes sociales

### Actualizar View Count
Crea un segundo workflow que:
1. Se ejecute 1 vez al día
2. Obtenga view_count de YouTube API
3. Actualice los registros en NocoDB

## Datos del Canal

- **Canal**: DibuBaron
- **URL**: https://www.youtube.com/@DibuBaron
- **Channel ID**: UCVcz3XyIbzlASMreLQxYqUw
- **RSS Feed**: https://www.youtube.com/feeds/videos.xml?channel_id=UCVcz3XyIbzlASMreLQxYqUw

## Próximos Pasos

Una vez configurado n8n:
1. Los videos se guardarán automáticamente en NocoDB
2. La página web de DibuBaron leerá de NocoDB vía API
3. Los videos aparecerán en:
   - Página `/tutoriales` (galería completa)
   - Sección en homepage (últimos 4 videos)
   - Integración con categorías de productos

Continúa con la implementación del frontend en dibubaron siguiendo la guía en `docs/frontend-implementation-guide.md`
