export interface YouTubeVideo {
  id: number;
  video_id: string;
  title: string;
  description?: string;
  thumbnail_url: string;
  video_url: string;
  published_at: string;
  category?: string;
  featured: boolean;
  view_count?: number;
  created_at?: string;
}

export type VideoCategory =
  | 'Animales'
  | 'Personajes'
  | 'Naturaleza'
  | 'Vehículos'
  | 'Fantasía'
  | 'Educativo'
  | 'Otros';
