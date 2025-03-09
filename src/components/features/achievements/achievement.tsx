import { achievements } from "@/lib/achievements";
import { Lock } from "lucide-react";
import Badge from "@/components/ui/game-badge";
import { cn } from "@/lib/utils";

interface AchievementProps {
  achievement: (typeof achievements)[0];
}

export default function Achievement({ achievement }: AchievementProps) {
  return (
    <div
      key={achievement.id}
      className={`game-card p-5 ${achievement.locked ? "opacity-70" : ""}`}
    >
      <div className="mb-4 flex justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            achievement.completed
              ? "bg-game-primary/10 text-game-primary"
              : achievement.locked
                ? "bg-gray-200 text-gray-400"
                : "bg-game-blue/10 text-game-blue",
          )}
        >
          {achievement.locked ? <Lock className="h-6 w-6" /> : achievement.icon}
        </div>

        <div className="flex flex-col items-end">
          <Badge
            label={
              achievement.completed
                ? "Completed"
                : achievement.locked
                  ? "Locked"
                  : "In Progress"
            }
            color={
              achievement.completed
                ? "primary"
                : achievement.locked
                  ? "gray"
                  : "blue"
            }
          />
          <div className="text-game-secondary mt-1 text-sm font-semibold">
            +{achievement.xpReward} XP
          </div>
        </div>
      </div>

      <h3 className="text-foreground mb-1 text-lg font-bold">
        {achievement.title}
      </h3>
      <p className="text-muted-foreground mb-3 text-sm">
        {achievement.description}
      </p>

      {!achievement.completed && !achievement.locked && (
        <div className="mt-2">
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {achievement.progress}/{achievement.maxProgress}
            </span>
          </div>
          <div className="game-progress-bar">
            <div
              className="game-progress-fill bg-game-blue"
              style={{
                width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {achievement.completed && (
        <div className="text-muted-foreground mt-2 text-xs">
          Completed on {achievement.dateCompleted?.toLocaleDateString("en-US")}
        </div>
      )}
    </div>
  );
}
