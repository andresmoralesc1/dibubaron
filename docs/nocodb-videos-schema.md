# Esquema de Tabla NocoDB para Videos de YouTube

## Nombre de la Tabla
`dibubaron_videos`

## Campos (Columns)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | Auto Number | Sí | ID único generado por NocoDB |
| video_id | Single Line Text | Sí | ID del video de YouTube (ej: dQw4w9WgXcQ) |
| title | Single Line Text | Sí | Título del video |
| description | Long Text | No | Descripción completa del video |
| thumbnail_url | URL | Sí | URL de la miniatura del video |
| video_url | URL | Sí | URL completa del video en YouTube |
| published_at | DateTime | Sí | Fecha de publicación en YouTube |
| category | Single Select | No | Categoría del dibujo (Animales, Personajes, Naturaleza, etc.) |
| featured | Checkbox | No | Marcar si es un video destacado |
| view_count | Number | No | Número de vistas (opcional, para actualizar) |
| created_at | DateTime | Sí | Fecha de creación en la BD (auto) |

## Instrucciones de Creación en NocoDB

### Paso 1: Acceder a NocoDB
1. Ve a https://db.neuralflow.space
2. Inicia sesión con tus credenciales
3. Selecciona tu base de datos o crea una nueva llamada "DibuBaron"

### Paso 2: Crear la Tabla
1. Haz clic en "Add new table"
2. Nombre: `dibubaron_videos`
3. Agrega los campos uno por uno usando el botón "+"

### Paso 3: Configurar Campos

**video_id** (Single Line Text)
- Click en "+" → Single Line Text
- Column Name: `video_id`
- Required: ✓

**title** (Single Line Text)
- Column Name: `title`
- Required: ✓

**description** (Long Text)
- Column Type: Long Text
- Column Name: `description`

**thumbnail_url** (URL)
- Column Type: URL
- Column Name: `thumbnail_url`
- Required: ✓

**video_url** (URL)
- Column Type: URL
- Column Name: `video_url`
- Required: ✓

**published_at** (DateTime)
- Column Type: DateTime
- Column Name: `published_at`
- Required: ✓

**category** (Single Select)
- Column Type: Single Select
- Column Name: `category`
- Options:
  - Animales
  - Personajes
  - Naturaleza
  - Vehículos
  - Fantasía
  - Educativo
  - Otros

**featured** (Checkbox)
- Column Type: Checkbox
- Column Name: `featured`
- Default: false

**view_count** (Number)
- Column Type: Number
- Column Name: `view_count`

### Paso 4: Obtener API Token

1. En NocoDB, ve a tu perfil (esquina superior derecha)
2. Click en "Copy Auth Token" o "API Tokens"
3. Crea un nuevo token con nombre "n8n-dibubaron"
4. Copia el token generado (lo necesitarás para n8n)

### Paso 5: Obtener URL de la API

La URL base será algo como:
```
https://db.neuralflow.space/api/v1/db/data/noco/{base_id}/{table_id}/dibubaron_videos
```

Puedes encontrar la URL exacta en:
- NocoDB → Click en los 3 puntos del menú → "Webhook & API" → "API Snippet"

## Índices Recomendados

- Índice único en `video_id` (para evitar duplicados)
- Índice en `published_at` (para ordenar por fecha)
- Índice en `featured` (para destacados)

## Notas

- El campo `video_id` debe ser único para evitar duplicar videos
- La URL del thumbnail por defecto es: `https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg`
- Alternativas de thumbnails: `/hqdefault.jpg`, `/mqdefault.jpg`, `/sddefault.jpg`
