'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error para debugging
    console.error('Error en DibuBaron:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fun-yellow via-fun-orange to-fun-pink p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center"
      >
        {/* Emoji triste */}
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="text-9xl mb-6"
        >
          😢
        </motion.div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-black text-primary dark:text-primary-accent mb-4">
          ¡Oops! Algo salió mal 🎨
        </h1>

        {/* Mensaje */}
        <p className="text-xl md:text-2xl text-dark-light dark:text-gray-300 mb-8 font-semibold">
          No te preocupes, a veces los lápices se rompen...
          <br />
          ¡Pero siempre podemos arreglarlo!
        </p>

        {/* Mensaje técnico (opcional para debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 text-left">
            <p className="text-sm font-mono text-red-800 dark:text-red-300 break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => reset()}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-fun-pink to-fun-purple text-white font-extrabold text-xl px-8 py-4 rounded-full shadow-kid hover:shadow-kid-hover hover:translate-y-1 transition-all"
          >
            🔄 Intentar de Nuevo
          </motion.button>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-fun-yellow to-fun-orange text-dark-base font-extrabold text-xl px-8 py-4 rounded-full shadow-kid hover:shadow-kid-hover hover:translate-y-1 transition-all"
            >
              🏠 Volver al Inicio
            </motion.button>
          </Link>
        </div>

        {/* Mensaje motivacional */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-lg text-gray-600 dark:text-gray-400 italic"
        >
          &ldquo;Los errores son oportunidades para aprender&rdquo; ✨
        </motion.p>

        {/* Decoraciones */}
        <div className="mt-8 flex justify-center gap-4 text-4xl">
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            🎨
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            🖍️
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            ✏️
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
