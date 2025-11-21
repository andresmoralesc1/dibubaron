import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Webhook URL de n8n para guardar en NocoDB
const N8N_WEBHOOK_URL = process.env.N8N_NEWSLETTER_WEBHOOK || 'https://n8n.neuralflow.space/webhook/dibubaron-newsletter';

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

    // Enviar a n8n webhook para guardar en NocoDB
    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        source: 'dibubaron-website',
        subscribedAt: new Date().toISOString(),
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      }),
    });

    if (!webhookResponse.ok) {
      console.error('n8n webhook error:', await webhookResponse.text());
      // Aún así respondemos éxito al usuario para no bloquear la UX
      // El webhook puede estar temporalmente inaccesible
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
