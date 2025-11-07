import { NextResponse } from 'next/server';
import { getProductCategories } from '@/lib/woocommerce';

// Configuración para Vercel: forzar renderizado dinámico y cachear respuestas
export const dynamic = 'force-dynamic';
export const revalidate = 300; // Re-generar cada 5 minutos (las categorías cambian menos)

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
