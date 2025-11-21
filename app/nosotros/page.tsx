'use client';

import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';
import { FiHeart, FiUsers, FiTarget } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <MainLayout>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Sobre DibuBaron
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-50 max-w-3xl mx-auto"
            >
              Tu plataforma favorita para aprender a dibujar
            </motion.p>
          </div>
        </section>

        {/* About Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose dark:prose-invert max-w-none"
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Nuestra Historia
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                DibuBaron nació con la misión de hacer el arte accesible para todos. Creemos que
                cualquier persona puede aprender a dibujar con las instrucciones adecuadas y práctica
                constante.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
                Ofrecemos cientos de tutoriales gratuitos organizados por categorías, desde animales
                hasta personajes de videojuegos, todos diseñados para que puedas aprender paso a paso.
              </p>
            </motion.div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Pasión por el Arte
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Amamos el arte y queremos compartir esa pasión contigo
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Comunidad
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Una comunidad de artistas que se apoyan mutuamente
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTarget className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Aprendizaje
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tutoriales diseñados para facilitar tu progreso
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                ¿Listo para empezar?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                Explora nuestras categorías y comienza tu viaje artístico hoy
              </p>
              <a
                href="/"
                className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors text-lg"
              >
                Ver Tutoriales
              </a>
            </motion.div>
          </div>
        </section>
    </MainLayout>
  );
}
