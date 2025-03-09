"use client";

import { usePortfolio } from "@/providers/portfolio-provider";
import { Button } from "@/components/ui/button";
import { Check, BookmarkX, Trophy } from "lucide-react";
import { useState } from "react";
import BacktestDialog from "./backtest-dialog";
import StocksTable from "./cards/stocks-table";
import DiversityScore from "./cards/diversity-score";
import PortfolioWeight from "./cards/portfolio-weight";
import Challenges from "./cards/challenges";
import PortfolioChartCard from "./cards/portfolio-chart";
import AdjustWeights from "./cards/adjust-weights";

export default function PortfolioSection() {
  const {
    portfolio,
    isSaved,
    removeFromPortfolio,
    savePortfolio,
    unsavePortfolio,
    applyEqualAllocation,
    runBacktest,
    totalWeight,
    totalStocks,
    handleWeightChange,
    isSaving,
    weights,
    isValidPortfolio,
    diversityScore,
  } = usePortfolio();

  const [backtestOpen, setBacktestOpen] = useState(false);

  const handleBacktest = () => {
    runBacktest();
    setBacktestOpen(true);
  };

  return (
    <div className="overflow-hidden py-2">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Portfolio</h1>
        </div>

        <div className="hidden gap-2 md:flex">
          {isSaved ? (
            <Button
              onClick={unsavePortfolio}
              className="game-button game-button-gray"
            >
              <BookmarkX className="mr-2 h-4 w-4" />
              Unsave
            </Button>
          ) : (
            <Button
              onClick={savePortfolio}
              disabled={isSaving || !isValidPortfolio}
              className="game-button game-button-primary"
            >
              {isSaving ? (
                <span className="animate-pulse">Saving...</span>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save Portfolio
                </>
              )}
            </Button>
          )}

          <Button
            onClick={handleBacktest}
            disabled={!isValidPortfolio}
            className="game-button game-button-secondary"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Backtest
          </Button>
        </div>
      </div>

      {totalStocks === 0 ? (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-foreground text-lg font-semibold">
            Your portfolio is empty
          </p>
          <p className="text-muted-foreground max-w-md">
            Add stocks from the discovery section below to start building your
            portfolio.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <PortfolioWeight totalWeight={totalWeight} />
              <DiversityScore diversityScore={diversityScore} />
              <Challenges />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PortfolioChartCard portfolio={portfolio} />
            <AdjustWeights
              portfolio={portfolio}
              applyEqualAllocation={applyEqualAllocation}
              handleWeightChange={handleWeightChange}
              weights={weights}
              removeFromPortfolio={removeFromPortfolio}
            />
          </div>

          <div className="game-card overflow-hidden">
            <StocksTable portfolio={portfolio} totalWeight={totalWeight} />
          </div>
        </>
      )}

      <div className="mt-6 grid w-full grid-cols-2 gap-4 md:hidden">
        {isSaved ? (
          <Button
            onClick={unsavePortfolio}
            className="game-button game-button-gray"
          >
            <BookmarkX className="mr-2 h-4 w-4" />
            Unsave
          </Button>
        ) : (
          <Button
            onClick={savePortfolio}
            disabled={isSaving || !isValidPortfolio}
            className="game-button game-button-primary"
          >
            {isSaving ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Portfolio
              </>
            )}
          </Button>
        )}

        <Button
          onClick={handleBacktest}
          disabled={!isValidPortfolio}
          className="game-button game-button-secondary"
        >
          <Trophy className="mr-2 h-4 w-4" />
          Backtest
        </Button>
      </div>

      <BacktestDialog open={backtestOpen} onOpenChange={setBacktestOpen} />
    </div>
  );
}
