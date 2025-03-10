"use client";

import { popularStocks, stockSections } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Sparkles } from "lucide-react";
import StockCard from "./stock-card";

export default function StockDiscoverySection() {
  return (
    <div className="mb-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold">Discover</h2>
      </div>

      <Tabs defaultValue={stockSections[0].category}>
        <div className="hide-scrollbar overflow-x-auto">
          <TabsList className="mb-6 inline-flex h-10 gap-2">
            {stockSections.map((section) => (
              <TabsTrigger
                key={section.category}
                value={section.category}
                className="h-full cursor-pointer font-semibold"
                disabled={section.disabled}
              >
                {section.category === "popular" && (
                  <Sparkles className="mr-1.5 h-4 w-4" />
                )}
                {section.category === "gainers" && (
                  <TrendingUp className="mr-1.5 h-4 w-4" />
                )}
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {stockSections.map((section) => (
          <TabsContent
            key={section.category}
            value={section.category}
            className="mt-0"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {section.category === "popular" &&
                popularStocks?.map((stockMetadata) => (
                  <StockCard
                    key={stockMetadata.ticker}
                    stockMetadata={stockMetadata}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
