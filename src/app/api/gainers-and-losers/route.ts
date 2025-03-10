import { NextResponse } from "next/server";

export async function GET() {
  const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

  const result = await fetch(url)
    .then((res) => res.json())
    .then((data) => data);

  return NextResponse.json(result);
}
