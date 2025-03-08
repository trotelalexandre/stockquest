"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Portfolio, Stock } from "@/lib/types";

interface PortfolioContextType {
  portfolio: Portfolio | undefined;
  isSaved: boolean;
  addToPortfolio: (stock: Stock) => void;
  removeFromPortfolio: (ticker: string) => void;
  updateWeight: (ticker: string, weight: number) => void;
  savePortfolio: () => void;
  unsavePortfolio: () => void;
  runBacktest: () => void;
  applyEqualAllocation: () => void;
  totalWeight: number;
  totalStocks: number;
  isInPortfolio: (ticker: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [portfolio, setPortfolio] = useState<Portfolio | undefined>(undefined);
  const [isSaved, setIsSaved] = useState(false);

  const addToPortfolio = useCallback(
    (stock: Stock) => {
      if (portfolio?.some((item) => item.ticker === stock.ticker)) {
        return;
      }

      const newStock = { ...stock, weight: 0 };
      setPortfolio((prev) => (prev ? [...prev, newStock] : [newStock]));

      if (isSaved) {
        setIsSaved(false);
      }
    },
    [portfolio, isSaved],
  );

  const removeFromPortfolio = useCallback(
    (ticker: string) => {
      setPortfolio((prev) => prev?.filter((stock) => stock.ticker !== ticker));

      if (isSaved) {
        setIsSaved(false);
      }
    },
    [isSaved],
  );

  const applyEqualAllocation = useCallback(() => {
    if (!portfolio) {
      return;
    }

    const equalWeight = 100 / portfolio?.length;
    setPortfolio((prev) =>
      prev?.map((stock) => ({ ...stock, weight: equalWeight })),
    );
  }, [portfolio]);

  const updateWeight = useCallback(
    (ticker: string, weight: number) => {
      setPortfolio((prev) => {
        if (!prev) {
          return prev;
        }

        const updatedPortfolio = prev.map((stock) =>
          stock.ticker === ticker ? { ...stock, weight } : stock,
        );

        return updatedPortfolio;
      });

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

  const isInPortfolio = useCallback(
    (ticker: string) =>
      portfolio?.some((stock) => stock.ticker === ticker) ?? false,
    [portfolio],
  );

  const totalWeight = useMemo(
    () => portfolio?.reduce((acc, stock) => acc + stock.weight, 0) ?? 0,
    [portfolio],
  );

  const totalStocks = useMemo(() => portfolio?.length ?? 0, [portfolio]);

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
    totalWeight,
    totalStocks,
    isInPortfolio,
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
