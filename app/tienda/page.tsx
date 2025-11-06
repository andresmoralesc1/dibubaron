import { Metadata } from 'next';
import TiendaPage from '@/components/TiendaPage';

export const metadata: Metadata = {
  title: 'Tienda de Cursos - DibuBaron',
  description: 'Descubre nuestros cursos de dibujo para niños y adultos. Aprende desde cero con tutoriales paso a paso.',
  keywords: 'cursos de dibujo, clases de arte, aprender a dibujar, cursos online, dibujo digital, manga, anime',
  openGraph: {
    title: 'Tienda de Cursos - DibuBaron',
    description: 'Descubre nuestros cursos de dibujo para niños y adultos',
    type: 'website',
  },
};

export const revalidate = 3600; // Revalidar cada hora

export default function Tienda() {
  return <TiendaPage />;
}
