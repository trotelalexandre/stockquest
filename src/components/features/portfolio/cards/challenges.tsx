import { challenges } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useMemo } from "react";

export default function Challenges() {
  const totalCompleted = useMemo(
    () => challenges?.filter((challenge) => challenge.completed)?.length ?? 0,
    [],
  );

  return (
    <div className="game-card flex flex-col p-4 md:flex-1">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-foreground font-semibold">Challenges</h3>
        <span className="text-game-purple font-semibold">
          {totalCompleted}/{challenges?.length}
        </span>
      </div>

      <div className="mt-2 space-y-2">
        {challenges?.map((challenge) => {
          return (
            <ChallengeItem
              key={challenge.label}
              completed={challenge.completed}
              label={challenge.label}
            />
          );
        })}
      </div>
    </div>
  );
}

interface ChallengeItemProps {
  completed: boolean;
  label: string;
}

function ChallengeItem({ completed, label }: ChallengeItemProps) {
  return (
    <div className="text-muted-foreground flex items-center gap-2 text-xs">
      {completed ? (
        <div className="from-game-primary flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-b to-[#388E3C]">
          <Check className="h-3 w-3 text-white" />
        </div>
      ) : (
        <div className="h-4 w-4 rounded-full border"></div>
      )}

      <span
        className={cn(completed ? "text-foreground" : "text-muted-foreground")}
      >
        {label}
      </span>
    </div>
  );
}
