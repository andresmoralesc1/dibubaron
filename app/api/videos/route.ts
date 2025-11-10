import { NextResponse } from 'next/server';
import type { YouTubeVideo } from '@/types/video';

// Configuración para Vercel: forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // Verificar que las variables de entorno estén configuradas
    if (!process.env.NOCODB_API_URL || !process.env.NOCODB_API_TOKEN) {
      console.warn('NocoDB credentials not configured');
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit') || '50';
    const offset = searchParams.get('offset') || '0';

    // Construir query parameters para NocoDB
    const params = new URLSearchParams({
      limit,
      offset,
      sort: '-published_at', // Ordenar por fecha descendente
    });

    // Agregar filtros si se especifican
    if (category) {
      params.append('where', `(category,eq,${category})`);
    }

    if (featured === 'true') {
      params.append('where', '(featured,eq,true)');
    }

    // Hacer request a NocoDB
    const nocodbUrl = `${process.env.NOCODB_API_URL}?${params.toString()}`;

    const response = await fetch(nocodbUrl, {
      headers: {
        'xc-token': process.env.NOCODB_API_TOKEN,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // Cache por 5 minutos
    });

    if (!response.ok) {
      throw new Error(`NocoDB API error: ${response.status}`);
    }

    const data = await response.json();

    // NocoDB retorna en formato { list: [...], pageInfo: {...} }
    const videos: YouTubeVideo[] = data.list || data;

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Error al obtener videos' },
      { status: 500 }
    );
  }
}
