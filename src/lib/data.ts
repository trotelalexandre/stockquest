import { Home, Bookmark, Award } from "lucide-react";
import type { Stocks, StockSections } from "./types";

export const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/saved-portfolios", label: "Portfolios", icon: Bookmark },
  { href: "/achievements", label: "Achievements", icon: Award },
];

export const mockStocks: Stocks = [
  {
    id: "1",
    name: "Apple Inc.",
    ticker: "AAPL",
    price: 182.63,
    change: 1.25,
    company: "Apple Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Microsoft",
    ticker: "MSFT",
    price: 337.22,
    change: 0.87,
    company: "Microsoft Corporation",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Amazon",
    ticker: "AMZN",
    price: 129.12,
    change: -0.54,
    company: "Amazon.com, Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Tesla",
    ticker: "TSLA",
    price: 243.84,
    change: 2.35,
    company: "Tesla, Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Google",
    ticker: "GOOGL",
    price: 125.3,
    change: 0.23,
    company: "Alphabet Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Meta",
    ticker: "META",
    price: 301.41,
    change: 1.78,
    company: "Meta Platforms, Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Netflix",
    ticker: "NFLX",
    price: 398.75,
    change: -1.2,
    company: "Netflix, Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Nvidia",
    ticker: "NVDA",
    price: 437.53,
    change: 3.45,
    company: "NVIDIA Corporation",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Airbnb",
    ticker: "ABNB",
    price: 128.92,
    change: -2.1,
    company: "Airbnb, Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    name: "Uber",
    ticker: "UBER",
    price: 45.63,
    change: 0.78,
    company: "Uber Technologies, Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "11",
    name: "Robinhood",
    ticker: "HOOD",
    price: 9.87,
    change: -0.34,
    company: "Robinhood Markets, Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "12",
    name: "Coinbase",
    ticker: "COIN",
    price: 78.45,
    change: 5.67,
    company: "Coinbase Global, Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "13",
    name: "Palantir",
    ticker: "PLTR",
    price: 16.23,
    change: 1.12,
    company: "Palantir Technologies Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "14",
    name: "Snowflake",
    ticker: "SNOW",
    price: 157.89,
    change: -3.21,
    company: "Snowflake Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "15",
    name: "Zoom",
    ticker: "ZM",
    price: 68.34,
    change: -0.87,
    company: "Zoom Video Communications, Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "16",
    name: "Shopify",
    ticker: "SHOP",
    price: 62.45,
    change: 2.34,
    company: "Shopify Inc.",
    logo: "/placeholder.svg?height=40&width=40",
  },
];

export const stockSections: StockSections = [
  {
    title: "New Stocks",
    category: "new",
    stocks: [mockStocks[10], mockStocks[11], mockStocks[12], mockStocks[13]],
  },
  {
    title: "Trending Stocks",
    category: "trending",
    stocks: [mockStocks[0], mockStocks[3], mockStocks[7], mockStocks[5]],
  },
  {
    title: "Top Gainers",
    category: "gainers",
    stocks: [mockStocks[7], mockStocks[11], mockStocks[15], mockStocks[3]],
  },
  {
    title: "Top Losers",
    category: "losers",
    stocks: [mockStocks[8], mockStocks[13], mockStocks[6], mockStocks[14]],
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
