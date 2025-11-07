'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { playClickSound, playHoverSound } from '@/lib/sounds';
import { fireConfettiAt } from '@/lib/confetti';
import { visitCategory } from '@/lib/gamification';

interface CategoryCardProps {
  id: string;
  title: string;
  image: string;
  slug: string;
  count?: number;
}

export default function CategoryCard({ title, image, slug, count }: CategoryCardProps) {

  const colors = [
    'border-fun-yellow',
    'border-fun-orange',
    'border-fun-pink',
    'border-fun-purple',
    'border-fun-green',
    'border-primary',
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const handleClick = (e: React.MouseEvent) => {
    playClickSound();
    fireConfettiAt(e.clientX, e.clientY);
    visitCategory(); // Registrar visita para gamificación
  };

  const handleHover = () => {
    playHoverSound();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -12, rotate: Math.random() > 0.5 ? 3 : -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleHover}
      className={`group block bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative border-4 ${randomColor}`}
    >
      <Link href={`/categoria/${slug}`} onClick={handleClick}>
        <div className="relative h-48 bg-gradient-to-br from-primary-100 via-fun-yellow/20 to-fun-pink/20 dark:from-primary-900 dark:to-primary-800">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-300"
          />

          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/20" />
        </div>
        <div className="p-5 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <h3 className="font-extrabold text-xl text-primary dark:text-primary-accent group-hover:scale-105 transition-transform inline-block">
            {title}
          </h3>
          {count && (
            <p className="text-sm text-dark-light dark:text-gray-400 mt-2 font-semibold flex items-center gap-1">
              <span className="text-lg">✨</span>
              {count} dibujos
            </p>
          )}
        </div>
      </Link>

      {/* Decoración esquina */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-fun-yellow/30 border-r-[40px] border-r-transparent" />
    </motion.div>
  );
}

