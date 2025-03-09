import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { mockPortfolioData } from "@/lib/data";

export default function PerformanceTable() {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b">
          <TableHead className="p-2 text-left font-medium">Month</TableHead>
          <TableHead className="p-2 text-right font-medium">
            Portfolio
          </TableHead>
          <TableHead className="p-2 text-right font-medium">S&P 500</TableHead>
          <TableHead className="p-2 text-right font-medium">
            Difference
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {mockPortfolioData.map((data, index) => {
          const prevData = index > 0 ? mockPortfolioData[index - 1] : data;
          const portfolioReturn =
            ((data.portfolio - prevData.portfolio) / prevData.portfolio) * 100;
          const benchmarkReturn =
            ((data.benchmark - prevData.benchmark) / prevData.benchmark) * 100;
          const difference = portfolioReturn - benchmarkReturn;

          return index > 0 ? (
            <TableRow key={data.date.getTime()} className="border-b">
              <TableCell className="p-2">
                {data.date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell
                className={`p-2 text-right ${portfolioReturn >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {portfolioReturn >= 0 ? "+" : ""}
                {portfolioReturn.toFixed(2)}%
              </TableCell>
              <TableCell
                className={`p-2 text-right ${benchmarkReturn >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {benchmarkReturn >= 0 ? "+" : ""}
                {benchmarkReturn.toFixed(2)}%
              </TableCell>
              <TableCell
                className={`p-2 text-right ${difference >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {difference >= 0 ? "+" : ""}
                {difference.toFixed(2)}%
              </TableCell>
            </TableRow>
          ) : null;
        })}
      </TableBody>
    </Table>
  );
}
