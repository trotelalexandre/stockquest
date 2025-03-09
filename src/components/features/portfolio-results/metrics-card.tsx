import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: number;
  benchmarkValue?: number;
  color?: "green" | "yellow" | "default" | "red";
}

export default function MetricsCard({
  title,
  value,
  benchmarkValue,
  color = "default",
}: MetricsCardProps) {
  return (
    <Card className="game-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p
          className={cn(
            "text-3xl font-bold",
            color === "yellow" && "text-game-secondary",
            color === "default" && "text-foreground",
            color === "green" && "text-game-primary",
            color === "red" && "text-game-accent",
          )}
        >
          {value}%
        </p>

        {benchmarkValue && (
          <p className="text-muted-foreground text-sm">
            vs. {benchmarkValue}% S&P 500
          </p>
        )}
      </CardContent>
    </Card>
  );
}
