import PortfolioCard from "@/components/features/saved-portfolios/portfolio-card";
import { mockSavedPortfolios } from "@/lib/data";

export default function SavedPortfolios() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-foreground text-2xl font-bold">Saved Portfolios</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {mockSavedPortfolios?.map((portfolioMetadata) => (
          <PortfolioCard
            key={portfolioMetadata.id}
            portfolioMetadata={portfolioMetadata}
          />
        ))}
      </div>
    </div>
  );
}
