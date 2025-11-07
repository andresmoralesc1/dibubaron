'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/lib/gamification';
import { playSuccessSound } from '@/lib/sounds';
import { fireBigConfetti, fireStars } from '@/lib/confetti';

interface AchievementUnlockedProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementUnlocked({ achievement, onClose }: AchievementUnlockedProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      playSuccessSound();
      fireBigConfetti();
      fireStars();

      // Auto-cerrar después de 5 segundos
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [achievement]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center"
            onClick={handleClose}
          >
            {/* Notification */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="bg-gradient-to-br from-fun-yellow via-fun-orange to-fun-pink p-8 rounded-3xl shadow-2xl max-w-md mx-4 border-4 border-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Título */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-4"
              >
                <h2 className="text-4xl font-black text-white drop-shadow-lg">
                  🎉 ¡LOGRO DESBLOQUEADO! 🎉
                </h2>
              </motion.div>

              {/* Emoji del logro */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 150
                }}
                className="text-9xl text-center my-6"
              >
                {achievement.emoji}
              </motion.div>

              {/* Detalles */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 text-center"
              >
                <h3 className="text-3xl font-black text-primary mb-2">
                  {achievement.title}
                </h3>
                <p className="text-lg text-dark-light font-semibold">
                  {achievement.description}
                </p>
              </motion.div>

              {/* Botón cerrar */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-white text-fun-purple font-extrabold text-xl py-4 rounded-full shadow-kid hover:shadow-kid-hover hover:translate-y-1"
              >
                ¡Genial! 🌟
              </motion.button>

              {/* Decoración de estrellas */}
              <div className="absolute -top-4 -left-4 text-4xl animate-spin" style={{ animationDuration: '3s' }}>
                ⭐
              </div>
              <div className="absolute -top-4 -right-4 text-4xl animate-spin" style={{ animationDuration: '4s' }}>
                ✨
              </div>
              <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce">
                🎨
              </div>
              <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                🖍️
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
