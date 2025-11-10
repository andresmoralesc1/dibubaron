'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VideoCard from '@/components/VideoCard';
import type { YouTubeVideo, VideoCategory } from '@/types/video';

const CATEGORIES: VideoCategory[] = [
  'Animales',
  'Personajes',
  'Naturaleza',
  'Vehículos',
  'Fantasía',
  'Educativo',
  'Otros',
];

export default function TutorialesPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
          setFilteredVideos(data);
        }
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  useEffect(() => {
    let filtered = videos;

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((video) => video.category === selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(term) ||
          video.description?.toLowerCase().includes(term)
      );
    }

    setFilteredVideos(filtered);
  }, [selectedCategory, searchTerm, videos]);

  const featuredVideos = filteredVideos.filter((v) => v.featured);
  const regularVideos = filteredVideos.filter((v) => !v.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              🎨 Tutoriales de Dibujo
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl">
              Aprende a dibujar con nuestros tutoriales paso a paso. Desde
              animales hasta personajes fantásticos, encuentra inspiración para
              crear tus propias obras de arte.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 md:max-w-md">
            <input
              type="text"
              placeholder="Buscar tutoriales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Video Count */}
        <div className="mb-6 text-gray-600">
          Mostrando {filteredVideos.length} {filteredVideos.length === 1 ? 'tutorial' : 'tutoriales'}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredVideos.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl">🎨</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-700">
              No se encontraron tutoriales
            </h3>
            <p className="text-gray-600">
              Intenta con otra búsqueda o categoría
            </p>
          </div>
        )}

        {/* Featured Videos */}
        {!loading && featuredVideos.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              ⭐ Tutoriales Destacados
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredVideos.map((video) => (
                <VideoCard key={video.id} video={video} featured />
              ))}
            </div>
          </div>
        )}

        {/* Regular Videos */}
        {!loading && regularVideos.length > 0 && (
          <div>
            {featuredVideos.length > 0 && (
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Todos los Tutoriales
              </h2>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {regularVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-purple-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            ¿Te gustaron los tutoriales?
          </h2>
          <p className="mb-8 text-lg text-gray-700">
            Suscríbete a nuestro canal de YouTube para no perderte ningún tutorial
          </p>
          <a
            href="https://www.youtube.com/@DibuBaron?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700"
          >
            <svg
              className="mr-2 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Suscribirse a DibuBaron
          </a>
        </div>
      </div>
    </div>
  );
}
