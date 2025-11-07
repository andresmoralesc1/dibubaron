import type { Metadata } from "next";
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
  title: "DibuBaron - Aprende a dibujar fácil y paso a paso",
  description: "Descubre cientos de tutoriales de dibujo gratuitos organizados por categorías. Aprende a dibujar animales, personajes, vehículos y mucho más paso a paso.",
  keywords: "dibujos, tutoriales, aprender a dibujar, dibujos paso a paso, dibujos para niños",
  authors: [{ name: "DibuBaron" }],
  openGraph: {
    title: "DibuBaron - Aprende a dibujar fácil y paso a paso",
    description: "Descubre cientos de tutoriales de dibujo gratuitos organizados por categorías",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "DibuBaron - Aprende a dibujar fácil y paso a paso",
    description: "Descubre cientos de tutoriales de dibujo gratuitos organizados por categorías",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
