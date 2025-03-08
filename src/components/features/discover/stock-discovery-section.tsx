"use client";

import { stockSections } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockCard from "../../stock-card";
import { TrendingUp, Sparkles, ArrowUp, ArrowDown } from "lucide-react";

export default function StockDiscoverySection() {
  return (
    <div className="mb-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Discover</h2>
      </div>

      <Tabs defaultValue="new">
        <div className="hide-scrollbar overflow-x-auto">
          <TabsList className="mb-6 inline-flex h-12 gap-2">
            {stockSections.map((section) => (
              <TabsTrigger
                key={section.category}
                value={section.category}
                className="h-full cursor-pointer font-semibold"
              >
                {section.category === "new" && (
                  <Sparkles className="mr-1.5 h-4 w-4" />
                )}
                {section.category === "trending" && (
                  <TrendingUp className="mr-1.5 h-4 w-4" />
                )}
                {section.category === "gainers" && (
                  <ArrowUp className="mr-1.5 h-4 w-4" />
                )}
                {section.category === "losers" && (
                  <ArrowDown className="mr-1.5 h-4 w-4" />
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {section.stocks.map((stock) => (
                <StockCard key={stock.id} stock={stock} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
