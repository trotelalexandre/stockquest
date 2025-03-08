import PortfolioSection from "@/components/features/portfolio/portfolio-section";
import StockDiscoverySection from "@/components/features/discover/stock-discovery-section";
import { PortfolioProvider } from "@/providers/portfolio-provider";

export default function Home() {
  return (
    <PortfolioProvider>
      <main className="container mx-auto flex flex-col gap-8 px-4 py-8">
        <PortfolioSection />
        <StockDiscoverySection />
      </main>
    </PortfolioProvider>
  );
}
