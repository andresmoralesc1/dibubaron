export interface Category {
  id: string;
  title: string;
  slug: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: '1',
    title: 'Animales',
    slug: 'animales',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=300&fit=crop',
    count: 150,
  },
  {
    id: '2',
    title: 'Dinosaurios',
    slug: 'dinosaurios',
    image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=400&h=300&fit=crop',
    count: 45,
  },
  {
    id: '3',
    title: 'Personajes de Dibujos',
    slug: 'personajes',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop',
    count: 120,
  },
  {
    id: '4',
    title: 'Vehículos',
    slug: 'vehiculos',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop',
    count: 60,
  },
  {
    id: '5',
    title: 'Comida',
    slug: 'comida',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    count: 80,
  },
  {
    id: '6',
    title: 'Naturaleza',
    slug: 'naturaleza',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    count: 70,
  },
  {
    id: '7',
    title: 'Princesas',
    slug: 'princesas',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    count: 50,
  },
  {
    id: '8',
    title: 'Deportes',
    slug: 'deportes',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    count: 40,
  },
  {
    id: '9',
    title: 'Profesiones',
    slug: 'profesiones',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    count: 55,
  },
  {
    id: '10',
    title: 'Pokémon',
    slug: 'pokemon',
    image: 'https://images.unsplash.com/photo-1542779283-429940ce8336?w=400&h=300&fit=crop',
    count: 90,
  },
  {
    id: '11',
    title: 'Minecraft',
    slug: 'minecraft',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    count: 65,
  },
  {
    id: '12',
    title: 'Navidad',
    slug: 'navidad',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop',
    count: 75,
  },
];
