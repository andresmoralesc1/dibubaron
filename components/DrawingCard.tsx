'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';
import { playHoverSound } from '@/lib/sounds';
import { lightVibration } from '@/lib/haptics';
import type { Drawing } from '@/lib/drawings';

interface DrawingCardProps {
  drawing: Drawing;
}

const difficultyConfig = {
  facil: {
    label: 'Fácil',
    emoji: '🟢',
    classes: 'bg-fun-green/20 text-fun-green border-fun-green/30',
  },
  medio: {
    label: 'Medio',
    emoji: '🟡',
    classes: 'bg-fun-yellow/20 text-fun-orange border-fun-yellow/30',
  },
  dificil: {
    label: 'Difícil',
    emoji: '🔴',
    classes: 'bg-fun-red/20 text-fun-red border-fun-red/30',
  },
};

export default function DrawingCard({ drawing }: DrawingCardProps) {
  const difficulty = difficultyConfig[drawing.difficulty];

  const handleHover = () => {
    playHoverSound();
    lightVibration();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden relative group touch-manipulation"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-fun-yellow/20 dark:from-primary-900 dark:to-primary-800">
        <Image
          src={drawing.image}
          alt={drawing.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${difficulty.classes} backdrop-blur-sm flex items-center gap-1`}>
            <span>{difficulty.emoji}</span>
            {difficulty.label}
          </span>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/10" />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 group-hover:text-fun-purple transition-colors">
          {drawing.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
          <FiEye className="w-4 h-4" />
          <span>{drawing.views.toLocaleString()} vistas</span>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-white/30 border-l-[30px] border-l-transparent" />
    </motion.div>
  );
}
