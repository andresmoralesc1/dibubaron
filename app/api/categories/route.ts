import { NextResponse } from 'next/server';
import { getProductCategories } from '@/lib/woocommerce';

// Configuración para Vercel: forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
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
