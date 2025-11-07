'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getUserProgress,
  visitCategory,
  viewProduct,
  Achievement,
  ACHIEVEMENTS
} from './gamification';

export function useAchievements() {
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [previousAchievements, setPreviousAchievements] = useState<string[]>([]);

  useEffect(() => {
    const progress = getUserProgress();
    setPreviousAchievements(progress.achievements);
  }, []);

  const checkForNewAchievements = useCallback((currentAchievements: string[]) => {
    const newUnlocked = currentAchievements.filter(
      (id) => !previousAchievements.includes(id)
    );

    if (newUnlocked.length > 0) {
      const achievementData = ACHIEVEMENTS.find((a) => a.id === newUnlocked[0]);
      if (achievementData) {
        setNewAchievement({ ...achievementData, unlocked: true });
        setPreviousAchievements(currentAchievements);
      }
    }
  }, [previousAchievements]);

  const trackCategoryVisit = useCallback(() => {
    const progress = visitCategory();
    checkForNewAchievements(progress.achievements);
  }, [checkForNewAchievements]);

  const trackProductView = useCallback(() => {
    const progress = viewProduct();
    checkForNewAchievements(progress.achievements);
  }, [checkForNewAchievements]);

  const clearAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  return {
    newAchievement,
    trackCategoryVisit,
    trackProductView,
    clearAchievement,
  };
}
