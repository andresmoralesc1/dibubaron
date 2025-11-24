import { NextResponse } from 'next/server';
import type { YouTubeVideo } from '@/types/video';

// Configuración para Vercel: forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CHANNEL_ID = 'UCVcz3XyIbzlASMreLQxYqUw';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

// Mapeo de keywords a categorías (debe coincidir con lib/categories.ts)
const categoryKeywords: { [category: string]: string[] } = {
  'Navidad': ['navidad', 'navideño', 'navideña', 'christmas', 'santa', 'reno', 'muñeco de nieve', 'hombre de nieve', 'arbol de navidad', 'pino navideño', 'estrella de navidad', 'regalo', 'trineo', 'duende'],
  'Animales': ['animal', 'animales', 'perro', 'gato', 'leon', 'león', 'tigre', 'elefante', 'jirafa', 'mono', 'conejo', 'pájaro', 'pajaro', 'pez', 'delfín', 'delfin', 'ballena', 'oso', 'lobo', 'zorro', 'caballo', 'vaca', 'cerdo', 'oveja', 'gallina', 'pato', 'mariposa', 'abeja', 'hormiga', 'araña', 'serpiente', 'tortuga', 'rana', 'caracol', 'pulpo', 'tiburón', 'tiburon', 'cangrejo', 'pingüino', 'pinguino', 'koala', 'panda', 'cebra', 'hipopótamo', 'hipopotamo', 'rinoceronte', 'cocodrilo', 'loro', 'búho', 'buho', 'águila', 'aguila', 'flamenco', 'unicornio'],
  'Dinosaurios': ['dinosaurio', 'dinosaurios', 'dino', 't-rex', 'trex', 'triceratops', 'velociraptor', 'pterodactilo', 'brontosaurio', 'estegosaurio', 'spinosaurus'],
  'Personajes': ['personaje', 'personajes', 'caricatura', 'cartoon', 'anime', 'héroe', 'heroe', 'villano', 'princesa disney', 'mickey', 'minnie', 'bob esponja', 'patricio', 'peppa', 'paw patrol', 'frozen', 'elsa', 'spiderman', 'batman', 'superman', 'mario', 'luigi', 'sonic', 'pikachu'],
  'Vehículos': ['vehiculo', 'vehículo', 'vehiculos', 'vehículos', 'carro', 'coche', 'auto', 'camión', 'camion', 'bus', 'autobus', 'autobús', 'moto', 'motocicleta', 'bicicleta', 'tren', 'avión', 'avion', 'helicóptero', 'helicoptero', 'barco', 'nave', 'cohete', 'tractor', 'ambulancia', 'bombero', 'policía', 'policia'],
  'Comida': ['comida', 'alimento', 'fruta', 'frutas', 'verdura', 'verduras', 'pizza', 'hamburguesa', 'helado', 'pastel', 'torta', 'galleta', 'dulce', 'caramelo', 'manzana', 'banana', 'naranja', 'fresa', 'sandía', 'sandia', 'uva', 'cereza', 'piña', 'limón', 'limon', 'zanahoria', 'tomate', 'hot dog', 'taco', 'donut', 'cupcake', 'chocolate', 'paleta'],
  'Naturaleza': ['naturaleza', 'planta', 'flor', 'flores', 'árbol', 'arbol', 'bosque', 'montaña', 'montana', 'río', 'rio', 'mar', 'playa', 'sol', 'luna', 'estrella', 'nube', 'arcoíris', 'arcoiris', 'hoja', 'jardín', 'jardin', 'rosa', 'girasol', 'tulipán', 'tulipan', 'margarita', 'cactus', 'palmera', 'cascada', 'volcán', 'volcan'],
  'Princesas': ['princesa', 'princesas', 'reina', 'rey', 'príncipe', 'principe', 'castillo', 'corona', 'hada', 'magia', 'varita', 'cenicienta', 'blancanieves', 'bella', 'aurora', 'ariel', 'rapunzel', 'moana', 'mulan', 'jasmine', 'pocahontas', 'tiana', 'merida'],
  'Deportes': ['deporte', 'deportes', 'fútbol', 'futbol', 'balón', 'balon', 'pelota', 'basketball', 'baloncesto', 'tenis', 'béisbol', 'beisbol', 'golf', 'natación', 'natacion', 'boxeo', 'karate', 'gimnasia', 'atletismo', 'ciclismo', 'patinaje', 'esquí', 'esqui', 'surf', 'skate', 'medalla', 'trofeo', 'olimpiadas'],
  'Profesiones': ['profesión', 'profesion', 'profesiones', 'doctor', 'médico', 'medico', 'enfermera', 'bombero', 'policía', 'policia', 'maestro', 'maestra', 'chef', 'cocinero', 'astronauta', 'piloto', 'constructor', 'ingeniero', 'científico', 'cientifico', 'veterinario', 'dentista', 'granjero', 'agricultor', 'carpintero', 'electricista', 'mecánico', 'mecanico', 'cartero', 'panadero', 'pintor', 'músico', 'musico', 'cantante', 'bailarina', 'actor', 'payaso', 'mago'],
  'Pokémon': ['pokemon', 'pokémon', 'pikachu', 'charizard', 'bulbasaur', 'squirtle', 'charmander', 'eevee', 'mewtwo', 'gengar', 'snorlax', 'jigglypuff', 'psyduck', 'magikarp', 'gyarados', 'dragonite', 'mew', 'lucario', 'greninja', 'pokeball', 'pokebola'],
  'Minecraft': ['minecraft', 'creeper', 'steve', 'alex', 'enderman', 'zombie minecraft', 'skeleton minecraft', 'herobrine', 'ender dragon', 'wither', 'villager', 'iron golem', 'bloque', 'pickaxe', 'espada minecraft', 'diamond', 'diamante minecraft', 'nether', 'portal']
};

