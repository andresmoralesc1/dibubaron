import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DarkModeProvider, FavoritesProvider } from '@/lib/contexts';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
