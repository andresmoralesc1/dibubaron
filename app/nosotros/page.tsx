'use client';

import MainLayout from '@/components/MainLayout';
import HeroSection from '@/components/ui/HeroSection';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <MainLayout>
      <HeroSection
        title="Sobre DibuBaron"
        subtitle="Tu plataforma favorita para aprender a dibujar"
        emoji="✨"
        gradient="primary"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Nosotros' }
        ]}
      />

      {/* About Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg"
            >
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
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
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg"
            >
              <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
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
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg"
            >
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
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
      <section className="bg-gradient-to-r from-fun-yellow/10 via-fun-pink/10 to-fun-purple/10 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-4 inline-block">🚀</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Explora nuestras categorías y comienza tu viaje artístico hoy
            </p>
            <Button variant="primary" size="lg" href="/">
              Ver Tutoriales
            </Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
