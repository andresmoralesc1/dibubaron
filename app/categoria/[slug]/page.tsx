'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { categories } from '@/lib/categories';
import { getDrawingsByCategory } from '@/lib/drawings';
import MainLayout from '@/components/MainLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import DrawingCard from '@/components/DrawingCard';
import VideoCard from '@/components/VideoCard';
import ShareButtons from '@/components/ShareButtons';
import { motion } from 'framer-motion';
import type { YouTubeVideo } from '@/types/video';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [filter, setFilter] = useState<'todos' | 'facil' | 'medio' | 'dificil'>('todos');
  const [activeTab, setActiveTab] = useState<'dibujos' | 'videos'>('videos');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const category = categories.find(cat => cat.slug === slug);
  const allDrawings = category ? getDrawingsByCategory(category.id) : [];

  const filteredDrawings = filter === 'todos'
    ? allDrawings
    : allDrawings.filter(d => d.difficulty === filter);

  // Cargar videos de YouTube de esta categoría
  useEffect(() => {
    async function fetchCategoryVideos() {
      if (!category) return;

      setLoadingVideos(true);
      try {
        const response = await fetch(`/api/videos?category=${category.title}&limit=50`);
        if (response.ok) {
          const data = await response.json();
          setVideos(data.videos || []);
        }
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoadingVideos(false);
      }
    }

    fetchCategoryVideos();
  }, [category?.title]);

  if (!category) {
    return (
      <MainLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Categoría no encontrada
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              La categoría que buscas no existe
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
        {/* Hero Section */}
        <section className={`bg-gradient-to-r ${category.color || 'from-primary-500 to-primary-600'} text-white py-12`}>
          <div className="container mx-auto px-4">
            <Breadcrumbs
              items={[
                { label: 'Categorías', href: '/categorias' },
                { label: category.title }
              ]}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mt-6 mb-4"
            >
              {category.emoji && (
                <span className="text-6xl">{category.emoji}</span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold">
                {category.title}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-6"
            >
              {videos.length} videos • {allDrawings.length} dibujos disponibles
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold mb-3">Compartir categoría:</h3>
              <ShareButtons
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title={`Dibujos de ${category.title} - DibuBaron`}
              />
            </motion.div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="bg-white dark:bg-gray-900 py-4 border-b dark:border-gray-700 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
                  activeTab === 'videos'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                🎬 Videos ({videos.length})
              </button>
              <button
                onClick={() => setActiveTab('dibujos')}
                className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
                  activeTab === 'dibujos'
                    ? 'bg-gradient-to-r from-fun-purple to-fun-pink text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                🎨 Dibujos ({allDrawings.length})
              </button>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        {activeTab === 'videos' && (
          <section className="container mx-auto px-4 py-12">
            {loadingVideos ? (
              <div className="flex justify-center py-20">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl mb-4"
                  >
                    🎬
                  </motion.div>
                  <p className="text-gray-500 dark:text-gray-400 font-semibold">Cargando videos...</p>
                </div>
              </div>
            ) : videos.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 text-center"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Tutoriales de {category.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Aprende a dibujar paso a paso con nuestros videos
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <VideoCard video={video} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                  No hay videos en esta categoría
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Pronto agregaremos tutoriales de {category.title}
                </p>
                <a
                  href="https://www.youtube.com/@DibuBaron?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Suscríbete al canal
                </a>
              </div>
            )}
          </section>
        )}

        {/* Dibujos Section */}
        {activeTab === 'dibujos' && (
          <>
            {/* Filters Section */}
            <section className="bg-gray-50 dark:bg-gray-800 py-6 border-b dark:border-gray-700">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setFilter('todos')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'todos'
                        ? 'bg-fun-purple text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    Todos ({allDrawings.length})
                  </button>
                  <button
                    onClick={() => setFilter('facil')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'facil'
                        ? 'bg-fun-purple text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    Fácil ({allDrawings.filter(d => d.difficulty === 'facil').length})
                  </button>
                  <button
                    onClick={() => setFilter('medio')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'medio'
                        ? 'bg-fun-purple text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    Medio ({allDrawings.filter(d => d.difficulty === 'medio').length})
                  </button>
                  <button
                    onClick={() => setFilter('dificil')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'dificil'
                        ? 'bg-fun-purple text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    Difícil ({allDrawings.filter(d => d.difficulty === 'dificil').length})
                  </button>
                </div>
              </div>
            </section>

            {/* Drawings Grid */}
            <section className="container mx-auto px-4 py-12">
              {filteredDrawings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredDrawings.map((drawing, index) => (
                    <motion.div
                      key={drawing.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <DrawingCard drawing={drawing} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No hay dibujos en esta categoría con el filtro seleccionado
                  </p>
                </div>
              )}
            </section>
          </>
        )}
    </MainLayout>
  );
}
