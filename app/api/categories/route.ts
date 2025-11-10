import { NextResponse } from 'next/server';
import { getProductCategories } from '@/lib/woocommerce';

// Configuración para Vercel: forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Verificar que las variables de entorno estén configuradas
    if (!process.env.WOOCOMMERCE_CONSUMER_KEY || !process.env.WOOCOMMERCE_CONSUMER_SECRET) {
      console.warn('WooCommerce credentials not configured');
      return NextResponse.json([]);
    }

    const categories = await getProductCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
      { status: 500 }
    );
  }
}
