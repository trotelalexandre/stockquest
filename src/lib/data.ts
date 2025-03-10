import { Home, Bookmark, Award } from "lucide-react";
import type { StockSections } from "./types";

export const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/saved-portfolios", label: "Saved Portfolios", icon: Bookmark },
  { href: "/achievements", label: "Achievements", icon: Award },
];

export const stockSections: StockSections = [
  {
    title: "Gainers and Losers",
    category: "gainers",
  },
];

export const mockChallenges = [
  {
    completed: true,
    label: "Add 5 stocks",
  },
  {
    completed: false,
    label: "Balance to 100%",
  },
  {
    completed: false,
    label: "Run a backtest",
  },
];

export const mockSavedPortfolios = [
  {
    id: 1,
    name: "Growth Portfolio",
    stocks: 8,
    lastUpdated: new Date("2023-03-06"),
  },
  {
    id: 2,
    name: "Dividend Portfolio",
    stocks: 5,
    lastUpdated: new Date("2023-03-01"),
  },
  {
    id: 3,
    name: "Tech Stocks",
    stocks: 6,
    lastUpdated: new Date("2023-02-28"),
  },
];

export const mockPortfolioData = [
  { date: new Date("2023-01"), portfolio: 10000, benchmark: 10000 },
  { date: new Date("2023-02"), portfolio: 10250, benchmark: 10150 },
  { date: new Date("2023-03"), portfolio: 10400, benchmark: 10300 },
  { date: new Date("2023-04"), portfolio: 10800, benchmark: 10450 },
  { date: new Date("2023-05"), portfolio: 10600, benchmark: 10400 },
  { date: new Date("2023-06"), portfolio: 10900, benchmark: 10500 },
  { date: new Date("2023-07"), portfolio: 11200, benchmark: 10650 },
  { date: new Date("2023-08"), portfolio: 11500, benchmark: 10800 },
  { date: new Date("2023-09"), portfolio: 11300, benchmark: 10750 },
  { date: new Date("2023-10"), portfolio: 11600, benchmark: 10900 },
  { date: new Date("2023-11"), portfolio: 11900, benchmark: 11050 },
  { date: new Date("2023-12"), portfolio: 12200, benchmark: 11200 },
];
