import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SavedPortfolios() {
  // TODO: fetch from API
  const savedPortfolios = [
    { id: 1, name: "Growth Portfolio", stocks: 8, lastUpdated: "2023-03-06" },
    { id: 2, name: "Dividend Portfolio", stocks: 5, lastUpdated: "2023-03-01" },
    { id: 3, name: "Tech Stocks", stocks: 6, lastUpdated: "2023-02-28" },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Saved Portfolios</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {savedPortfolios.map((portfolio) => (
          <Card key={portfolio.id}>
            <CardHeader>
              <CardTitle>{portfolio.name}</CardTitle>
              <CardDescription>
                Last updated: {portfolio.lastUpdated}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{portfolio.stocks} stocks</p>
              <Button asChild>
                <Link href="/">
                  View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
