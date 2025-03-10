import {
  Star,
  BarChart,
  TrendingUp,
  Target,
  CheckCircle2,
  Clock,
  Trophy,
  Zap,
} from "lucide-react";
import { Achievements, Categories } from "@/lib/types";

export const categories: Categories = [
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

export const achievements: Achievements = [
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
    dateCompleted: new Date("Mar 5, 2025"),
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
    dateCompleted: new Date("Mar 6, 2025"),
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
    dateCompleted: new Date("Mar 6, 2025"),
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
