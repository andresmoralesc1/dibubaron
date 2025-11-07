'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import Breadcrumbs from './Breadcrumbs';
import { FiX } from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  description: string;
  short_description: string;
  images: Array<{
    id: number;
    src: string;
    name: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_status: string;
  in_stock: boolean;
  featured?: boolean;
  meta_data?: Array<{ key: string; value: string }>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch products
        const productsRes = await fetch('/api/products');
        if (!productsRes.ok) throw new Error('Error al cargar productos');
        const productsData = await productsRes.json();
        setProducts(productsData);

        // Fetch categories
        const categoriesRes = await fetch('/api/categories');
        if (!categoriesRes.ok) throw new Error('Error al cargar categorías');
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData.filter((cat: Category) => cat.count > 0));

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('No se pudieron cargar los productos. Por favor intenta más tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product =>
        product.categories.some(cat => cat.slug === selectedCategory)
      );

  // Separar productos destacados
  const featuredProducts = filteredProducts.filter(p => p.featured);
  const regularProducts = filteredProducts.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-fun-yellow/10 dark:from-gray-900 dark:via-gray-900 dark:to-primary-900/20">
      <div className="container-custom py-8">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Tienda', href: '/tienda' },
          ]}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-black text-primary dark:text-primary-accent mb-4 flex items-center justify-center gap-4">
            🛒 Tienda de Cursos 🎨
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-dark-light dark:text-gray-300 max-w-2xl mx-auto">
            ✨ ¡Descubre cursos súper divertidos para aprender a dibujar! 🌟
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-dark-light dark:text-gray-400">Cargando cursos...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 text-red-700 dark:text-red-300 px-6 py-4 rounded-2xl text-center mb-8">
            {error}
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Filtros */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🔍</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark-base dark:text-white">
                  Elige tu Categoría Favorita
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-8 py-4 rounded-full font-extrabold text-lg transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-fun-pink to-fun-purple text-white shadow-kid hover:shadow-kid-hover hover:translate-y-1'
                      : 'bg-white dark:bg-gray-800 text-dark-base dark:text-white hover:bg-fun-yellow/30 dark:hover:bg-primary-900 shadow-lg hover:scale-105'
                  }`}
                >
                  🎨 Todos los cursos ({products.length})
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category.slug
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-800 text-dark-base dark:text-white hover:bg-primary-100 dark:hover:bg-primary-900'
                    }`}
                  >
                    {category.name}
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                    {selectedCategory === category.slug && (
                      <FiX className="text-lg" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Productos destacados */}
            {featuredProducts.length > 0 && (
              <div className="mb-12">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl md:text-5xl font-black text-primary dark:text-primary-accent mb-6 flex items-center gap-3"
                >
                  ⭐ ¡Cursos Súper Especiales! ✨
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Todos los productos */}
            {regularProducts.length > 0 && (
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl font-black text-primary dark:text-primary-accent mb-6 flex items-center gap-3"
                >
                  📚 {selectedCategory === 'all' ? 'Todos los Cursos' : 'Más Cursos'}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index + featuredProducts.length) * 0.1 }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Sin resultados */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-dark-light dark:text-gray-400">
                  No hay cursos disponibles en esta categoría
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
