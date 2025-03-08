import {
  Trophy,
  Star,
  Zap,
  Target,
  TrendingUp,
  BarChart,
  Clock,
  CheckCircle2,
  Lock,
} from "lucide-react";
import Badge from "@/components/badge";

export default function AchievementsPage() {
  // TODO: achievement categories
  const categories = [
    { id: "beginner", name: "Beginner", icon: <Star className="h-5 w-5" /> },
    {
      id: "portfolio",
      name: "Portfolio Master",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      id: "trading",
      name: "Trading Pro",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      id: "challenges",
      name: "Challenges",
      icon: <Target className="h-5 w-5" />,
    },
  ];

  // TODO: achievement data
  const achievements = [
    {
      id: 1,
      category: "beginner",
      title: "First Steps",
      description: "Create your first portfolio",
      icon: <CheckCircle2 className="h-6 w-6" />,
      progress: 100,
      maxProgress: 100,
      completed: true,
      xpReward: 50,
      dateCompleted: "Mar 5, 2025",
    },
    {
      id: 2,
      category: "beginner",
      title: "Stock Collector",
      description: "Add 10 different stocks to your portfolios",
      icon: <TrendingUp className="h-6 w-6" />,
      progress: 7,
      maxProgress: 10,
      completed: false,
      xpReward: 100,
    },
    {
      id: 3,
      category: "beginner",
      title: "Balanced Portfolio",
      description: "Create a portfolio with exactly 100% allocation",
      icon: <Target className="h-6 w-6" />,
      progress: 100,
      maxProgress: 100,
      completed: true,
      xpReward: 75,
      dateCompleted: "Mar 6, 2025",
    },
    {
      id: 4,
      category: "portfolio",
      title: "Diversification Expert",
      description: "Create a portfolio with at least 8 different sectors",
      icon: <BarChart className="h-6 w-6" />,
      progress: 5,
      maxProgress: 8,
      completed: false,
      xpReward: 150,
    },
    {
      id: 5,
      category: "portfolio",
      title: "Risk Manager",
      description: "Create a portfolio with a beta under 1.0",
      icon: <Zap className="h-6 w-6" />,
      progress: 0,
      maxProgress: 1,
      completed: false,
      xpReward: 200,
    },
    {
      id: 6,
      category: "portfolio",
      title: "Long-term Investor",
      description: "Keep a portfolio unchanged for 30 days",
      icon: <Clock className="h-6 w-6" />,
      progress: 12,
      maxProgress: 30,
      completed: false,
      xpReward: 250,
    },
    {
      id: 7,
      category: "trading",
      title: "First Backtest",
      description: "Run your first portfolio backtest",
      icon: <TrendingUp className="h-6 w-6" />,
      progress: 100,
      maxProgress: 100,
      completed: true,
      xpReward: 100,
      dateCompleted: "Mar 6, 2025",
    },
    {
      id: 8,
      category: "trading",
      title: "Market Beater",
      description: "Create a portfolio that beats the S&P 500 in a backtest",
      icon: <Trophy className="h-6 w-6" />,
      progress: 0,
      maxProgress: 1,
      completed: false,
      xpReward: 300,
      locked: true,
    },
    {
      id: 9,
      category: "challenges",
      title: "Weekly Challenge",
      description: "Complete this week's portfolio challenge",
      icon: <Target className="h-6 w-6" />,
      progress: 3,
      maxProgress: 5,
      completed: false,
      xpReward: 200,
    },
    {
      id: 10,
      category: "challenges",
      title: "Streak Master",
      description: "Maintain a 7-day login streak",
      icon: <Zap className="h-6 w-6" />,
      progress: 5,
      maxProgress: 7,
      completed: false,
      xpReward: 150,
    },
  ];

  // calculate overall progress
  const totalAchievements = achievements.length;
  const completedAchievements = achievements.filter((a) => a.completed).length;
  const overallProgress = Math.round(
    (completedAchievements / totalAchievements) * 100,
  );

  // calculate total XP earned
  const earnedXP = achievements
    .filter((a) => a.completed)
    .reduce((sum, a) => sum + a.xpReward, 0);

  // calculate potential XP
  const potentialXP = achievements
    .filter((a) => !a.completed && !a.locked)
    .reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Achievements</h1>
        <div className="flex items-center gap-3">
          <Badge
            label={`${completedAchievements}/${totalAchievements} Completed`}
            color="primary"
            size="lg"
          />
          <Badge
            label={`${earnedXP} XP Earned`}
            color="blue"
            size="lg"
            className="!hidden md:!block"
          />
        </div>
      </div>

      {/* Overall progress */}
      <div className="game-card mb-8 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-game-primary/10 hidden h-12 w-12 items-center justify-center rounded-full md:flex">
              <Trophy className="text-game-primary h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Progress</h2>
              <p className="text-sm text-gray-500">
                Keep going to unlock all achievements!
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-game-primary text-2xl font-bold">
              {overallProgress}%
            </div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>

        <div className="game-progress-bar mb-4">
          <div
            className="game-progress-fill bg-game-primary"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-game-light flex flex-col items-center justify-center rounded-lg p-4">
            <div className="text-game-primary text-3xl font-bold">
              {completedAchievements}
            </div>
            <div className="text-sm text-gray-500">Achievements Completed</div>
          </div>

          <div className="bg-game-light flex flex-col items-center justify-center rounded-lg p-4">
            <div className="text-game-blue text-3xl font-bold">{earnedXP}</div>
            <div className="text-sm text-gray-500">XP Earned</div>
          </div>

          <div className="bg-game-light flex flex-col items-center justify-center rounded-lg p-4">
            <div className="text-game-secondary text-3xl font-bold">
              +{potentialXP}
            </div>
            <div className="text-sm text-gray-500">XP Available</div>
          </div>
        </div>
      </div>

      {/* Achievement categories */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {categories.map((category) => {
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
            <div key={category.id} className="game-card p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-game-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{category.name}</h3>
                  <div className="text-xs text-gray-500">
                    {completedInCategory}/{categoryAchievements.length}{" "}
                    completed
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
        })}
      </div>

      {/* Achievement list */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`game-card p-5 ${achievement.locked ? "opacity-70" : ""}`}
          >
            <div className="mb-4 flex justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  achievement.completed
                    ? "bg-game-primary/10 text-game-primary"
                    : achievement.locked
                      ? "bg-gray-200 text-gray-400"
                      : "bg-game-blue/10 text-game-blue"
                }`}
              >
                {achievement.locked ? (
                  <Lock className="h-6 w-6" />
                ) : (
                  achievement.icon
                )}
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

            <h3 className="mb-1 text-lg font-bold text-gray-800">
              {achievement.title}
            </h3>
            <p className="mb-3 text-sm text-gray-600">
              {achievement.description}
            </p>

            {!achievement.completed && !achievement.locked && (
              <div className="mt-2">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
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
              <div className="mt-2 text-xs text-gray-500">
                Completed on {achievement.dateCompleted}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
