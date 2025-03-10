"use client";

import { fetcher } from "@/lib/swr";
import { PortfolioMetadata } from "@/lib/types";
import useSWR from "swr";

export const useSavedPortfolios = () => {
  const { isLoading, error, data } = useSWR<PortfolioMetadata[]>(
    `/api/saved-portfolios`,
    fetcher,
  );

  return {
    isLoading,
    error,
    savedPortfolios: data,
  };
};
