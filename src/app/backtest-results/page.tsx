"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BacktestResults() {
  // TODO: mock data for the backtest results
  const portfolioData = [
    { date: "2023-01", portfolio: 10000, benchmark: 10000 },
    { date: "2023-02", portfolio: 10250, benchmark: 10150 },
    { date: "2023-03", portfolio: 10400, benchmark: 10300 },
    { date: "2023-04", portfolio: 10800, benchmark: 10450 },
    { date: "2023-05", portfolio: 10600, benchmark: 10400 },
    { date: "2023-06", portfolio: 10900, benchmark: 10500 },
    { date: "2023-07", portfolio: 11200, benchmark: 10650 },
    { date: "2023-08", portfolio: 11500, benchmark: 10800 },
    { date: "2023-09", portfolio: 11300, benchmark: 10750 },
    { date: "2023-10", portfolio: 11600, benchmark: 10900 },
    { date: "2023-11", portfolio: 11900, benchmark: 11050 },
    { date: "2023-12", portfolio: 12200, benchmark: 11200 },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Results</h1>
      </div>

      <div className="grid gap-8">
        <Card className="game-card">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>
              Performance of your portfolio over the past 12 months compared to
              S&P 500.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    name="Your Portfolio"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    name="S&P 500"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="game-card">
            <CardHeader>
              <CardTitle>Total Return</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">+22.0%</p>
              <p className="text-muted-foreground text-sm">
                vs. +12.0% S&P 500
              </p>
            </CardContent>
          </Card>

          <Card className="game-card">
            <CardHeader>
              <CardTitle>Sharpe Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1.8</p>
              <p className="text-muted-foreground text-sm">vs. 1.2 S&P 500</p>
            </CardContent>
          </Card>

          <Card className="game-card">
            <CardHeader>
              <CardTitle>Max Drawdown</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">-8.2%</p>
              <p className="text-muted-foreground text-sm">vs. -5.4% S&P 500</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Monthly Returns</h2>
          <div className="game-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left font-medium">Month</th>
                  <th className="p-2 text-right font-medium">Portfolio</th>
                  <th className="p-2 text-right font-medium">S&P 500</th>
                  <th className="p-2 text-right font-medium">Difference</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((data, index) => {
                  const prevData = index > 0 ? portfolioData[index - 1] : data;
                  const portfolioReturn =
                    ((data.portfolio - prevData.portfolio) /
                      prevData.portfolio) *
                    100;
                  const benchmarkReturn =
                    ((data.benchmark - prevData.benchmark) /
                      prevData.benchmark) *
                    100;
                  const difference = portfolioReturn - benchmarkReturn;

                  return index > 0 ? (
                    <tr key={data.date} className="border-b">
                      <td className="p-2">{data.date}</td>
                      <td
                        className={`p-2 text-right ${portfolioReturn >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {portfolioReturn >= 0 ? "+" : ""}
                        {portfolioReturn.toFixed(2)}%
                      </td>
                      <td
                        className={`p-2 text-right ${benchmarkReturn >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {benchmarkReturn >= 0 ? "+" : ""}
                        {benchmarkReturn.toFixed(2)}%
                      </td>
                      <td
                        className={`p-2 text-right ${difference >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {difference >= 0 ? "+" : ""}
                        {difference.toFixed(2)}%
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