// Función para detectar categoría basándose en el título y descripción
function detectCategory(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  return 'Otros';
}

function parseXML(xmlText: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];

  // Extraer todas las entradas del feed
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  const entries = xmlText.match(entryRegex) || [];

  entries.forEach((entry, index) => {
    try {
      // Extraer video ID
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const videoId = videoIdMatch ? videoIdMatch[1] : '';

      // Extraer título
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1') : '';

      // Extraer fecha de publicación
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
      const publishedAt = publishedMatch ? publishedMatch[1] : new Date().toISOString();

      // Extraer descripción
      const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);
      let description = descMatch ? descMatch[1] : '';
      description = description.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim();

      // Construir URLs
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

      if (videoId && title) {
        videos.push({
          id: index + 1,
          video_id: videoId,
          title: title,
          description: description,
          thumbnail_url: thumbnailUrl,
          video_url: videoUrl,
          published_at: publishedAt,
          category: detectCategory(title, description),
          featured: false,
        });
      }
    } catch (err) {
      console.error('Error parsing entry:', err);
    }
  });

  return videos;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    // Fetch RSS feed from YouTube
    const response = await fetch(RSS_URL, {
      next: { revalidate: 300 }, // Cache por 5 minutos
    });

    if (!response.ok) {
      throw new Error(`YouTube RSS error: ${response.status}`);
    }

    const xmlText = await response.text();
    let videos = parseXML(xmlText);

    // Ordenar por fecha descendente
    videos.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

    // Aplicar filtros
    if (category && category !== 'all') {
      videos = videos.filter(v => v.category === category);
    }

    if (featured === 'true') {
      videos = videos.filter(v => v.featured === true);
    }

    // Guardar el total antes de aplicar límite
    const total = videos.length;

    // Aplicar offset y límite para paginación
    const offset = offsetParam ? parseInt(offsetParam) : 0;
    const limit = limitParam ? parseInt(limitParam) : videos.length;

    videos = videos.slice(offset, offset + limit);

    // Devolver respuesta con metadata de paginación
    return NextResponse.json({
      videos,
      pagination: {
        total,
        offset,
        limit,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Error al obtener videos' },
      { status: 500 }
    );
  }
}
