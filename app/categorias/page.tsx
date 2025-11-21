'use client';

import CategoryCard from '@/components/CategoryCard';
import MainLayout from '@/components/MainLayout';
import HeroSection from '@/components/ui/HeroSection';
import { categories } from '@/lib/categories';
import { motion } from 'framer-motion';

export default function CategoriasPage() {
  return (
    <MainLayout>
      <HeroSection
        title="Todas las Categorías"
        subtitle={`¡Elige tu categoría favorita y empieza a dibujar! ✨ ${categories.length} categorías disponibles`}
        emoji="🎨"
        gradient="fun"
        size="lg"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Categorías' }
        ]}
      />

      {/* Categories Grid Section */}
      <section className="container mx-auto px-4 py-16">
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
                emoji={category.emoji}
                color={category.color}
                slug={category.slug}
                count={category.count}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-fun-yellow/10 via-fun-pink/10 to-fun-purple/10 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-5xl mb-4 inline-block">⭐</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
                ¡Aprende Dibujando!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 font-medium">
                En DibuBaron encontrarás tutoriales paso a paso para aprender a dibujar tus personajes, animales y objetos favoritos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-lg">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Fácil de Seguir</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Instrucciones claras paso a paso</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-lg">
                  <div className="text-4xl mb-3">🌈</div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Súper Divertido</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dibuja lo que más te gusta</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-lg">
                  <div className="text-4xl mb-3">🎨</div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Para Todos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Desde principiantes hasta expertos</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
