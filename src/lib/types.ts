export interface Stock {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  company: string;
  logo?: string;
}

export type StockCategory = "new" | "trending" | "gainers" | "losers";

export interface StockSection {
  title: string;
  category: StockCategory;
  stocks: Stock[];
}
