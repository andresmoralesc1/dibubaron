'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { playClickSound, playHoverSound } from '@/lib/sounds';
import { fireConfettiAt } from '@/lib/confetti';
import { visitCategory } from '@/lib/gamification';
import { lightVibration, successVibration } from '@/lib/haptics';

interface CategoryCardProps {
  id: string;
  title: string;
  image?: string;
  emoji?: string;
  color?: string;
  slug: string;
  count?: number;
}

export default function CategoryCard({ title, emoji, color, slug, count }: CategoryCardProps) {

  const handleClick = (e: React.MouseEvent) => {
    playClickSound();
    successVibration();
    fireConfettiAt(e.clientX, e.clientY);
    visitCategory();
  };

  const handleHover = () => {
    playHoverSound();
    lightVibration();
  };

  // Default gradient if no color specified
  const gradientColor = color || 'from-purple-500 to-pink-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -12, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
      className="group block bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl active:shadow-lg transition-all duration-300 overflow-hidden relative touch-manipulation"
    >
      <Link href={`/categoria/${slug}`} onClick={handleClick}>
        {/* Emoji Background */}
        <div className={`relative h-40 bg-gradient-to-br ${gradientColor} flex items-center justify-center overflow-hidden`}>
          {/* Animated emoji */}
          <motion.span
            className="text-8xl filter drop-shadow-lg select-none"
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {emoji || '🎨'}
          </motion.span>

          {/* Floating decorations */}
          <motion.div
            className="absolute top-4 left-4 text-3xl opacity-40"
            animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-4 text-3xl opacity-40"
            animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🌟
          </motion.div>

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/20" />
        </div>

        {/* Content */}
        <div className="p-5 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 text-center">
          <h3 className="font-extrabold text-xl text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          {count && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-semibold flex items-center justify-center gap-1">
              <span className="text-lg">✏️</span>
              {count} dibujos
            </p>
          )}
        </div>
      </Link>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-white/30 border-l-[30px] border-l-transparent" />
    </motion.div>
  );
}
