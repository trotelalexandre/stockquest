import PortfolioSection from "@/components/portfolio-section";
import StockDiscoverySection from "@/components/stock-discovery-section";
import { PortfolioProvider } from "@/providers/portfolio-provider";

export default function Home() {
  return (
    <PortfolioProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold">Portfolio</h1>
        <PortfolioSection />
        <StockDiscoverySection />
      </main>
    </PortfolioProvider>
  );
}
