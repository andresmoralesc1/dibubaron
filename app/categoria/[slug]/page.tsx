'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { categories } from '@/lib/categories';
import { getDrawingsByCategory } from '@/lib/drawings';
import MainLayout from '@/components/MainLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import DrawingCard from '@/components/DrawingCard';
import ShareButtons from '@/components/ShareButtons';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [filter, setFilter] = useState<'todos' | 'facil' | 'medio' | 'dificil'>('todos');

  const category = categories.find(cat => cat.slug === slug);
  const allDrawings = category ? getDrawingsByCategory(category.id) : [];

  const filteredDrawings = filter === 'todos'
    ? allDrawings
    : allDrawings.filter(d => d.difficulty === filter);

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
        <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-12">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              items={[
                { label: 'Categorías', href: '/' },
                { label: category.title }
              ]}
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mt-6 mb-4"
            >
              {category.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-50 mb-6"
            >
              {category.count} dibujos disponibles
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

        {/* Filters Section */}
        <section className="bg-gray-50 dark:bg-gray-800 py-6 border-b dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('todos')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'todos'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Todos ({allDrawings.length})
              </button>
              <button
                onClick={() => setFilter('facil')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'facil'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Fácil ({allDrawings.filter(d => d.difficulty === 'facil').length})
              </button>
              <button
                onClick={() => setFilter('medio')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'medio'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Medio ({allDrawings.filter(d => d.difficulty === 'medio').length})
              </button>
              <button
                onClick={() => setFilter('dificil')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'dificil'
                    ? 'bg-primary text-white'
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
    </MainLayout>
  );
}
