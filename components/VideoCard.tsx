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
  const [imageError, setImageError] = useState(false);

  // Fallback thumbnails si maxresdefault no está disponible
  const thumbnailUrl = imageError
    ? video.thumbnail_url.replace('maxresdefault', 'hqdefault')
    : video.thumbnail_url;

  const formattedDate = new Date(video.published_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl ${
        featured ? 'col-span-2 row-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <a
        href={video.video_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
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
            <div className="absolute left-3 top-3 rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
              {video.category}
            </div>
          )}

          {/* Badge de Destacado */}
          {video.featured && (
            <div className="absolute right-3 top-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
              ⭐ Destacado
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3
            className={`font-bold text-gray-900 line-clamp-2 ${
              featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
            }`}
          >
            {video.title}
          </h3>

          {video.description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {video.description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
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
            className="mt-3 flex items-center text-sm font-semibold text-purple-600"
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
