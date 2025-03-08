"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
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
  applyEqualAllocation: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [portfolio, setPortfolio] = useState<(Stock & { weight: number })[]>(
    [],
  );
  const [isSaved, setIsSaved] = useState(false);

  const addToPortfolio = useCallback(
    (stock: Stock) => {
      if (portfolio.some((item) => item.ticker === stock.ticker)) {
        return;
      }

      setPortfolio([...portfolio, { ...stock, weight: 0 }]);

      if (isSaved) {
        setIsSaved(false);
      }
    },
    [portfolio, isSaved],
  );

  const removeFromPortfolio = useCallback(
    (ticker: string) => {
      setPortfolio(portfolio.filter((stock) => stock.ticker !== ticker));

      if (isSaved) {
        setIsSaved(false);
      }
    },
    [portfolio, isSaved],
  );

  const applyEqualAllocation = useCallback(() => {
    const equalWeight = 100 / portfolio.length;
    setPortfolio((prev) =>
      prev.map((stock) => ({ ...stock, weight: equalWeight })),
    );
  }, [portfolio]);

  const updateWeight = useCallback(
    (ticker: string, weight: number) => {
      setPortfolio((prev) =>
        prev.map((stock) =>
          stock.ticker === ticker ? { ...stock, weight } : stock,
        ),
      );

      if (isSaved) {
        setIsSaved(false);
      }
    },
    [isSaved],
  );

  const savePortfolio = useCallback(() => {
    // TODO: Save the portfolio to the user's account
    setIsSaved(true);
  }, []);

  const unsavePortfolio = useCallback(() => {
    // TODO: Unsave the portfolio to the user's account
    setIsSaved(false);
  }, []);

  const runBacktest = useCallback(() => {
    // TODO: Run a backtest on the portfolio
  }, []);

  const value = {
    portfolio,
    isSaved,
    addToPortfolio,
    removeFromPortfolio,
    updateWeight,
    savePortfolio,
    unsavePortfolio,
    runBacktest,
    applyEqualAllocation,
  };

  return (
    <PortfolioContext.Provider value={value}>
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
