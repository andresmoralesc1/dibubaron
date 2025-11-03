export interface Drawing {
  id: string;
  title: string;
  image: string;
  categoryId: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  views: number;
}

export const drawings: Drawing[] = [
  // Animales
  { id: 'd1', title: 'Gato', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop', categoryId: '1', difficulty: 'facil', views: 1250 },
  { id: 'd2', title: 'Perro', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop', categoryId: '1', difficulty: 'facil', views: 1100 },
  { id: 'd3', title: 'León', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=400&fit=crop', categoryId: '1', difficulty: 'medio', views: 950 },
  { id: 'd4', title: 'Elefante', image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=400&fit=crop', categoryId: '1', difficulty: 'medio', views: 850 },
  { id: 'd5', title: 'Tigre', image: 'https://images.unsplash.com/photo-1615963244664-5b845b2025ee?w=400&h=400&fit=crop', categoryId: '1', difficulty: 'dificil', views: 750 },
  { id: 'd6', title: 'Oso', image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=400&fit=crop', categoryId: '1', difficulty: 'medio', views: 700 },

  // Dinosaurios
  { id: 'd7', title: 'T-Rex', image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=400&h=400&fit=crop', categoryId: '2', difficulty: 'medio', views: 1500 },
  { id: 'd8', title: 'Triceratops', image: 'https://images.unsplash.com/photo-1551887373-6edba6dacbb1?w=400&h=400&fit=crop', categoryId: '2', difficulty: 'medio', views: 980 },
  { id: 'd9', title: 'Velociraptor', image: 'https://images.unsplash.com/photo-1551154120948-76854dca18fc?w=400&h=400&fit=crop', categoryId: '2', difficulty: 'dificil', views: 820 },
  { id: 'd10', title: 'Diplodocus', image: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=400&h=400&fit=crop', categoryId: '2', difficulty: 'medio', views: 650 },

  // Personajes
  { id: 'd11', title: 'Superhéroe', image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=400&fit=crop', categoryId: '3', difficulty: 'dificil', views: 1800 },
  { id: 'd12', title: 'Princesa', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop', categoryId: '3', difficulty: 'medio', views: 1400 },

  // Vehículos
  { id: 'd13', title: 'Coche deportivo', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=400&fit=crop', categoryId: '4', difficulty: 'medio', views: 1100 },
  { id: 'd14', title: 'Avión', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop', categoryId: '4', difficulty: 'dificil', views: 890 },

  // Comida
  { id: 'd15', title: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop', categoryId: '5', difficulty: 'facil', views: 1350 },
  { id: 'd16', title: 'Helado', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop', categoryId: '5', difficulty: 'facil', views: 1200 },
];

export function getDrawingsByCategory(categoryId: string): Drawing[] {
  return drawings.filter(d => d.categoryId === categoryId);
}

export function getDrawingById(id: string): Drawing | undefined {
  return drawings.find(d => d.id === id);
}
