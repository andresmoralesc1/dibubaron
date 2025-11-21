'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Dark Mode Context
interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// Función para obtener el modo inicial
function getInitialDarkMode(): boolean {
  if (typeof window === 'undefined') return false;

  // Primero verificar localStorage
  const stored = localStorage.getItem('darkMode');
  if (stored !== null) {
    return stored === 'true';
  }

  // Si no hay preferencia guardada, usar preferencia del sistema
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const initialMode = getInitialDarkMode();
    setDarkMode(initialMode);

    // Aplicar la clase inmediatamente
    if (initialMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Solo cambiar automáticamente si no hay preferencia guardada
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));

    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
}

// Favorites Context
interface FavoritesContextType {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (id: string) => {
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter((fav) => fav !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
