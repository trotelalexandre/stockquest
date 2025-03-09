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
import { PortfolioMetadata } from "@/lib/types";

interface PortfolioCardProps {
  portfolioMetadata: PortfolioMetadata;
}

export default function PortfolioCard({
  portfolioMetadata,
}: PortfolioCardProps) {
  const { name, lastUpdated, stocks, id } = portfolioMetadata;

  return (
    <Card className="game-card">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          Last updated: {lastUpdated?.toLocaleDateString("en-US")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="mb-4 font-semibold">{stocks} stocks</p>

        <Button className="game-button game-button-primary" asChild>
          <Link href={`/portfolioMetadata/${id}`}>
            View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
