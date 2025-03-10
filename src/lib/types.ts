import { JSX } from "react";

export interface Stock {
  name: string;
  ticker: string;
  price: number;
  change_percentage?: number;
  company?: string;
  logo?: string;
}

export type Stocks = Stock[];

export type StockCategory = "gainers" | "new" | "trending";

export interface StockSection {
  title: string;
  category: StockCategory;
}

export type StockSections = StockSection[];

export type WeightedStock = Stock & { weight: number };

export type WeightedStocks = WeightedStock[];

export type Portfolio = WeightedStocks;

export type Weights = Record<string, number>;

export interface PortfolioMetadata {
  id: number;
  name: string;
  lastUpdated: Date;
  stocks: number;
}

export interface Category {
  id: string;
  name: string;
  icon: JSX.Element;
}

export type Categories = Category[];

export interface Achievement {
  id: number;
  category: string;
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
  maxProgress: number;
  completed: boolean;
  xpReward: number;
  dateCompleted?: Date;
  locked?: boolean;
}

export type Achievements = Achievement[];
