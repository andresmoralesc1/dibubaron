'use client';

import { FaFacebook, FaTwitter, FaWhatsapp, FaPinterest } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
  };

  const shareOnPinterest = () => {
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`, '_blank');
  };

  const buttons = [
    { icon: FaFacebook, onClick: shareOnFacebook, color: 'bg-blue-600 hover:bg-blue-700', label: 'Facebook' },
    { icon: FaTwitter, onClick: shareOnTwitter, color: 'bg-sky-500 hover:bg-sky-600', label: 'Twitter' },
    { icon: FaWhatsapp, onClick: shareOnWhatsApp, color: 'bg-green-500 hover:bg-green-600', label: 'WhatsApp' },
    { icon: FaPinterest, onClick: shareOnPinterest, color: 'bg-red-600 hover:bg-red-700', label: 'Pinterest' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((button) => (
        <motion.button
          key={button.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={button.onClick}
          className={`${button.color} text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
          aria-label={`Compartir en ${button.label}`}
        >
          <button.icon className="w-5 h-5" />
          <span className="hidden sm:inline">{button.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
