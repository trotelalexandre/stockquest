"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Portfolio, Stock, WeightedStock, Weights } from "@/lib/types";
import { useConfetti } from "./confetti-provider";
import { useXP } from "./xp-provider";

interface PortfolioContextType {
  portfolio?: Portfolio;
  isSaved: boolean;
  addToPortfolio: (stock: Stock) => void;
  removeFromPortfolio: (ticker: string) => void;
  updateWeight: (ticker: string, weight: number) => void;
  savePortfolio: (portfolioName: string) => void;
  unsavePortfolio: () => void;
  runBacktest: () => void;
  applyEqualAllocation: () => void;
  totalWeight: number;
  totalStocks: number;
  isInPortfolio: (ticker: string) => boolean;
  handleAddOrRemove: (stock: Stock) => void;
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  handleWeightChange: (ticker: string, value: number) => void;
  weights: Weights;
  isValidPortfolio: boolean;
  diversityScore: number;
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
  const [isSaving, setIsSaving] = useState(false);

  const { handleSetShowConfetti } = useConfetti();
  const { awardXP } = useXP();

  const addToPortfolio = useCallback(
    (stock: Stock) => {
      if (portfolio?.some((item) => item.ticker === stock.ticker)) {
        return;
      }

      const newStock: WeightedStock = {
        ...stock,
        weight: 0,
      };
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

  const savePortfolio = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (portfolioName: string) => {
      // TODO: Save the portfolio to the user's account
      setIsSaving(true);

      // simulate API call
      setTimeout(() => {
        setIsSaved(true);
        setIsSaving(false);

        // show confetti and award XP
        handleSetShowConfetti(true);
        awardXP(50);
      }, 1000);
    },
    [awardXP, handleSetShowConfetti],
  );

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

  const handleAddOrRemove = useCallback(
    (stock: Stock) => {
      const stockInPortfolio = isInPortfolio(stock.ticker);

      if (stockInPortfolio) {
        removeFromPortfolio(stock.ticker);
      } else {
        addToPortfolio(stock);
      }
    },
    [addToPortfolio, isInPortfolio, removeFromPortfolio],
  );

  const handleWeightChange = useCallback(
    (ticker: string, value: number) => {
      updateWeight(ticker, value);
    },
    [updateWeight],
  );

  const totalWeight = useMemo(
    () => portfolio?.reduce((acc, stock) => acc + stock.weight, 0) ?? 0,
    [portfolio],
  );

  const totalStocks = useMemo(() => portfolio?.length ?? 0, [portfolio]);

  const calculateWeights = useCallback(() => {
    if (portfolio) {
      const weightsObject: Weights = {};
      portfolio.forEach((stock) => {
        weightsObject[stock.ticker] = stock.weight;
      });
      return weightsObject;
    }
    return {};
  }, [portfolio]);

  const weights = useMemo(() => calculateWeights(), [calculateWeights]);

  const isValidPortfolio = useMemo(() => totalWeight === 100, [totalWeight]);

  const diversityScore = useMemo(
    () => (totalStocks > 0 ? Math.min(100, Math.max(0, totalStocks * 10)) : 0),
    [totalStocks],
  );

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
    handleAddOrRemove,
    isSaving,
    setIsSaving,
    handleWeightChange,
    weights,
    isValidPortfolio,
    diversityScore,
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
