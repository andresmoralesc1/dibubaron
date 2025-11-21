export interface Category {
  id: string;
  title: string;
  slug: string;
  image: string;
  emoji?: string;
  color?: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: '1',
    title: 'Animales',
    slug: 'animales',
    image: '',
    emoji: '🦁',
    color: 'from-orange-400 to-yellow-400',
    count: 150,
  },
  {
    id: '2',
    title: 'Dinosaurios',
    slug: 'dinosaurios',
    image: '',
    emoji: '🦖',
    color: 'from-green-500 to-emerald-400',
    count: 45,
  },
  {
    id: '3',
    title: 'Personajes de Dibujos',
    slug: 'personajes',
    image: '',
    emoji: '🎭',
    color: 'from-purple-500 to-pink-400',
    count: 120,
  },
  {
    id: '4',
    title: 'Vehículos',
    slug: 'vehiculos',
    image: '',
    emoji: '🚗',
    color: 'from-red-500 to-orange-400',
    count: 60,
  },
  {
    id: '5',
    title: 'Comida',
    slug: 'comida',
    image: '',
    emoji: '🍕',
    color: 'from-amber-500 to-yellow-400',
    count: 80,
  },
  {
    id: '6',
    title: 'Naturaleza',
    slug: 'naturaleza',
    image: '',
    emoji: '🌸',
    color: 'from-pink-400 to-rose-300',
    count: 70,
  },
  {
    id: '7',
    title: 'Princesas',
    slug: 'princesas',
    image: '',
    emoji: '👸',
    color: 'from-fuchsia-400 to-pink-300',
    count: 50,
  },
  {
    id: '8',
    title: 'Deportes',
    slug: 'deportes',
    image: '',
    emoji: '⚽',
    color: 'from-blue-500 to-cyan-400',
    count: 40,
  },
  {
    id: '9',
    title: 'Profesiones',
    slug: 'profesiones',
    image: '',
    emoji: '👨‍🚀',
    color: 'from-indigo-500 to-blue-400',
    count: 55,
  },
  {
    id: '10',
    title: 'Pokémon',
    slug: 'pokemon',
    image: '',
    emoji: '⚡',
    color: 'from-yellow-400 to-amber-300',
    count: 90,
  },
  {
    id: '11',
    title: 'Minecraft',
    slug: 'minecraft',
    image: '',
    emoji: '⛏️',
    color: 'from-lime-500 to-green-400',
    count: 65,
  },
  {
    id: '12',
    title: 'Navidad',
    slug: 'navidad',
    image: '',
    emoji: '🎄',
    color: 'from-red-500 to-green-500',
    count: 75,
  },
];
