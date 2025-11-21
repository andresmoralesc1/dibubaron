'use client';

import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import VideoCard from './VideoCard';
import MainLayout from './MainLayout';
import VideoSection from './VideoSection';
import { categories } from '@/lib/categories';
import { motion } from 'framer-motion';
import { playSuccessSound } from '@/lib/sounds';
import { fireCornerConfetti, fireEmojiRain } from '@/lib/confetti';
import type { YouTubeVideo } from '@/types/video';

export default function HomePage() {
  const [topVideos, setTopVideos] = useState<YouTubeVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    async function fetchTopVideos() {
      try {
        const response = await fetch('/api/videos?limit=3&offset=0');
        if (response.ok) {
          const data = await response.json();
          setTopVideos(data.videos || data);
        }
      } catch (error) {
        console.error('Error loading top videos:', error);
      } finally {
        setLoadingVideos(false);
      }
    }

    fetchTopVideos();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessSound();
    fireCornerConfetti();
    fireEmojiRain('🎨');

    // Simular envío exitoso
    setTimeout(() => {
      alert('¡Genial! 🎉 Te has suscrito a nuestra newsletter. ¡Prepárate para recibir dibujos súper divertidos!');
    }, 500);
  };

  return (
    <MainLayout>
      {/* Top YouTube Videos Section - Hero */}
        <section className="w-full bg-gradient-to-b from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <span className="text-5xl">🎬</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-3"
              >
                🎨 ¡Los Videos Más Populares! 🌟
              </motion.h2>
              <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl font-bold">
                Aprende a dibujar con los tutoriales favoritos de todos 📺✨
              </p>
            </div>

            {loadingVideos ? (
              <div className="flex justify-center py-12">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
              </div>
            ) : topVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {topVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <VideoCard video={video} />
                  </motion.div>
                ))}
              </div>
            ) : null}

            {/* CTA to YouTube */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <a
                href="https://www.youtube.com/@DibuBaron?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                ¡Suscríbete a nuestro canal!
              </a>
            </motion.div>
          </div>
        </section>

        {/* Video Tutorials Section */}
        <VideoSection />

        {/* All Categories Section */}
        <section className="bg-gray-light dark:bg-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark dark:text-gray-200 mb-3">
                Todas las Categorías
              </h2>
              <p className="text-dark-light dark:text-gray-400 text-lg">
                Elige una categoría y comienza a dibujar
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CategoryCard
                    id={category.id}
                    title={category.title}
                    emoji={category.emoji}
                    color={category.color}
                    slug={category.slug}
                    count={category.count}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Tutoriales Paso a Paso</h3>
                <p className="text-gray-600 dark:text-gray-400">Aprende a dibujar siguiendo instrucciones claras y sencillas</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Cientos de Dibujos</h3>
                <p className="text-gray-600 dark:text-gray-400">Amplia variedad de dibujos en múltiples categorías</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-6"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">100% Gratis</h3>
                <p className="text-gray-600 dark:text-gray-400">Todo el contenido es gratuito y sin registro</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative bg-gradient-to-r from-fun-purple via-fun-pink via-fun-orange to-fun-yellow py-20 overflow-hidden">
          {/* Decoraciones */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-10 text-6xl opacity-20"
            >
              ✏️
            </motion.span>
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 right-10 text-6xl opacity-20"
            >
              🖍️
            </motion.span>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <span className="text-5xl mb-4 inline-block">📧</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                ¡Nuevos Dibujos Cada Semana! 🎉
              </h2>
              <p className="text-white font-semibold mb-8 text-lg drop-shadow-md">
                Suscríbete y recibe ideas súper divertidas
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    className="w-full px-6 py-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/50 text-gray-900 font-semibold shadow-2xl text-lg border-4 border-white/50 placeholder:text-gray-400"
                    required
                  />
                  <motion.div
                    className="absolute left-0 -bottom-1 h-1 bg-white rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-fun-purple px-10 py-5 rounded-2xl font-extrabold text-xl shadow-2xl hover:bg-fun-yellow transition-colors border-4 border-white/50 whitespace-nowrap"
                >
                  ¡Suscribirme! 🚀
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
    </MainLayout>
  );
}
