'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';
import type { Drawing } from '@/lib/drawings';

interface DrawingCardProps {
  drawing: Drawing;
}

export default function DrawingCard({ drawing }: DrawingCardProps) {

  const difficultyColors = {
    facil: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medio: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    dificil: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const difficultyLabels = {
    facil: 'Fácil',
    medio: 'Medio',
    dificil: 'Difícil',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden relative group"
    >
      <div className="relative h-64 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900 dark:to-primary-800">
        <Image
          src={drawing.image}
          alt={drawing.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[drawing.difficulty]}`}>
            {difficultyLabels[drawing.difficulty]}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">
          {drawing.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FiEye className="w-4 h-4" />
          <span>{drawing.views.toLocaleString()} vistas</span>
        </div>
      </div>
    </motion.div>
  );
}
