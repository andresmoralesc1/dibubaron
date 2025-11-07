'use client';

import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CategoryCard from './CategoryCard';
import SearchModal from './SearchModal';
import MascotGuide from './MascotGuide';
import ProgressBar from './ProgressBar';
import AchievementsModal from './AchievementsModal';
import AchievementUnlocked from './AchievementUnlocked';
import { categories } from '@/lib/categories';
import { useDarkMode } from '@/lib/contexts';
import { useAchievements } from '@/lib/useAchievements';
import { motion } from 'framer-motion';
import { playSuccessSound } from '@/lib/sounds';
import { fireCornerConfetti, fireEmojiRain } from '@/lib/confetti';
import { FiAward } from 'react-icons/fi';

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { newAchievement, clearAchievement } = useAchievements();

  const popularCategories = categories.slice(0, 6);

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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Header
        onSearchClick={() => setSearchOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-grow">
        {/* Barra de progreso */}
        <div className="container mx-auto px-4 py-6">
          <ProgressBar />

          {/* Botón de logros */}
          <motion.button
            onClick={() => setAchievementsOpen(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full sm:w-auto bg-gradient-to-r from-fun-yellow to-fun-orange text-dark-base font-extrabold text-lg px-8 py-4 rounded-full shadow-kid hover:shadow-kid-hover hover:translate-y-1 flex items-center justify-center gap-3"
          >
            <FiAward className="text-2xl" />
            Ver Mis Logros 🏆
          </motion.button>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-fun-yellow via-fun-orange via-fun-pink to-fun-purple text-white py-20 md:py-24 overflow-hidden">
          {/* Elementos decorativos flotantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full"
            />
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute top-20 right-20 w-12 h-12 bg-white/20 rounded-full"
            />
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/15 rounded-full"
            />
            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-10 right-1/3 w-14 h-14 bg-white/15 rounded-full"
            />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mb-6"
            >
              <span className="text-6xl md:text-8xl">🎨</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg"
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
            >
              ¡Aprende a Dibujar! 🎨✨
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl text-white font-bold max-w-3xl mx-auto drop-shadow-md"
            >
              🌟 Dibuja tus personajes favoritos paso a paso 🖍️
            </motion.p>
          </div>
        </section>

        {/* Popular Categories Section */}
        <section className="container mx-auto px-4 py-12 bg-gradient-to-b from-white to-fun-yellow/10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <span className="text-5xl">⭐</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-primary mb-3"
            >
              🌟 ¡Los Más Dibujados! ⭐
            </motion.h2>
            <p className="text-dark-light text-xl font-bold">
              ¡Estos son los favoritos de todos los niños! 😊
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {popularCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.title}
                image={category.image}
                slug={category.slug}
                count={category.count}
              />
            ))}
          </div>
        </section>

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
                    image={category.image}
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
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-5 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/50 text-dark font-medium shadow-xl"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-fun-purple px-10 py-5 rounded-full font-extrabold text-xl hover:bg-fun-yellow hover:scale-110 transition-all shadow-kid hover:shadow-kid-hover hover:translate-y-1 active:translate-y-2 active:shadow-kid-active"
                >
                  ¡Suscribirme! 🚀✨
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AchievementsModal isOpen={achievementsOpen} onClose={() => setAchievementsOpen(false)} />
      <MascotGuide />
      <AchievementUnlocked achievement={newAchievement} onClose={clearAchievement} />
    </div>
  );
}
