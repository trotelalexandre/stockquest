"use client";

import { achievements } from "@/lib/achievements";
import { Achievement, Achievements, Category } from "@/lib/types";
import React, { createContext, useContext, useMemo } from "react";

interface AchievementsContextProps {
  totalAchievements: number;
  completedAchievements: number;
  overallProgress: number;
  earnedXP: number;
  potentialXP: number;
  level: number;
  getCategoryAchievements: (category: Category) => Achievements;
  getCategoryCompletedAchievements: (category: Category) => number;
  getCategoryProgress: (category: Category) => number;
}

const AchievementsContext = createContext<AchievementsContextProps | undefined>(
  undefined,
);

interface AchievementsProviderProps {
  children: React.ReactNode;
}

export default function AchievementsProvider({
  children,
}: AchievementsProviderProps) {
  const totalAchievements = useMemo(() => achievements.length, []);
  const completedAchievements = useMemo(
    () => achievements.filter((a: Achievement) => a.completed).length,
    [],
  );
  const overallProgress = useMemo(
    () => Math.round((completedAchievements / totalAchievements) * 100),
    [completedAchievements, totalAchievements],
  );

  const earnedXP = useMemo(
    () =>
      achievements
        .filter((a: Achievement) => a.completed)
        .reduce((sum: number, a: Achievement) => sum + a.xpReward, 0),
    [],
  );
  const potentialXP = useMemo(
    () =>
      achievements
        .filter((a: Achievement) => !a.completed && !a.locked)
        .reduce((sum: number, a: Achievement) => sum + a.xpReward, 0),
    [],
  );

  const level = useMemo(() => Math.floor(earnedXP / 100), [earnedXP]);

  const getCategoryAchievements = (category: Category) => {
    const categoryAchievements = achievements.filter(
      (a: Achievement) => a.category === category.id,
    );

    return categoryAchievements;
  };

  const getCategoryCompletedAchievements = (category: Category) => {
    const categoryAchievements = getCategoryAchievements(category);

    const completedInCategory = categoryAchievements.filter(
      (a: Achievement) => a.completed,
    ).length;

    return completedInCategory;
  };

  const getCategoryProgress = (category: Category) => {
    const categoryAchievements = getCategoryAchievements(category);
    const completedInCategory = getCategoryCompletedAchievements(category);

    const categoryProgress = Math.round(
      (completedInCategory / categoryAchievements.length) * 100,
    );

    return categoryProgress;
  };

  const value = {
    totalAchievements,
    completedAchievements,
    overallProgress,
    earnedXP,
    potentialXP,
    level,
    getCategoryAchievements,
    getCategoryCompletedAchievements,
    getCategoryProgress,
  };

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementsContext);

  if (!context) {
    throw new Error(
      "useAchievements must be used within a AchievementsProvider",
    );
  }

  return context;
}
