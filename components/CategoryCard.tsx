'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { useFavorites } from '@/lib/contexts';

interface CategoryCardProps {
  id: string;
  title: string;
  image: string;
  slug: string;
  count?: number;
}

export default function CategoryCard({ id, title, image, slug, count }: CategoryCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
    >
      <Link href={`/categoria/${slug}`}>
        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900 dark:to-primary-800">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {count && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {count} dibujos
            </p>
          )}
        </div>
      </Link>

      {/* Favorite Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleFavoriteClick}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
          favorite
            ? 'bg-red-500 text-white'
            : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300'
        }`}
      >
        <FiHeart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
      </motion.button>
    </motion.div>
  );
}

