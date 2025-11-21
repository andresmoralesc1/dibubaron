'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import { playClickSound, playWhooshSound } from '@/lib/sounds';

interface HeaderProps {
  onSearchClick?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function Header({ onSearchClick, darkMode, onToggleDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    playWhooshSound();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchClick = () => {
    playClickSound();
    if (onSearchClick) onSearchClick();
  };

  const handleDarkModeToggle = () => {
    playClickSound();
    if (onToggleDarkMode) onToggleDarkMode();
  };

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/tutoriales', label: 'Videos' },
    { href: '/categorias', label: 'Categorías' },
    { href: '/tienda', label: 'Tienda' },
    { href: '/nosotros', label: 'Nosotros' },
  ];

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-colors border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative w-12 h-12 flex-shrink-0"
            >
              <Image
                src="/logo.jpg"
                alt="DibuBaron Logo"
                fill
                sizes="48px"
                className="object-contain rounded-full"
                priority
              />
            </motion.div>
            <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              DibuBaron
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Buscar"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={handleDarkModeToggle}
              className="hidden md:block p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuClick}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-2 flex flex-col">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium text-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Dark Mode Toggle for Mobile */}
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={() => {
                  if (onToggleDarkMode) onToggleDarkMode();
                  setMobileMenuOpen(false);
                }}
                className="py-3 px-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium text-lg transition-colors flex items-center gap-2"
              >
                {darkMode ? <><FiSun className="w-5 h-5" /> Modo Claro</> : <><FiMoon className="w-5 h-5" /> Modo Oscuro</>}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
