"use client";

import { TrendingUp } from "lucide-react";
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { mockPortfolioData } from "@/lib/data";
import { useMemo } from "react";

const chartConfig = {
  portfolio: {
    label: "Your Portfolio",
    color: "hsl(var(--chart-1))",
  },
  benchmark: {
    label: "S&P 500",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function PerformanceChart() {
  const yAxisDomain = useMemo(() => {
    const portfolioValues = mockPortfolioData?.map((d) => d.portfolio);
    const benchmarkValues = mockPortfolioData?.map((d) => d.benchmark);
    const allValues = [...portfolioValues, ...benchmarkValues];

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    const padding = (maxValue - minValue) * 0.1 || 100;
    const domainMin = minValue - padding;
    const domainMax = maxValue + padding;

    return [
      Math.floor(domainMin / 100) * 100,
      Math.ceil(domainMax / 100) * 100,
    ];
  }, []);

  return (
    <Card className="game-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="text-game-primary h-4 w-4" />
          Portfolio Performance
        </CardTitle>
        <CardDescription>
          Performance of your portfolio over time compared to S&P 500
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
          <LineChart data={mockPortfolioData} margin={{ top: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                value.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              tickMargin={8}
              domain={yAxisDomain}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent labelFormatter={(label) => label} />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke={chartConfig.portfolio.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={300}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke={chartConfig.benchmark.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={600}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing portfolio value over the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
