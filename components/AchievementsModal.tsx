'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAward } from 'react-icons/fi';
import { getUnlockedAchievements, Achievement } from '@/lib/gamification';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAchievements(getUnlockedAchievements());
    }
  }, [isOpen]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 border-4 border-fun-yellow"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-fun-yellow via-fun-orange to-fun-pink p-6 rounded-t-3xl border-b-4 border-fun-purple">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg flex items-center gap-3">
                    <FiAward className="text-4xl" />
                    ¡Tus Logros! 🏆
                  </h2>
                  <p className="text-white font-bold mt-2 text-lg">
                    Has desbloqueado {unlockedCount} de {totalCount} logros
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  aria-label="Cerrar"
                >
                  <FiX className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-5 rounded-2xl border-4 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-fun-yellow/20 to-fun-orange/20 border-fun-yellow shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Emoji/Icon */}
                    <div className={`text-5xl ${achievement.unlocked ? 'animate-bounce-fun' : 'grayscale'}`}>
                      {achievement.emoji}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-dark-base dark:text-white flex items-center gap-2">
                        {achievement.title}
                        {achievement.unlocked && (
                          <span className="text-sm bg-fun-green text-white px-3 py-1 rounded-full font-bold">
                            ¡Desbloqueado!
                          </span>
                        )}
                      </h3>
                      <p className="text-dark-light dark:text-gray-400 font-medium mt-1">
                        {achievement.description}
                      </p>
                    </div>

                    {/* Lock/Check */}
                    <div>
                      {achievement.unlocked ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-4xl"
                        >
                          ✅
                        </motion.div>
                      ) : (
                        <div className="text-4xl">
                          🔒
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer motivacional */}
            <div className="sticky bottom-0 bg-gradient-to-r from-fun-purple via-fun-pink to-fun-orange p-4 rounded-b-3xl text-center">
              <p className="text-white font-extrabold text-lg">
                {unlockedCount === totalCount
                  ? '🎉 ¡Felicidades! ¡Has desbloqueado TODOS los logros! 🎉'
                  : `¡Sigue dibujando para desbloquear ${totalCount - unlockedCount} logros más! 🎨`}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
