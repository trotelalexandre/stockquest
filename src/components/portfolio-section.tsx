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
import { useState, useEffect } from "react";
import PortfolioChart from "./portfolio-chart";
import WeightSlider from "./weight-slider";
import BacktestDialog from "./backtest-dialog";
import Confetti from "./confetti";
import Badge from "./badge";

export default function PortfolioSection() {
  const {
    portfolio,
    isSaved,
    removeFromPortfolio,
    updateWeight,
    savePortfolio,
    unsavePortfolio,
    runBacktest,
  } = usePortfolio();

  const [weights, setWeights] = useState<Record<string, number>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [backtestOpen, setBacktestOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpAnimation, setShowXpAnimation] = useState(false);

  // Initialize weights from portfolio
  useEffect(() => {
    const initialWeights: Record<string, number> = {};
    portfolio.forEach((stock) => {
      initialWeights[stock.ticker] = stock.weight;
    });
    setWeights(initialWeights);
  }, [portfolio]);

  const handleWeightChange = (ticker: string, value: number) => {
    // Update local state
    setWeights((prev) => ({ ...prev, [ticker]: value }));

    // Update context
    updateWeight(ticker, value);

    // Award XP for adjusting weights if it's a significant change
    const currentWeight =
      portfolio.find((s) => s.ticker === ticker)?.weight || 0;
    if (Math.abs(currentWeight - value) > 5 && !showXpAnimation) {
      awardXP(5);
    }
  };

  const handleSavePortfolio = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      savePortfolio();
      setIsSaving(false);

      // Show confetti and award XP
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

  const awardXP = (amount: number) => {
    setXpEarned(amount);
    setShowXpAnimation(true);

    setTimeout(() => {
      setShowXpAnimation(false);
    }, 2000);
  };

  const totalWeight = portfolio.reduce((sum, stock) => sum + stock.weight, 0);
  const isValidPortfolio =
    Math.abs(totalWeight - 100) < 0.01 && portfolio.length > 0;

  // calculate portfolio diversity score (0-100)
  const diversityScore =
    portfolio.length > 0
      ? Math.min(100, Math.max(0, portfolio.length * 10))
      : 0;

  return (
    <div className="game-card relative mb-8 overflow-hidden p-6">
      {showConfetti && <Confetti />}

      {showXpAnimation && (
        <div className="from-game-blue absolute top-4 right-4 animate-bounce rounded-lg border-b-2 border-[#0D47A1] bg-gradient-to-b to-[#1976D2] px-3 py-1 font-semibold text-white shadow-sm">
          +{xpEarned} XP
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Portfolio Builder</h2>
          <Badge label="Level 2" color="blue" />
        </div>
        <div className="flex gap-2">
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
              className="game-button border-b-2 border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 text-gray-700"
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
          <div className="bg-game-light mb-2 flex h-16 w-16 items-center justify-center rounded-full">
            <Info className="text-game-blue h-8 w-8" />
          </div>
          <p className="text-lg font-medium text-gray-700">
            Your portfolio is empty
          </p>
          <p className="max-w-md text-gray-500">
            Add stocks from the discovery section below to start building your
            portfolio.
          </p>
          <div className="bg-game-light mt-2 flex max-w-md items-center gap-2 rounded-lg p-3 text-gray-700">
            <span className="text-sm">
              Tip: Add at least 5 different stocks for a well-diversified
              portfolio
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div className="game-card flex-1 p-4">
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
                    className="game-progress-fill"
                    style={{
                      width: `${Math.min(totalWeight, 100)}%`,
                      background:
                        Math.abs(totalWeight - 100) < 0.01
                          ? "linear-gradient(90deg, #4CAF50, #8BC34A)"
                          : "linear-gradient(90deg, #F44336, #FF5722)",
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

              <div className="game-card flex-1 p-4">
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
                    className="game-progress-fill"
                    style={{
                      width: `${diversityScore}%`,
                      background: "linear-gradient(90deg, #2196F3, #03A9F4)",
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

              <div className="game-card flex-1 p-4">
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

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-semibold text-gray-700">
                <Award className="text-game-secondary h-4 w-4" />
                Adjust Weights
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                Drag the sliders to adjust the weight of each stock in your
                portfolio. The total weight should equal 100%.
              </p>

              {portfolio.map((stock) => (
                <div
                  key={stock.ticker}
                  className="game-card flex items-center gap-3 p-3"
                >
                  <div className="min-w-[120px]">
                    <div className="font-semibold text-gray-800">
                      {stock.ticker}
                    </div>
                    <div className="text-xs text-gray-500">{stock.name}</div>
                  </div>

                  <WeightSlider
                    value={weights[stock.ticker] || stock.weight}
                    onChange={(value) =>
                      handleWeightChange(stock.ticker, value)
                    }
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromPortfolio(stock.ticker)}
                    className="hover:text-game-accent hover:bg-game-accent/10 ml-1 rounded-lg text-gray-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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

      <BacktestDialog open={backtestOpen} onOpenChange={setBacktestOpen} />
    </div>
  );
}
