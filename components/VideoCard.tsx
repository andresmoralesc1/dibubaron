'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { YouTubeVideo } from '@/types/video';

interface VideoCardProps {
  video: YouTubeVideo;
  featured?: boolean;
}

export default function VideoCard({ video, featured = false }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sistema de fallback con múltiples calidades de thumbnails
  const thumbnailQualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
  const currentQuality = thumbnailQualities[Math.min(errorCount, thumbnailQualities.length - 1)];
  const thumbnailUrl = video.thumbnail_url.replace(/\/(maxresdefault|sddefault|hqdefault|mqdefault|default)\.jpg/, `/${currentQuality}.jpg`);

  const handleImageError = () => {
    if (errorCount < thumbnailQualities.length - 1) {
      setErrorCount(prev => prev + 1);
    }
  };

  const formattedDate = new Date(video.published_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl transition-all hover:shadow-2xl ${
        featured ? 'col-span-2 row-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
    >
      <a
        href={video.video_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700">
          {/* Loading placeholder */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-6xl mb-2"
                >
                  🎨
                </motion.div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Cargando...</p>
              </div>
            </div>
          )}

          <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onError={handleImageError}
            onLoad={() => setIsLoading(false)}
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            unoptimized={errorCount > 2}
          />

          {/* Overlay de Play */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-full bg-red-600 p-4 shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </motion.div>

          {/* Badge de Categoría */}
          {video.category && video.category !== 'Otros' && (
            <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-fun-purple to-fun-pink px-3 py-1.5 text-xs font-bold text-white shadow-lg">
              {video.category}
            </div>
          )}

          {/* Badge de Destacado */}
          {video.featured && (
            <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-fun-yellow to-fun-orange px-3 py-1.5 text-xs font-bold text-white shadow-lg flex items-center gap-1">
              <span>⭐</span> Destacado
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-5">
          <h3
            className={`font-bold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-fun-purple transition-colors ${
              featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
            }`}
          >
            {video.title}
          </h3>

          {video.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {video.description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formattedDate}
            </span>

            {video.view_count && (
              <span className="flex items-center">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {video.view_count.toLocaleString('es-ES')}
              </span>
            )}
          </div>

          {/* Hover: Call to Action */}
          <motion.div
            className="mt-3 flex items-center text-sm font-bold text-fun-purple dark:text-fun-pink"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          >
            Ver en YouTube
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
}
