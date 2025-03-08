"use client";

import type { Stock } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, Check, TrendingUp, TrendingDown } from "lucide-react";
import { usePortfolio } from "@/providers/portfolio-provider";
import Image from "next/image";

interface StockCardProps {
  stock: Stock;
}

export default function StockCard({ stock }: StockCardProps) {
  const { addToPortfolio, portfolio } = usePortfolio();

  const isInPortfolio = portfolio.some((item) => item.ticker === stock.ticker);

  return (
    <div className="game-card group overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {stock.logo && (
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white">
                <Image
                  src={stock.logo || "/placeholder.svg"}
                  alt={stock.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-800">{stock.name}</h3>
              </div>
              <p className="text-xs text-gray-500">{stock.ticker}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">
              ${stock.price.toFixed(2)}
            </p>
            <p
              className={`flex items-center justify-end text-xs ${stock.change >= 0 ? "text-game-primary" : "text-game-accent"}`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {stock.change >= 0 ? "+" : ""}
              {stock.change.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-500">{stock.company}</div>
      </div>

      <div className="p-4 pt-0">
        <Button
          className={`w-full transition-all duration-300 ${
            isInPortfolio
              ? "border-b-2 border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 text-gray-700"
              : "game-button game-button-primary group-hover:translate-y-[-2px]"
          }`}
          onClick={() => addToPortfolio(stock)}
          disabled={isInPortfolio}
        >
          {isInPortfolio ? (
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
