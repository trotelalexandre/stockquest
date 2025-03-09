import { achievements, categories } from "@/lib/data/achievements";

interface CategoryProps {
  category: (typeof categories)[0];
  achievements: typeof achievements;
}

export default function Category({ category, achievements }: CategoryProps) {
  const categoryAchievements = achievements.filter(
    (a) => a.category === category.id,
  );
  const completedInCategory = categoryAchievements.filter(
    (a) => a.completed,
  ).length;
  const categoryProgress = Math.round(
    (completedInCategory / categoryAchievements.length) * 100,
  );

  return (
    <div className="game-card p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="bg-game-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
          {category.icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{category.name}</h3>
          <div className="text-xs text-gray-500">
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
