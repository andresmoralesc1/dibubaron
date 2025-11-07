'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserProgress } from '@/lib/gamification';
import { FiMapPin, FiEye, FiTrendingUp, FiAward } from 'react-icons/fi';

export default function ProgressBar() {
  const [progress, setProgress] = useState({
    categoriesVisited: 0,
    productsViewed: 0,
    currentStreak: 0,
    achievements: [] as string[],
  });

  useEffect(() => {
    const userProgress = getUserProgress();
    setProgress(userProgress);
  }, []);

  const stats = [
    {
      icon: FiMapPin,
      label: 'Categorías',
      value: progress.categoriesVisited,
      color: 'text-fun-pink',
      bgColor: 'bg-fun-pink/10',
    },
    {
      icon: FiEye,
      label: 'Cursos Vistos',
      value: progress.productsViewed,
      color: 'text-fun-purple',
      bgColor: 'bg-fun-purple/10',
    },
    {
      icon: FiTrendingUp,
      label: 'Racha',
      value: progress.currentStreak,
      suffix: ' días',
      color: 'text-fun-orange',
      bgColor: 'bg-fun-orange/10',
    },
    {
      icon: FiAward,
      label: 'Logros',
      value: progress.achievements.length,
      color: 'text-fun-yellow',
      bgColor: 'bg-fun-yellow/20',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-fun-yellow/20 via-fun-pink/20 to-fun-purple/20 dark:bg-gray-800/50 rounded-3xl p-4 shadow-xl border-4 border-white dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className={`p-3 ${stat.bgColor} rounded-2xl`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <p className={`text-2xl font-black ${stat.color}`}>
                {stat.value}{stat.suffix || ''}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
