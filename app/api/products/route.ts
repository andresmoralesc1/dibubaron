import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/woocommerce';

// Configuración para Vercel: forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // Verificar que las variables de entorno estén configuradas
    if (!process.env.WOOCOMMERCE_CONSUMER_KEY || !process.env.WOOCOMMERCE_CONSUMER_SECRET) {
      console.warn('WooCommerce credentials not configured');
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const per_page = searchParams.get('per_page') || '50';

    const params: Record<string, string | number | boolean> = {
      per_page: parseInt(per_page),
      status: 'publish',
    };

    if (category) {
      params.category = category;
    }

    if (featured === 'true') {
      params.featured = true;
    }

    const products = await getProducts(params);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}
