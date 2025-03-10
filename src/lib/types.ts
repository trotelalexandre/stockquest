import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, JSX, RefAttributes } from "react";

export type Stock = StockMetadata & {
  price: number;
  change_percentage: number;
};

export type Stocks = Stock[];

export interface StockMetadata {
  ticker: string;
  name: string;
  logo?: string;
  company: string;
}

export type StocksMetadata = StockMetadata[];

export type StockCategory = "gainers" | "trending" | "popular";

export interface StockSection {
  title: string;
  category: StockCategory;
  disabled?: boolean;
}

export type StockSections = StockSection[];

export type WeightedStock = Stock & { weight: number };

export type WeightedStocks = WeightedStock[];

export type Portfolio = WeightedStocks;

export type Weights = Record<string, number>;

export interface PortfolioMetadata {
  id: string;
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

export interface NavigationItem {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  disabled?: boolean;
}

export type NavigationItems = NavigationItem[];

export interface Challenge {
  id: number;
  completed: boolean;
  label: string;
}

export type Challenges = Challenge[];
