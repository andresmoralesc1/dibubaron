'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import SearchModal from '@/components/SearchModal';
import Breadcrumbs from '@/components/Breadcrumbs';
import { categories } from '@/lib/categories';
import { useDarkMode } from '@/lib/contexts';
import { motion } from 'framer-motion';

export default function CategoriasPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Header
        onSearchClick={() => setSearchOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-fun-yellow via-fun-orange via-fun-pink to-fun-purple text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Categorías' }
              ]}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
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
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg"
                style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
              >
                Todas las Categorías
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-white font-bold max-w-3xl mx-auto drop-shadow-md"
              >
                ¡Elige tu categoría favorita y empieza a dibujar! ✨
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <p className="text-lg md:text-xl text-white/90 font-semibold">
                  {categories.length} categorías disponibles
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
        </section>

        {/* Info Section */}
        <section className="bg-gradient-to-r from-fun-yellow/20 via-fun-pink/20 to-fun-purple/20 dark:bg-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-5xl mb-4 inline-block">⭐</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-primary-400 mb-4">
                  ¡Aprende Dibujando!
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-medium">
                  En DibuBaron encontrarás tutoriales paso a paso para aprender a dibujar tus personajes, animales y objetos favoritos. Cada categoría está llena de dibujos divertidos y fáciles de seguir.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-8">
                  <div className="p-4">
                    <div className="text-4xl mb-2">🎯</div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Fácil de Seguir</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Instrucciones claras paso a paso</p>
                  </div>
                  <div className="p-4">
                    <div className="text-4xl mb-2">🌈</div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Súper Divertido</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dibuja lo que más te gusta</p>
                  </div>
                  <div className="p-4">
                    <div className="text-4xl mb-2">🎨</div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Para Todos</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Desde principiantes hasta expertos</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
