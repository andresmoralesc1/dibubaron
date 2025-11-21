'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMessageCircle } from 'react-icons/fi';
import { playHoverSound, playClickSound } from '@/lib/sounds';
import { lightVibration, mediumVibration } from '@/lib/haptics';

const CHATBOT_URL = 'https://n8n.neuralflow.space/webhook/6265d4db-05a1-4789-b629-7b9440976542/chat';

export default function MascotGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    playClickSound();
    mediumVibration();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón flotante del osito */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="bear-button"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            onClick={handleToggle}
            onMouseEnter={() => {
              playHoverSound();
              lightVibration();
            }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 cursor-pointer focus:outline-none group"
            aria-label="Abrir chat de ayuda"
          >
            {/* Pulso de fondo */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-fun-yellow rounded-full"
            />

            {/* Osito con efectos */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative text-8xl filter drop-shadow-2xl"
            >
              🐻
            </motion.div>

            {/* Icono de mensaje flotante */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 bg-gradient-to-br from-fun-pink to-fun-purple text-white rounded-full p-2 shadow-lg border-2 border-white"
            >
              <FiMessageCircle className="w-5 h-5" />
            </motion.div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              ¡Pregúntame algo! 💬
              <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para móvil */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleToggle}
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm md:hidden"
              />
            )}

            {/* Ventana del chatbot */}
            <motion.div
              key="chat-window"
              initial={{
                scale: 0,
                opacity: 0,
                x: isMobile ? 0 : 100,
                y: isMobile ? '100%' : 100
              }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 0,
                y: 0
              }}
              exit={{
                scale: 0,
                opacity: 0,
                x: isMobile ? 0 : 100,
                y: isMobile ? '100%' : 100
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`
                fixed z-50 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden
                ${isMobile
                  ? 'inset-x-4 bottom-4 top-20'
                  : 'bottom-6 right-6 w-[400px] h-[600px]'
                }
              `}
            >
              {/* Header del chat */}
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="bg-gradient-to-r from-fun-yellow via-fun-pink to-fun-purple p-4 flex items-center justify-between border-b-4 border-fun-orange"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl"
                  >
                    🐻
                  </motion.div>
                  <div>
                    <h3 className="text-white font-extrabold text-lg drop-shadow-md">
                      DibuBear
                    </h3>
                    <p className="text-white/90 text-xs font-semibold">
                      Tu asistente de dibujo 🎨
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={handleToggle}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors backdrop-blur-sm"
                  aria-label="Cerrar chat"
                >
                  <FiX className="w-6 h-6" />
                </motion.button>
              </motion.div>

              {/* Iframe del chatbot */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full h-[calc(100%-80px)]"
              >
                <iframe
                  src={CHATBOT_URL}
                  className="w-full h-full border-0"
                  title="DibuBear Chat"
                  allow="microphone"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </motion.div>

              {/* Footer decorativo */}
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fun-yellow via-fun-pink to-fun-purple"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
