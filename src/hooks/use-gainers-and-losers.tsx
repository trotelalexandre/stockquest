import { fetcher } from "@/lib/swr";
import { useEffect } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export const useGainersAndLosers = () => {
  const { isLoading, error } = useSWR(`/api/gainers-and-losers`, fetcher);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch gainers and losers data");
    }
  }, [error]);

  return {
    isLoading,
    error,
  };
};
