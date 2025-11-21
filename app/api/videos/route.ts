import { NextResponse } from 'next/server';
import type { YouTubeVideo } from '@/types/video';

// Configuración para Vercel: forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CHANNEL_ID = 'UCVcz3XyIbzlASMreLQxYqUw';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

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
          category: 'Otros',
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
