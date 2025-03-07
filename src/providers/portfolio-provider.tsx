"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Stock } from "@/lib/types";

interface PortfolioContextType {
  portfolio: (Stock & { weight: number })[];
  isSaved: boolean;
  addToPortfolio: (stock: Stock) => void;
  removeFromPortfolio: (ticker: string) => void;
  updateWeight: (ticker: string, weight: number) => void;
  savePortfolio: () => void;
  unsavePortfolio: () => void;
  runBacktest: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolio, setPortfolio] = useState<(Stock & { weight: number })[]>(
    [],
  );
  const [isSaved, setIsSaved] = useState(false);

  const addToPortfolio = (stock: Stock) => {
    if (portfolio.some((item) => item.ticker === stock.ticker)) {
      return;
    }

    setPortfolio([...portfolio, { ...stock, weight: 0 }]);

    if (isSaved) {
      setIsSaved(false);
    }
  };

  const removeFromPortfolio = (ticker: string) => {
    setPortfolio(portfolio.filter((stock) => stock.ticker !== ticker));

    if (isSaved) {
      setIsSaved(false);
    }
  };

  const updateWeight = (ticker: string, weight: number) => {
    setPortfolio(
      portfolio.map((stock) =>
        stock.ticker === ticker ? { ...stock, weight } : stock,
      ),
    );

    if (isSaved) {
      setIsSaved(false);
    }
  };

  const savePortfolio = () => {
    // TODO: Save the portfolio to the user's account
    setIsSaved(true);
  };

  const unsavePortfolio = () => {
    // TODO: Unsave the portfolio to the user's account
    setIsSaved(false);
  };

  const runBacktest = () => {
    // TODO: Run a backtest on the portfolio
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        isSaved,
        addToPortfolio,
        removeFromPortfolio,
        updateWeight,
        savePortfolio,
        unsavePortfolio,
        runBacktest,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
