import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutoriales de Dibujo para Colorear | DibuBaron',
  description:
    'Aprende a dibujar paso a paso con nuestros tutoriales gratuitos. Animales, personajes, naturaleza y más. Videos educativos para niños y principiantes.',
  keywords: [
    'tutoriales de dibujo',
    'aprender a dibujar',
    'dibujo para niños',
    'cómo dibujar',
    'tutoriales paso a paso',
    'dibujos para colorear',
    'DibuBaron',
  ],
  openGraph: {
    title: 'Tutoriales de Dibujo para Colorear | DibuBaron',
    description:
      'Aprende a dibujar paso a paso con nuestros tutoriales gratuitos. Animales, personajes, naturaleza y más.',
    type: 'website',
    url: 'https://www.dibubaron.com/tutoriales',
    images: [
      {
        url: '/og-tutoriales.jpg',
        width: 1200,
        height: 630,
        alt: 'Tutoriales de Dibujo DibuBaron',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutoriales de Dibujo | DibuBaron',
    description: 'Aprende a dibujar paso a paso con nuestros tutoriales gratuitos',
  },
};

export default function TutorialesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
