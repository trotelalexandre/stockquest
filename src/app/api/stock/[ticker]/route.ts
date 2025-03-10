import { auth } from "@/lib/auth";
import { getStockData } from "@/utils/getStockData";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export type YahooStock = Awaited<ReturnType<typeof yahooFinance.quote>>;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ticker: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect("/login");
  }

  const { ticker } = await params;

  try {
    const results = await getStockData(ticker);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
