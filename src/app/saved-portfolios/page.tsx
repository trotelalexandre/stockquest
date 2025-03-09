import PortfolioCard from "@/components/features/saved-portfolios/portfolio-card";
import { mockSavedPortfolios } from "@/lib/data";

export default function SavedPortfolios() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-foreground mb-6 text-2xl font-bold">
        Saved Portfolios
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {mockSavedPortfolios?.map((portfolioMetadata) => (
          <PortfolioCard
            key={portfolioMetadata.id}
            portfolioMetadata={portfolioMetadata}
          />
        ))}
      </div>
    </main>
  );
}
