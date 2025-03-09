import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PORTFOLIO_STARTING_VALUE } from "@/lib/settings";
import { Portfolio } from "@/lib/types";
import { useMemo } from "react";

interface StocksTableProps {
  portfolio?: Portfolio;
  totalWeight?: number;
}

export default function StocksTable({
  portfolio,
  totalWeight,
}: StocksTableProps) {
  const total = useMemo(
    () => ((totalWeight ?? 0) * PORTFOLIO_STARTING_VALUE) / 100,
    [totalWeight],
  );

  return (
    <Table>
      <TableHeader className="bg-game-light">
        <TableRow>
          <TableHead className="text-foreground font-semibold">Stock</TableHead>
          <TableHead className="text-foreground font-semibold">
            Ticker
          </TableHead>
          <TableHead className="text-foreground font-semibold">
            Current Price
          </TableHead>
          <TableHead className="text-foreground font-semibold">
            Weight (%)
          </TableHead>
          <TableHead className="text-foreground font-semibold">
            Allocation ($)
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {portfolio?.map((stock) => {
          const portfolioValue = PORTFOLIO_STARTING_VALUE;
          const allocation = (stock.weight / 100) * portfolioValue;

          return (
            <TableRow key={stock.ticker} className="hover:bg-game-light">
              <TableCell className="font-medium">{stock.name}</TableCell>
              <TableCell className="text-game-blue font-semibold">
                {stock.ticker}
              </TableCell>
              <TableCell>${stock.price.toFixed(2)}</TableCell>
              <TableCell>
                <span className="font-semibold">
                  {stock.weight.toFixed(1)}%
                </span>
              </TableCell>
              <TableCell>
                <span className="text-game-primary font-semibold">
                  ${allocation.toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          );
        })}

        <TableRow className="bg-game-light">
          <TableCell
            colSpan={3}
            className="text-foreground text-right font-semibold"
          >
            Total
          </TableCell>
          <TableCell className="font-semibold">
            {totalWeight?.toFixed(1)}%
          </TableCell>
          <TableCell className="font-semibold">${total.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
