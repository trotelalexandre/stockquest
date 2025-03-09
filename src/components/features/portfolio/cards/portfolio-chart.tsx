"use client";

import { Portfolio } from "@/lib/types";
import { usePortfolio } from "@/providers/portfolio-provider";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

const COLORS = {
  color1: "#FFC107",
  color2: "#2196F3",
  color3: "#4CAF50",
  color4: "#FF5722",
  color5: "#9C27B0",
  color6: "#E91E63",
  color7: "#00BCD4",
  color8: "#FF9800",
  color9: "#795548",
  color10: "#607D8B",
};

interface PortfolioChartCardProps {
  portfolio?: Portfolio;
}

export default function PortfolioChartCard({
  portfolio,
}: PortfolioChartCardProps) {
  const { portfolio: contextPortfolio } = usePortfolio();
  const activePortfolio = portfolio || contextPortfolio;

  const chartData = useMemo(() => {
    const filtered = activePortfolio?.filter((stock) => stock.weight > 0) || [];

    return filtered.map((stock, index) => ({
      ticker: stock.ticker,
      weight: stock.weight,
      fill: Object.values(COLORS)[index % Object.keys(COLORS).length],
    }));
  }, [activePortfolio]);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      weight: {
        label: "Weight",
      },
    };
    chartData.forEach((stock, index) => {
      config[stock.ticker.toLowerCase()] = {
        label: stock.ticker,
        color: Object.values(COLORS)[index % Object.keys(COLORS).length],
      };
    });
    return config;
  }, [chartData]);

  if (!chartData.length) {
    return (
      <Card className="game-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-game-primary h-4 w-4" />
            Portfolio Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-[250px] items-center justify-center text-sm">
            Adjust stock weights to see portfolio allocation
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="game-card">
      <CardHeader className="items-start pb-0">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="text-game-primary h-4 w-4" />
          Portfolio Allocation
        </CardTitle>
        <CardDescription>Current Portfolio Distribution</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto flex aspect-square max-h-[300px] items-center justify-center overflow-visible pb-0"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value: string) => `${value}`}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="weight"
              nameKey="ticker"
              label={({ name, value }) => (value > 8 ? `${name}` : undefined)}
              labelLine={false}
              innerRadius={40}
              outerRadius={80}
              animationDuration={300}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing current portfolio allocation by weight
        </div>
      </CardFooter>
    </Card>
  );
}
