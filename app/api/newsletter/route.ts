import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// NocoDB Configuration
const NOCODB_API_URL = process.env.NOCODB_NEWSLETTER_URL || 'https://db.neuralflow.space/api/v2/tables/dibubaron_newsletter/records';
const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validar email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Guardar directamente en NocoDB
    if (NOCODB_API_TOKEN && NOCODB_API_TOKEN !== 'your_nocodb_token_here') {
      const nocoResponse = await fetch(NOCODB_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xc-token': NOCODB_API_TOKEN,
        },
        body: JSON.stringify({
          email: cleanEmail,
          source: 'dibubaron-website',
          subscribed_at: new Date().toISOString(),
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          user_agent: request.headers.get('user-agent')?.substring(0, 500) || 'unknown',
        }),
      });

      if (!nocoResponse.ok) {
        const errorText = await nocoResponse.text();
        console.error('NocoDB error:', errorText);

        // Si es error de duplicado, informar al usuario
        if (errorText.includes('duplicate') || errorText.includes('unique')) {
          return NextResponse.json(
            { error: 'Este email ya está suscrito' },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { error: 'Error al guardar suscripción' },
          { status: 500 }
        );
      }
    } else {
      console.warn('NocoDB token not configured, subscription not saved');
    }

    return NextResponse.json({
      success: true,
      message: '¡Te has suscrito correctamente!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la suscripción' },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
