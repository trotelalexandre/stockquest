import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { portfolioStocks, savedPortfolios } from "@/schema";
import { NextResponse } from "next/server";
import { PortfolioMetadata } from "@/lib/types";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect("/login");
  }

  try {
    const data = await db
      .select({
        id: savedPortfolios.id,
        name: savedPortfolios.portfolioName,
        lastUpdated: savedPortfolios.updatedAt,
        stocks: sql`COUNT(${portfolioStocks.id})`.as("stocks"),
      })
      .from(savedPortfolios)
      .leftJoin(
        portfolioStocks,
        eq(savedPortfolios.id, portfolioStocks.portfolioId),
      )
      .where(eq(savedPortfolios.userId, session.user.id))
      .groupBy(savedPortfolios.id)
      .execute();

    const savedPortfoliosData: PortfolioMetadata[] = data.map((portfolio) => ({
      id: portfolio.id,
      name: portfolio.name,
      lastUpdated: portfolio.lastUpdated,
      stocks: Number(portfolio.stocks),
    }));

    return NextResponse.json(savedPortfoliosData);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
