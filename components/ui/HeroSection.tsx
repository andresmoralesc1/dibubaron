'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Breadcrumbs from '../Breadcrumbs';

type GradientVariant = 'fun' | 'purple' | 'primary' | 'warm' | 'neutral';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  gradient?: GradientVariant;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const gradients: Record<GradientVariant, string> = {
  fun: 'bg-gradient-to-br from-fun-yellow via-fun-orange via-fun-pink to-fun-purple',
  purple: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600',
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
  warm: 'bg-gradient-to-r from-fun-orange via-fun-pink to-fun-purple',
  neutral: 'bg-gradient-to-b from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900',
};

const textColors: Record<GradientVariant, string> = {
  fun: 'text-white',
  purple: 'text-white',
  primary: 'text-white',
  warm: 'text-white',
  neutral: 'text-gray-800 dark:text-gray-100',
};

const subtitleColors: Record<GradientVariant, string> = {
  fun: 'text-white/90',
  purple: 'text-white/90',
  primary: 'text-primary-50',
  warm: 'text-white/90',
  neutral: 'text-gray-600 dark:text-gray-400',
};

const sizes = {
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-16 md:py-20',
};

export default function HeroSection({
  title,
  subtitle,
  emoji,
  gradient = 'fun',
  breadcrumbs,
  children,
  size = 'md',
}: HeroSectionProps) {
  const gradientClass = gradients[gradient];
  const textClass = textColors[gradient];
  const subtitleClass = subtitleColors[gradient];
  const sizeClass = sizes[size];

  return (
    <section className={`${gradientClass} ${sizeClass}`}>
      <div className="container mx-auto px-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center ${breadcrumbs ? 'mt-6' : ''}`}
        >
          {emoji && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="mb-6"
            >
              <motion.span
                className="text-6xl md:text-7xl inline-block"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {emoji}
              </motion.span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg ${textClass}`}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl font-bold max-w-3xl mx-auto drop-shadow-md ${subtitleClass}`}
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
