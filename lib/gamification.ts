/**
 * Sistema de gamificación para DibuBaron
 * Gestiona progreso, logros y motivación para niños
 */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  requirement: number;
  unlocked: boolean;
}

export interface UserProgress {
  categoriesVisited: number;
  productsViewed: number;
  daysActive: number;
  achievements: string[];
  currentStreak: number;
  lastVisit: string;
}

// Logros disponibles
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_visit',
    title: '¡Primera Aventura!',
    description: 'Has visitado DibuBaron por primera vez',
    emoji: '🎉',
    requirement: 1,
    unlocked: false,
  },
  {
    id: 'explorer',
    title: 'Explorador Curioso',
    description: 'Visita 5 categorías diferentes',
    emoji: '🗺️',
    requirement: 5,
    unlocked: false,
  },
  {
    id: 'artist',
    title: 'Artista en Formación',
    description: 'Mira 10 tutoriales de dibujo',
    emoji: '🎨',
    requirement: 10,
    unlocked: false,
  },
  {
    id: 'super_artist',
    title: 'Súper Artista',
    description: 'Mira 25 tutoriales',
    emoji: '⭐',
    requirement: 25,
    unlocked: false,
  },
  {
    id: 'master',
    title: 'Maestro del Dibujo',
    description: 'Mira 50 tutoriales',
    emoji: '👑',
    requirement: 50,
    unlocked: false,
  },
  {
    id: 'streak_3',
    title: 'Constancia Nivel 1',
    description: 'Visita 3 días seguidos',
    emoji: '🔥',
    requirement: 3,
    unlocked: false,
  },
  {
    id: 'streak_7',
    title: 'Artista Dedicado',
    description: 'Visita 7 días seguidos',
    emoji: '💪',
    requirement: 7,
    unlocked: false,
  },
  {
    id: 'shopper',
    title: 'Comprador VIP',
    description: 'Visita la tienda de cursos',
    emoji: '🛒',
    requirement: 1,
    unlocked: false,
  },
];

// Mensajes motivacionales de DibuBear
export const MOTIVATIONAL_MESSAGES = [
  '¡Hola! ¿Listo para dibujar algo increíble? 🎨',
  '¡Wow! ¡Cada día dibujas mejor! ⭐',
  '¿Sabías que practicar te hace súper artista? 💪',
  '¡Me encanta tu curiosidad! Sigue explorando 🗺️',
  '¡Eres genial! ¿Qué vamos a dibujar hoy? 😊',
  '¡Recuerda! Todo artista empezó como tú 🌟',
  '¡Sigue así! ¡Lo estás haciendo increíble! 🎉',
  '¿Quieres un secreto? ¡Dibujar es súper divertido! 🎨',
];

// Obtener progreso del usuario desde localStorage
export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress();
  }

  try {
    const stored = localStorage.getItem('dibubaron_progress');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.log('Error loading progress');
  }

  return getDefaultProgress();
}

// Guardar progreso
export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('dibubaron_progress', JSON.stringify(progress));
  } catch (error) {
    console.log('Error saving progress');
  }
}

// Progreso inicial
function getDefaultProgress(): UserProgress {
  return {
    categoriesVisited: 0,
    productsViewed: 0,
    daysActive: 1,
    achievements: [],
    currentStreak: 1,
    lastVisit: new Date().toISOString().split('T')[0],
  };
}

// Incrementar categorías visitadas
export function visitCategory(): UserProgress {
  const progress = getUserProgress();
  progress.categoriesVisited++;
  checkAchievements(progress);
  saveUserProgress(progress);
  return progress;
}

// Incrementar productos vistos
export function viewProduct(): UserProgress {
  const progress = getUserProgress();
  progress.productsViewed++;
  checkAchievements(progress);
  saveUserProgress(progress);
  return progress;
}

// Actualizar racha de días
export function updateStreak(): UserProgress {
  const progress = getUserProgress();
  const today = new Date().toISOString().split('T')[0];
  const lastVisit = new Date(progress.lastVisit);
  const todayDate = new Date(today);

  const diffDays = Math.floor((todayDate.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Día consecutivo
    progress.currentStreak++;
    progress.daysActive++;
  } else if (diffDays > 1) {
    // Racha rota
    progress.currentStreak = 1;
    progress.daysActive++;
  }
  // Si diffDays === 0, es el mismo día, no hacer nada

  progress.lastVisit = today;
  checkAchievements(progress);
  saveUserProgress(progress);
  return progress;
}

// Verificar y desbloquear logros
function checkAchievements(progress: UserProgress): string[] {
  const newUnlocked: string[] = [];

  ACHIEVEMENTS.forEach((achievement) => {
    if (!progress.achievements.includes(achievement.id)) {
      let shouldUnlock = false;

      switch (achievement.id) {
        case 'first_visit':
          shouldUnlock = true;
          break;
        case 'explorer':
          shouldUnlock = progress.categoriesVisited >= 5;
          break;
        case 'artist':
          shouldUnlock = progress.categoriesVisited >= 10;
          break;
        case 'super_artist':
          shouldUnlock = progress.categoriesVisited >= 25;
          break;
        case 'master':
          shouldUnlock = progress.categoriesVisited >= 50;
          break;
        case 'streak_3':
          shouldUnlock = progress.currentStreak >= 3;
          break;
        case 'streak_7':
          shouldUnlock = progress.currentStreak >= 7;
          break;
        case 'shopper':
          shouldUnlock = progress.productsViewed >= 1;
          break;
      }

      if (shouldUnlock) {
        progress.achievements.push(achievement.id);
        newUnlocked.push(achievement.id);
      }
    }
  });

  return newUnlocked;
}

// Obtener logros desbloqueados
export function getUnlockedAchievements(): Achievement[] {
  const progress = getUserProgress();
  return ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    unlocked: progress.achievements.includes(achievement.id),
  }));
}

// Obtener mensaje aleatorio
export function getRandomMessage(): string {
  return MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
}

// Obtener mensaje según contexto
export function getContextualMessage(progress: UserProgress): string {
  if (progress.categoriesVisited === 0) {
    return '¡Hola! Soy DibuBear 🐻 ¡Bienvenido a DibuBaron! ¿Empezamos a dibujar?';
  }

  if (progress.categoriesVisited < 5) {
    return '¡Genial! Sigue explorando. ¡Hay tantas cosas increíbles para dibujar! 🎨';
  }

  if (progress.categoriesVisited < 10) {
    return '¡Wow! Ya visitaste varias categorías. ¡Estás aprendiendo un montón! ⭐';
  }

  if (progress.currentStreak > 1) {
    return `¡Increíble! Llevas ${progress.currentStreak} días seguidos dibujando. ¡Sigue así! 🔥`;
  }

  return getRandomMessage();
}
