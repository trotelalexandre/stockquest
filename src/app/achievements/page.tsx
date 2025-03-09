import { achievements, categories } from "@/lib/achievements";
import ProgressCard from "@/components/features/achievements/progress-card";
import Category from "@/components/features/achievements/category";
import Achievement from "@/components/features/achievements/achievement";
import {
  Achievement as AchievementType,
  Category as CategoryType,
} from "@/lib/types";

export default function AchievementsPage() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-foreground text-2xl font-bold">Achievements</h1>
        <ProgressCard />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {categories.map((category: CategoryType) => {
          return <Category key={category.id} category={category} />;
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement: AchievementType) => (
          <Achievement key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </>
  );
}
