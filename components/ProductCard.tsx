'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiClock, FiAward, FiTrendingUp } from 'react-icons/fi';

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  short_description: string;
  images: Array<{ src: string; alt?: string }>;
  meta_data?: Array<{ key: string; value: string }>;
  featured?: boolean;
  permalink: string;
}

export default function ProductCard({
  name,
  price,
  regular_price,
  sale_price,
  short_description,
  images,
  meta_data = [],
  featured = false,
  permalink
}: ProductCardProps) {
  const hasDiscount = sale_price && parseFloat(sale_price) > 0;
  const discountPercent = hasDiscount
    ? Math.round(((parseFloat(regular_price) - parseFloat(sale_price)) / parseFloat(regular_price)) * 100)
    : 0;

  // Obtener metadatos
  const duracion = meta_data.find(m => m.key === 'duracion')?.value;
  const nivel = meta_data.find(m => m.key === 'nivel')?.value;

  // Imagen del producto o placeholder
  const imageUrl = images && images.length > 0
    ? images[0].src
    : 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800';

  const colors = [
    'border-fun-yellow',
    'border-fun-orange',
    'border-fun-pink',
    'border-fun-purple',
    'border-fun-green',
    'border-primary',
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className={`group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 ${randomColor}`}
    >
      {/* Badge de destacado */}
      {featured && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-fun-yellow to-fun-orange text-dark-base font-extrabold px-4 py-2 rounded-full text-sm shadow-lg flex items-center gap-1">
          <FiTrendingUp className="text-lg" />
          Destacado
        </div>
      )}

      {/* Badge de descuento */}
      {hasDiscount && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white font-extrabold px-4 py-2 rounded-full text-sm shadow-lg">
          -{discountPercent}%
        </div>
      )}

      {/* Imagen del producto */}
      <div className="relative h-56 bg-gradient-to-br from-primary-100 via-fun-yellow/20 to-fun-pink/20 dark:from-primary-900 dark:to-primary-800">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Título */}
        <h3 className="font-extrabold text-xl text-primary dark:text-primary-accent group-hover:scale-105 transition-transform inline-block mb-3">
          {name}
        </h3>

        {/* Descripción corta */}
        <p className="text-sm text-dark-light dark:text-gray-400 mb-4 line-clamp-2">
          {short_description.replace(/<[^>]*>/g, '')}
        </p>

        {/* Metadatos */}
        <div className="flex flex-wrap gap-2 mb-4">
          {duracion && (
            <span className="flex items-center gap-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary dark:text-primary-accent px-3 py-1 rounded-full font-semibold">
              <FiClock />
              {duracion}
            </span>
          )}
          {nivel && (
            <span className="flex items-center gap-1 text-xs bg-fun-purple/20 dark:bg-fun-purple/30 text-fun-purple dark:text-purple-300 px-3 py-1 rounded-full font-semibold">
              <FiAward />
              {nivel}
            </span>
          )}
        </div>

        {/* Precio y botón */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-primary dark:text-primary-accent">
                  ${sale_price}
                </span>
                <span className="text-sm line-through text-gray-500 dark:text-gray-400">
                  ${regular_price}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-extrabold text-primary dark:text-primary-accent">
                ${price}
              </span>
            )}
          </div>

          <a
            href={permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <FiShoppingCart className="text-xl group-hover/btn:scale-110 transition-transform" />
            Ver Curso
          </a>
        </div>
      </div>

      {/* Decoración esquina */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-fun-yellow/30 border-r-[40px] border-r-transparent" />
    </motion.div>
  );
}
