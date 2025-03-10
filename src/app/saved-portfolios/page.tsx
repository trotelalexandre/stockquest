"use client";

import PortfolioCard from "@/components/features/saved-portfolios/portfolio-card";
import { useSavedPortfolios } from "@/hooks/use-saved-portfolios";
import { Skeleton } from "@/components/ui/skeleton";

export default function SavedPortfolios() {
  const { savedPortfolios, isLoading } = useSavedPortfolios();

  if (savedPortfolios?.length === 0) {
    return <div className="text-foreground">No saved portfolios yet.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-foreground text-2xl font-bold">Saved Portfolios</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading &&
          [...Array.from({ length: 6 })].map((_, index) => (
            <Skeleton key={index} className="h-48" />
          ))}

        {savedPortfolios?.map((portfolioMetadata) => (
          <PortfolioCard
            key={portfolioMetadata.id}
            portfolioMetadata={portfolioMetadata}
          />
        ))}
      </div>
    </div>
  );
}
