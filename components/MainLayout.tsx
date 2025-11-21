'use client';

import { useState, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SearchModal from './SearchModal';
import MascotGuide from './MascotGuide';
import ScrollIndicator from './ScrollIndicator';
import { useDarkMode } from '@/lib/contexts';

interface MainLayoutProps {
  children: ReactNode;
  showMascot?: boolean;
  showScrollIndicator?: boolean;
}

export default function MainLayout({
  children,
  showMascot = true,
  showScrollIndicator = true
}: MainLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Header
        onSearchClick={() => setSearchOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      {showMascot && <MascotGuide />}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
}
