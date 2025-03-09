"use client";

import MetricsCard from "@/components/features/portfolio-results/metrics-card";
import PerformanceChart from "@/components/features/portfolio-results/performance-chart";
import PerformanceTable from "@/components/features/portfolio-results/performance-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BacktestResults() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Results</h1>
      </div>

      <div className="grid gap-8">
        <PerformanceChart />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <MetricsCard
            title="Total Return"
            value={22}
            benchmarkValue={12}
            color={22 >= 0 ? "green" : "red"}
          />
          <MetricsCard title="Sharpe Ratio" value={1.8} benchmarkValue={1.2} />
          <MetricsCard
            title="Max Drawdown"
            value={-9.2}
            benchmarkValue={-5.4}
            color={-9.2 >= 0 ? "green" : "red"}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Monthly Returns</h2>
          <div className="game-card overflow-x-auto">
            <PerformanceTable />
          </div>
        </div>
      </div>
    </>
  );
}
