'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fun-purple via-fun-pink to-fun-orange p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center"
      >
        {/* Emoji perdido */}
        <motion.div
          animate={{
            rotate: [0, 15, -15, 15, 0],
            scale: [1, 1.05, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="text-9xl mb-6"
        >
          🔍
        </motion.div>

        {/* Código 404 */}
        <div className="mb-4">
          <span className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fun-pink via-fun-purple to-fun-blue">
            404
          </span>
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-black text-primary dark:text-primary-accent mb-4">
          ¡Página No Encontrada! 🎨
        </h1>

        {/* Mensaje */}
        <p className="text-xl md:text-2xl text-dark-light dark:text-gray-300 mb-8 font-semibold">
          ¡Ups! Parece que esta página se perdió
          <br />
          como un lápiz de color debajo del sofá...
        </p>

        {/* Sugerencias */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 mb-8">
          <p className="text-lg font-bold text-dark-base dark:text-gray-200 mb-3">
            ¿Qué tal si intentas?
          </p>
          <ul className="text-left space-y-2 text-dark-light dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-2xl flex-shrink-0">🏠</span>
              <span>Volver al inicio y explorar todas las categorías</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl flex-shrink-0">🛒</span>
              <span>Visitar nuestra tienda de cursos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl flex-shrink-0">🔍</span>
              <span>Buscar el dibujo que estabas buscando</span>
            </li>
          </ul>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-fun-yellow to-fun-orange text-dark-base font-extrabold text-xl px-8 py-4 rounded-full shadow-kid hover:shadow-kid-hover hover:translate-y-1 transition-all"
            >
              🏠 Ir al Inicio
            </motion.button>
          </Link>

          <Link href="/tienda">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-fun-pink to-fun-purple text-white font-extrabold text-xl px-8 py-4 rounded-full shadow-kid hover:shadow-kid-hover hover:translate-y-1 transition-all"
            >
              🛒 Ver Cursos
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
          &ldquo;¡Cada búsqueda es una nueva aventura!&rdquo; ⭐
        </motion.p>

        {/* Decoraciones flotantes */}
        <div className="mt-8 flex justify-center gap-6 text-4xl">
          <motion.span
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          >
            🎨
          </motion.span>
          <motion.span
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            🖍️
          </motion.span>
          <motion.span
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            ✏️
          </motion.span>
          <motion.span
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            🖌️
          </motion.span>
        </div>

        {/* Código de error técnico */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500 font-mono">
          Error Code: PAGE_NOT_FOUND_404
        </p>
      </motion.div>
    </div>
  );
}
