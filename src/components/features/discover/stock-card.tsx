"use client";

import type { StockMetadata } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, Check, TrendingUp, TrendingDown } from "lucide-react";
import { usePortfolio } from "@/providers/portfolio-provider";
import Image from "next/image";
import { useStock } from "@/hooks/use-stock";

interface StockCardProps {
  stockMetadata: StockMetadata;
}

export default function StockCard({ stockMetadata }: StockCardProps) {
  const { handleAddOrRemove, isInPortfolio } = usePortfolio();
  const { stock } = useStock(stockMetadata);

  return (
    <div className="game-card group overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {stockMetadata?.logo && (
              <div className="bg-game-light flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border">
                <Image
                  src={stockMetadata?.logo}
                  alt={stockMetadata?.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-foreground font-semibold">
                  {stockMetadata?.name}
                </h3>
              </div>
              <p className="text-muted-foreground text-xs">
                {stockMetadata?.ticker}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-foreground font-semibold">
              ${stock?.price.toFixed(2)}
            </p>
            <p
              className={`flex items-center justify-end text-xs ${(stock?.change_percentage ?? 0) >= 0 ? "text-game-primary" : "text-game-accent"}`}
            >
              {(stock?.change_percentage ?? 0) >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {(stock?.change_percentage ?? 0) >= 0 ? "+" : ""}
              {(stock?.change_percentage ?? 0).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="text-muted-foreground mt-3 text-xs">
          {stockMetadata?.company}
        </div>
      </div>

      <div className="p-4 pt-0">
        <Button
          className={`game-button w-full ${
            isInPortfolio(stockMetadata?.ticker)
              ? "game-button-gray"
              : "game-button-primary"
          }`}
          onClick={() => handleAddOrRemove(stock)}
        >
          {isInPortfolio(stockMetadata?.ticker) ? (
            <span className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Added to Portfolio
            </span>
          ) : (
            <span className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add to Portfolio
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
