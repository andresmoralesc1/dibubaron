import { NextResponse } from 'next/server';
import { getProductCategories } from '@/lib/woocommerce';

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
