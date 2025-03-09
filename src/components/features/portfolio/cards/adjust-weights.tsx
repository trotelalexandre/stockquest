import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Portfolio, Weights } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface AdjustWeightsProps {
  applyEqualAllocation: () => void;
  portfolio?: Portfolio;
  handleWeightChange: (ticker: string, value: number) => void;
  removeFromPortfolio: (ticker: string) => void;
  weights: Weights;
}

export default function AdjustWeights({
  applyEqualAllocation,
  portfolio,
  handleWeightChange,
  removeFromPortfolio,
  weights,
}: AdjustWeightsProps) {
  return (
    <div className="game-card space-y-8 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-foreground flex items-center gap-2 font-semibold">
            Adjust Weights
          </h3>
          <p className="text-muted-foreground text-sm">
            Adjust the weights of each stock.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => applyEqualAllocation()}
            className="game-button game-button-primary"
          >
            Equal Allocation
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {portfolio?.map((stock) => (
          <div
            key={stock.ticker}
            className="flex w-full items-center justify-between gap-4"
          >
            <div className="min-w-[120px]">
              <div className="text-foreground font-semibold">
                {stock.ticker}
              </div>
              <div className="text-muted-foreground text-xs">{stock.name}</div>
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
                <Trash2 className="text-muted-foreground h-4 w-4 hover:text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
