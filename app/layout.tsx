import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { DarkModeProvider, FavoritesProvider } from '@/lib/contexts';

// Fuente Fredoka - Optimizada para niños: amigable, redondeada y muy legible
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dibubaron.com'),
  title: {
    default: "DibuBaron - Aprende a dibujar fácil y paso a paso",
    template: "%s | DibuBaron"
  },
  description: "Descubre cientos de tutoriales de dibujo gratuitos organizados por categorías. Aprende a dibujar animales, personajes, vehículos y mucho más paso a paso.",
  keywords: "dibujos, tutoriales, aprender a dibujar, dibujos paso a paso, dibujos para niños, dibujos fáciles, cómo dibujar",
  authors: [{ name: "DibuBaron" }],
  creator: "DibuBaron",
  publisher: "DibuBaron",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "DibuBaron - Aprende a dibujar fácil y paso a paso",
    description: "Descubre cientos de tutoriales de dibujo gratuitos organizados por categorías",
    url: "https://www.dibubaron.com",
    siteName: "DibuBaron",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DibuBaron - Aprende a dibujar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DibuBaron - Aprende a dibujar fácil y paso a paso",
    description: "Descubre cientos de tutoriales de dibujo gratuitos organizados por categorías",
    images: ["/og-image.jpg"],
  },
};

// Viewport configuration para mobile
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFD93D' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2937' },
  ],
};

// Script para evitar flash de modo claro/oscuro
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('darkMode');
      var isDark = stored !== null
        ? stored === 'true'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${fredoka.variable} ${fredoka.className} antialiased`}
      >
        <DarkModeProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
