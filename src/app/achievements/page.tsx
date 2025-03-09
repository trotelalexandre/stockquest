import { achievements, categories } from "@/lib/data/achievements";
import ProgressCard from "@/components/features/achievements/progress-card";
import Category from "@/components/features/achievements/category";
import Achievement from "@/components/features/achievements/achievement";

export default function AchievementsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Achievements</h1>
      </div>

      <ProgressCard />

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {categories.map((category) => {
          return (
            <Category
              key={category.id}
              category={category}
              achievements={achievements}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <Achievement key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </main>
  );
}
