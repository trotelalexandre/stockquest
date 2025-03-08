"use client";

import { usePortfolio } from "@/providers/portfolio-provider";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trash2,
  Check,
  BookmarkX,
  Trophy,
  TrendingUp,
  Award,
  Info,
  AlertCircle,
} from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import PortfolioChart from "./portfolio-chart";
import BacktestDialog from "./backtest-dialog";
import Badge from "@/components/badge";
import { useXP } from "@/providers/xp-provider";
import { useConfetti } from "@/providers/confetti-provider";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function PortfolioSection() {
  const {
    portfolio,
    isSaved,
    removeFromPortfolio,
    updateWeight,
    savePortfolio,
    unsavePortfolio,
    applyEqualAllocation,
    runBacktest,
  } = usePortfolio();

  const [weights, setWeights] = useState<Record<string, number>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [backtestOpen, setBacktestOpen] = useState(false);

  const { awardXP } = useXP();
  const { setShowConfetti } = useConfetti();

  const handleWeightChange = useCallback(
    (ticker: string, value: number) => {
      // update local state
      setWeights((prev) => ({ ...prev, [ticker]: value }));

      // update context
      updateWeight(ticker, value);
    },
    [updateWeight],
  );

  const handleEqualAllocation = useCallback(() => {
    const totalStocks = portfolio.length;
    const equalWeight = 100 / totalStocks;

    const equalWeights: Record<string, number> = {};
    portfolio.forEach((stock) => {
      equalWeights[stock.ticker] = equalWeight;
    });

    // update local state and context
    setWeights(equalWeights);

    applyEqualAllocation();
  }, [portfolio, applyEqualAllocation]);

  const handleSavePortfolio = () => {
    setIsSaving(true);

    // simulate API call
    setTimeout(() => {
      savePortfolio();
      setIsSaving(false);

      // show confetti and award XP
      setShowConfetti(true);
      awardXP(50);
    }, 1000);
  };

  const handleUnsavePortfolio = () => {
    unsavePortfolio();
  };

  const handleBacktest = () => {
    runBacktest();
    setBacktestOpen(true);

    // award XP for running a backtest
    awardXP(25);
  };

  const totalWeight = useMemo(
    () => portfolio.reduce((sum, stock) => sum + stock.weight, 0),
    [portfolio],
  );
  const isValidPortfolio = useMemo(() => totalWeight === 100, [totalWeight]);

  // calculate portfolio diversity score (0-100)
  const diversityScore =
    portfolio.length > 0
      ? Math.min(100, Math.max(0, portfolio.length * 10))
      : 0;

  return (
    <div className="overflow-hidden py-2">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <Badge label="Level 2" color="blue" />
        </div>
        <div className="hidden gap-2 md:flex">
          <Button
            onClick={handleBacktest}
            disabled={!isValidPortfolio}
            className="game-button game-button-secondary"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Backtest
          </Button>

          {isSaved ? (
            <Button
              onClick={handleUnsavePortfolio}
              className="game-button game-button-gray"
            >
              <BookmarkX className="mr-2 h-4 w-4" />
              Unsave
            </Button>
          ) : (
            <Button
              onClick={handleSavePortfolio}
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
        </div>
      </div>

      {portfolio.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent">
            <Info className="text-game-blue h-8 w-8" />
          </div>
          <p className="text-lg font-medium text-gray-700">
            Your portfolio is empty
          </p>
          <p className="max-w-md text-gray-500">
            Add stocks from the discovery section below to start building your
            portfolio.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div className="game-card flex flex-col p-4 md:flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">
                    Portfolio Weight
                  </h3>
                  <span
                    className={`font-semibold ${Math.abs(totalWeight - 100) < 0.01 ? "text-game-primary" : "text-game-accent"}`}
                  >
                    {totalWeight.toFixed(0)}%
                  </span>
                </div>
                <div className="game-progress-bar">
                  <div
                    className={cn("game-progress-fill", {
                      "bg-game-primary": Math.abs(totalWeight - 100) < 0.01,
                      "bg-game-accent": Math.abs(totalWeight - 100) >= 0.01,
                    })}
                    style={{
                      width: `${Math.min(totalWeight, 100)}%`,
                    }}
                  />
                </div>
                {Math.abs(totalWeight - 100) < 0.01 ? (
                  <div className="text-game-primary mt-2 flex items-center gap-1 text-xs">
                    <Check className="h-3 w-3" />
                    Perfect balance!
                  </div>
                ) : (
                  <div className="text-game-accent mt-2 flex items-center gap-1 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    {totalWeight < 100
                      ? `Add ${(100 - totalWeight).toFixed(0)}% more`
                      : `Remove ${(totalWeight - 100).toFixed(0)}%`}
                  </div>
                )}
              </div>

              <div className="game-card flex flex-col p-4 md:flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">
                    Diversity Score
                  </h3>
                  <span className="text-game-blue font-semibold">
                    {diversityScore}/100
                  </span>
                </div>
                <div className="game-progress-bar">
                  <div
                    className="game-progress-fill bg-game-blue"
                    style={{
                      width: `${diversityScore}%`,
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {diversityScore < 50
                    ? "Add more stocks to diversify your portfolio"
                    : diversityScore < 80
                      ? "Good diversity! Consider adding more variety"
                      : "Excellent diversity!"}
                </div>
              </div>

              <div className="game-card flex flex-col p-4 md:flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Challenges</h3>
                  <span className="text-game-purple font-semibold">1/3</span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="from-game-primary flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-b to-[#388E3C]">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700">Add 5 stocks</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                    <span>Balance to 100%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                    <span>Run a backtest</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="game-card p-4">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-700">
                <TrendingUp className="text-game-primary h-4 w-4" />
                Portfolio Allocation
              </h3>
              <div className="mx-auto aspect-square w-[280px]">
                {portfolio.some((stock) => stock.weight > 0) ? (
                  <PortfolioChart />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    Adjust stock weights to see portfolio allocation
                  </div>
                )}
              </div>
            </div>

            <div className="game-card space-y-8 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-gray-700">
                    <Award className="text-game-secondary h-4 w-4" />
                    Adjust Weights
                  </h3>
                  <p className="text-sm text-gray-500">
                    Adjust the weights of each stock.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEqualAllocation()}
                    className="game-button game-button-primary"
                  >
                    Equal Allocation
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {portfolio.map((stock) => (
                  <div
                    key={stock.ticker}
                    className="flex w-full items-center justify-between gap-4"
                  >
                    <div className="min-w-[120px]">
                      <div className="font-semibold text-gray-800">
                        {stock.ticker}
                      </div>
                      <div className="text-xs text-gray-500">{stock.name}</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          className="game-input w-16"
                          value={weights[stock.ticker] ?? stock.weight ?? ""}
                          onChange={(e) =>
                            handleWeightChange(
                              stock.ticker,
                              parseFloat(e.target.value) ?? undefined,
                            )
                          }
                        />
                        <span>%</span>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => removeFromPortfolio(stock.ticker)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="game-card overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-700">
                    Stock
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Ticker
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Current Price
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Weight (%)
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Allocation ($)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolio.map((stock) => {
                  // Assuming a $10,000 portfolio for demonstration
                  const portfolioValue = 10000;
                  const allocation = (stock.weight / 100) * portfolioValue;

                  return (
                    <TableRow key={stock.ticker} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {stock.name}
                      </TableCell>
                      <TableCell className="text-game-blue font-semibold">
                        {stock.ticker}
                      </TableCell>
                      <TableCell>${stock.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          {stock.weight.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-game-primary font-semibold">
                          ${allocation.toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-gray-50">
                  <TableCell
                    colSpan={3}
                    className="text-right font-semibold text-gray-700"
                  >
                    Total
                  </TableCell>
                  <TableCell className="font-semibold">
                    {totalWeight.toFixed(1)}%
                  </TableCell>
                  <TableCell className="font-semibold">$10,000.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </>
      )}

      <div className="mt-6 grid w-full grid-cols-2 gap-4 md:hidden">
        <Button
          onClick={handleBacktest}
          disabled={!isValidPortfolio}
          className="game-button game-button-secondary"
        >
          <Trophy className="mr-2 h-4 w-4" />
          Backtest
        </Button>

        {isSaved ? (
          <Button
            onClick={handleUnsavePortfolio}
            className="game-button game-button-gray"
          >
            <BookmarkX className="mr-2 h-4 w-4" />
            Unsave
          </Button>
        ) : (
          <Button
            onClick={handleSavePortfolio}
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
      </div>

      <BacktestDialog open={backtestOpen} onOpenChange={setBacktestOpen} />
    </div>
  );
}
