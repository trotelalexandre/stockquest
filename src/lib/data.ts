import { Home, Bookmark, Award } from "lucide-react";
import type {
  Challenges,
  NavigationItems,
  StockSections,
  StocksMetadata,
} from "./types";

export const navItems: NavigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/saved-portfolios", label: "Saved Portfolios", icon: Bookmark },
  { href: "/achievements", label: "Achievements", icon: Award, disabled: true },
];

export const stockSections: StockSections = [
  {
    title: "Popular",
    category: "popular",
  },
  {
    title: "Gainers and Losers",
    category: "gainers",
    disabled: true,
  },
];

export const challenges: Challenges = [
  {
    id: 1,
    completed: true,
    label: "Add 5 stocks",
  },
  {
    id: 2,
    completed: false,
    label: "Balance to 100%",
  },
  {
    id: 3,
    completed: false,
    label: "Run a backtest",
  },
];

export const popularStocks: StocksMetadata = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    company: "Apple Inc.",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    company: "Microsoft Corporation",
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    company: "Amazon.com Inc.",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    company: "Alphabet Inc.",
  },
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    company: "Tesla Inc.",
  },
  {
    ticker: "META",
    name: "Meta Platforms Inc.",
    company: "Meta Platforms Inc.",
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
