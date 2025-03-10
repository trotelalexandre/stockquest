import { fetcher } from "@/lib/swr";
import { Stocks } from "@/lib/types";
import { useEffect } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export const useGainersAndLosers = () => {
  const { data, isLoading, error } = useSWR(`/api/gainers-and-losers`, fetcher);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch gainers and losers data");
    }
  }, [error]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stocks: Stocks = data?.map((stock: any) => {
    if (!stock) return null;

    return {
      name: stock.ticker,
      ticker: stock.ticker,
      price: stock.price,
      change_percentage: stock.change_percentage,
    };
  });

  return {
    stocks,
    isLoading,
    error,
  };
};
