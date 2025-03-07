import { Flame } from "lucide-react";

interface StreakCounterProps {
  days: number;
  className?: string;
}

export default function StreakCounter({
  days,
  className = "",
}: StreakCounterProps) {
  return (
    <div
      className={`flex items-center gap-1.5 ${className} game-card px-3 py-1`}
    >
      <div className="from-game-accent rounded-full bg-gradient-to-b to-[#D32F2F] p-1">
        <Flame className="h-3 w-3 text-white" />
      </div>
      <span className="text-xs font-semibold text-gray-700">
        {days} day streak
      </span>
    </div>
  );
}
