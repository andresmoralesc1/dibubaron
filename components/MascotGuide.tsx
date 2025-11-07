'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { getUserProgress, getContextualMessage, updateStreak } from '@/lib/gamification';
import { playHoverSound } from '@/lib/sounds';

export default function MascotGuide() {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Actualizar racha y obtener progreso
    const progress = updateStreak();
    setMessage(getContextualMessage(progress));

    // Cambiar mensaje cada 30 segundos
    const interval = setInterval(() => {
      const currentProgress = getUserProgress();
      setMessage(getContextualMessage(currentProgress));
      setIsVisible(true);
      setIsMinimized(false);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMinimized(true);
      setIsVisible(true);
    }, 300);
  };

  const handleExpand = () => {
    playHoverSound();
    setIsMinimized(false);
  };

  if (!isVisible && !isMinimized) return null;

  return (
    <AnimatePresence>
      {isMinimized ? (
        // Versión minimizada - solo el osito
        <motion.div
          key="minimized"
          initial={{ scale: 0, x: 100 }}
          animate={{ scale: 1, x: 0 }}
          exit={{ scale: 0, x: 100 }}
          className="fixed bottom-6 right-6 z-50 cursor-pointer"
          onClick={handleExpand}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-7xl filter drop-shadow-2xl"
          >
            🐻
          </motion.div>
          {/* Indicador de nuevo mensaje */}
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-4 h-4 bg-fun-pink rounded-full border-2 border-white"
          />
        </motion.div>
      ) : (
        // Versión completa - con mensaje
        <motion.div
          key="full"
          initial={{ scale: 0, x: 100, y: 100 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          exit={{ scale: 0, x: 100, y: 100 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="relative">
            {/* Globo de diálogo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-2xl border-4 border-fun-yellow relative mb-4"
            >
              {/* Botón cerrar */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Minimizar"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>

              <p className="text-lg font-bold text-dark-base dark:text-white pr-6 leading-relaxed">
                {message}
              </p>

              {/* Punta del globo */}
              <div className="absolute -bottom-3 right-12 w-6 h-6 bg-white dark:bg-gray-800 border-r-4 border-b-4 border-fun-yellow transform rotate-45"></div>
            </motion.div>

            {/* DibuBear mascota */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-6 right-8 text-8xl filter drop-shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              🐻
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
