"use client";

import { fetcher } from "@/lib/swr";
import { Stock, StockMetadata, YahooStock } from "@/lib/types";
import useSWR from "swr";

export const useStock = (metadata: StockMetadata) => {
  const { data, error, isLoading } = useSWR<YahooStock>(
    `/api/stock/${metadata.ticker}`,
    fetcher,
  );

  const stock: Stock = {
    name: metadata?.name ?? data?.shortName ?? "",
    ticker: metadata?.ticker ?? data?.symbol ?? "",
    price: data?.regularMarketPrice ?? 0,
    change_percentage: data?.regularMarketChangePercent ?? 0,
    company: metadata?.company ?? data?.longName ?? "",
    logo: metadata?.logo ?? "",
  };

  return {
    stock,
    isLoading,
    error,
  };
};
