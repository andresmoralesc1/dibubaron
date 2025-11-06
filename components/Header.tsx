'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiHeart, FiSun, FiMoon } from 'react-icons/fi';

interface HeaderProps {
  onSearchClick?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function Header({ onSearchClick, darkMode, onToggleDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/categorias', label: 'Categorías' },
    { href: '/tienda', label: 'Tienda 🛒' },
    { href: '/nosotros', label: 'Nosotros' },
  ];

  return (
    <header className="bg-gradient-to-r from-fun-yellow/20 via-fun-pink/20 to-fun-purple/20 dark:bg-gray-900 shadow-xl sticky top-0 z-50 transition-colors border-b-4 border-primary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative w-14 h-14 flex-shrink-0"
            >
              <Image
                src="/logo.svg"
                alt="DibuBaron Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </motion.div>
            <motion.h1
              className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary via-fun-pink to-fun-purple bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              DibuBaron 🎨
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-2xl font-bold text-primary hover:bg-fun-yellow hover:scale-105 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                {item.icon && <item.icon className="text-lg" />}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSearchClick}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors"
              aria-label="Buscar"
            >
              <FiSearch className="w-5 h-5" />
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleDarkMode}
              className="hidden md:block p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-primary"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </motion.button>
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors py-2 flex items-center gap-2 text-lg"
                  >
                    {item.icon && <item.icon />}
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Dark Mode Toggle for Mobile */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={onToggleDarkMode}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors py-2 flex items-center gap-2 text-lg"
              >
                {darkMode ? <><FiSun /> Modo Claro</> : <><FiMoon /> Modo Oscuro</>}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
