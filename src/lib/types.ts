export interface Stock {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  company: string;
  logo?: string;
}

export type Stocks = Stock[];

export type StockCategory = "new" | "trending" | "gainers" | "losers";

export interface StockSection {
  title: string;
  category: StockCategory;
  stocks: Stocks;
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
