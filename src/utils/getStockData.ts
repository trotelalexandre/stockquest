import yahooFinance from "yahoo-finance2";

export const getStockData = async (ticker: string) => {
  const results = await yahooFinance.quote(ticker);
  return results;
};
