'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import VideoCard from '@/components/VideoCard';
import MainLayout from '@/components/MainLayout';
import type { YouTubeVideo } from '@/types/video';

const VIDEOS_PER_PAGE = 20;

export default function TutorialesPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const observerTarget = useRef<HTMLDivElement>(null);

  // Cargar videos iniciales
  useEffect(() => {
    async function fetchInitialVideos() {
      try {
        const response = await fetch(`/api/videos?limit=${VIDEOS_PER_PAGE}&offset=0`);
        if (response.ok) {
          const data = await response.json();
          setVideos(data.videos || []);
          setHasMore(data.pagination?.hasMore || false);
        }
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialVideos();
  }, []);

  // Cargar más videos
  const loadMoreVideos = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const response = await fetch(
        `/api/videos?limit=${VIDEOS_PER_PAGE}&offset=${videos.length}`
      );
      if (response.ok) {
        const data = await response.json();
        const newVideos = data.videos || [];
        setVideos(prev => [...prev, ...newVideos]);
        setHasMore(data.pagination?.hasMore || false);
      }
    } catch (error) {
      console.error('Error loading more videos:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [videos.length, loadingMore, hasMore]);

  // Intersection Observer para scroll infinito
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreVideos();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreVideos, hasMore, loadingMore]);

  // Filtrar videos por búsqueda
  const filteredVideos = videos.filter(video => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      video.title.toLowerCase().includes(term) ||
      video.description?.toLowerCase().includes(term)
    );
  });

  return (
    <MainLayout showScrollIndicator={true}>
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="text-6xl mb-4 inline-block">🎬</span>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl drop-shadow-lg">
              🎨 Tutoriales de Dibujo en Video
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl font-semibold drop-shadow-md">
              Aprende a dibujar paso a paso con nuestros videos. ¡Descubre nuevos tutoriales cada semana!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <motion.input
              type="text"
              placeholder="Buscar tutoriales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              className="w-full rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-4 pl-12 pr-4 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 text-gray-900 dark:text-gray-100 text-lg shadow-lg transition-all touch-manipulation"
            />
            <svg
              className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400"
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
        </motion.div>

        {/* Video Count */}
        <div className="mb-6 text-gray-600 dark:text-gray-400 text-center">
          {searchTerm ? (
            <span>
              Mostrando {filteredVideos.length} de {videos.length} tutoriales
            </span>
          ) : (
            <span>
              {videos.length} tutoriales disponibles {hasMore && '(cargando más...)'}
            </span>
          )}
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
            <h3 className="mb-2 text-2xl font-bold text-gray-700 dark:text-gray-300">
              No se encontraron tutoriales
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Intenta con otra búsqueda' : 'No hay videos disponibles'}
            </p>
          </div>
        )}

        {/* Videos Grid */}
        {!loading && filteredVideos.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % VIDEOS_PER_PAGE) * 0.02 }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Loading More Indicator */}
        {loadingMore && (
          <div className="flex justify-center py-8">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
          </div>
        )}

        {/* Intersection Observer Target */}
        {!searchTerm && hasMore && !loading && (
          <div ref={observerTarget} className="h-20" />
        )}

        {/* End of Content Message */}
        {!loading && !hasMore && videos.length > 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <span className="text-2xl mb-2 inline-block">🎉</span>
            <p className="font-semibold">¡Has visto todos los tutoriales disponibles!</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-4 inline-block">📺</span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
              ¿Te gustaron los tutoriales?
            </h2>
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
              Suscríbete a nuestro canal de YouTube para no perderte ningún tutorial nuevo
            </p>
            <a
              href="https://www.youtube.com/@DibuBaron?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-700 hover:shadow-xl"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Suscribirse a DibuBaron
            </a>
          </motion.div>
        </div>
        </div>
      </div>
    </MainLayout>
  );
}
