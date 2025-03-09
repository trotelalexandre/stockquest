"use client";

import { categories } from "@/lib/data/achievements";
import { useAchievements } from "@/providers/achievements-provider";

interface CategoryProps {
  category: (typeof categories)[0];
}

export default function Category({ category }: CategoryProps) {
  const {
    getCategoryAchievements,
    getCategoryCompletedAchievements,
    getCategoryProgress,
  } = useAchievements();

  const categoryAchievements = getCategoryAchievements(category);
  const completedInCategory = getCategoryCompletedAchievements(category);
  const categoryProgress = getCategoryProgress(category);

  return (
    <div className="game-card p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="bg-game-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
          {category.icon}
        </div>
        <div>
          <h3 className="text-foreground font-bold">{category.name}</h3>
          <div className="text-muted-foreground text-xs">
            {completedInCategory}/{categoryAchievements.length} completed
          </div>
        </div>
      </div>

      <div className="game-progress-bar">
        <div
          className="game-progress-fill bg-game-primary"
          style={{ width: `${categoryProgress}%` }}
        />
      </div>
    </div>
  );
}
