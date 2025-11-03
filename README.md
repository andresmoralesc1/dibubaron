# DibuBaron - Plataforma de Tutoriales de Dibujo

Plataforma web moderna para aprender a dibujar con tutoriales paso a paso, construida con Next.js 14, TypeScript y Tailwind CSS.

## Características Implementadas

### 🎨 UI/UX
- ✅ Diseño limpio inspirado en colorear-online.com
- ✅ Paleta de colores azul (#0274BE) de dibubaron.com
- ✅ Responsive design (móvil, tablet, desktop)
- ✅ Animaciones suaves con Framer Motion
- ✅ Menú móvil funcional con drawer animado

### 🌙 Modo Oscuro
- ✅ Dark mode completo con persistencia en localStorage
- ✅ Toggle accesible en header
- ✅ Transiciones suaves entre temas

### 🔍 Búsqueda
- ✅ Modal de búsqueda con autocompletado
- ✅ Filtrado en tiempo real de categorías
- ✅ Keyboard shortcuts (ESC para cerrar)

### ❤️ Sistema de Favoritos
- ✅ Guardar/remover favoritos con persistencia en localStorage
- ✅ Página dedicada de favoritos
- ✅ Indicadores visuales en todas las tarjetas

### 📱 Páginas
- ✅ Home con secciones "Más Populares" y "Todas las Categorías"
- ✅ Páginas dinámicas de categorías con filtros por dificultad
- ✅ Página de favoritos
- ✅ Página "Nosotros"

### 🔗 Compartir en Redes Sociales
- ✅ Botones para Facebook, Twitter, WhatsApp y Pinterest
- ✅ Integración en páginas de categorías

### 📍 Navegación
- ✅ Breadcrumbs para mejor orientación
- ✅ Links consistentes en toda la aplicación

### 📧 Newsletter
- ✅ Formulario de suscripción en home
- ✅ Diseño atractivo con gradientes

### 🚀 SEO y Performance
- ✅ Metadata dinámica optimizada
- ✅ Open Graph tags para redes sociales
- ✅ Sitemap.xml generado automáticamente
- ✅ robots.txt configurado
- ✅ Imágenes optimizadas con Next.js Image
- ✅ Lazy loading de imágenes

### 🎯 Características Adicionales
- ✅ Grid de dibujos con tarjetas animadas
- ✅ Badges de dificultad (Fácil, Medio, Difícil)
- ✅ Contador de vistas en dibujos
- ✅ Filtros por dificultad en categorías

## Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: React Icons (Feather Icons)
- **Imágenes**: Next.js Image con Unsplash

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Estructura del Proyecto

```
dibubaron-nextjs/
├── app/
│   ├── categoria/[slug]/    # Páginas dinámicas de categorías
│   ├── favoritos/           # Página de favoritos
│   ├── nosotros/            # Página sobre nosotros
│   ├── layout.tsx           # Layout principal con providers
│   ├── page.tsx             # Página de inicio
│   ├── sitemap.ts           # Generador de sitemap
│   └── robots.ts            # Configuración de robots.txt
├── components/
│   ├── Breadcrumbs.tsx      # Componente de navegación
│   ├── CategoryCard.tsx     # Tarjeta de categoría con favoritos
│   ├── DrawingCard.tsx      # Tarjeta de dibujo
│   ├── Footer.tsx           # Footer con dark mode
│   ├── Header.tsx           # Header con menú móvil
│   ├── HomePage.tsx         # Componente principal de home
│   ├── SearchModal.tsx      # Modal de búsqueda
│   └── ShareButtons.tsx     # Botones de redes sociales
├── lib/
│   ├── categories.ts        # Datos de categorías
│   ├── contexts.tsx         # Contextos (Dark Mode, Favorites)
│   └── drawings.ts          # Datos de dibujos
└── public/
    └── images/              # Imágenes estáticas
```

## URLs del Sitio

- **Home**: http://localhost:3000
- **Categoría**: http://localhost:3000/categoria/animales
- **Favoritos**: http://localhost:3000/favoritos
- **Nosotros**: http://localhost:3000/nosotros
- **Sitemap**: http://localhost:3000/sitemap.xml
- **Robots**: http://localhost:3000/robots.txt

## Mejoras Futuras Sugeridas

- Backend con base de datos real
- Sistema de autenticación de usuarios
- Comentarios y calificaciones
- Subida de dibujos por usuarios
- Sistema de badges/logros
- Modo de práctica interactivo con canvas
- Integración con API de email para newsletter
- Analytics y tracking
- PWA (Progressive Web App)
- Multi-idioma (i18n)

## Deploy en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Consulta la [documentación de deployment de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## Licencia

© 2025 DibuBaron. Todos los derechos reservados.
