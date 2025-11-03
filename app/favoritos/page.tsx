'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DrawingCard from '@/components/DrawingCard';
import SearchModal from '@/components/SearchModal';
import { useDarkMode, useFavorites } from '@/lib/contexts';
import { drawings } from '@/lib/drawings';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';

export default function FavoritesPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { favorites } = useFavorites();

  const favoriteDrawings = drawings.filter(d => favorites.includes(d.id));

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Header
        onSearchClick={() => setSearchOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <FiHeart className="w-12 h-12" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Mis Favoritos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-primary-50"
            >
              {favoriteDrawings.length} {favoriteDrawings.length === 1 ? 'dibujo guardado' : 'dibujos guardados'}
            </motion.p>
          </div>
        </section>

        {/* Favorites Grid */}
        <section className="container mx-auto px-4 py-12">
          {favoriteDrawings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteDrawings.map((drawing, index) => (
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <FiHeart className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-700 mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                No tienes favoritos aún
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Explora nuestras categorías y marca tus dibujos favoritos
              </p>
              <a
                href="/"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Explorar Categorías
              </a>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
