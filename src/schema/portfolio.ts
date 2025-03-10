import { sql } from "drizzle-orm";
import {
  numeric,
  pgPolicy,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { userRole } from "./role";

export const savedPortfolios = pgTable(
  "saved_portfolios",
  {
    id: text("uuid")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    portfolioName: text("portfolio_name").notNull(),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  () => [
    pgPolicy("user_policy", {
      as: "permissive",
      to: userRole,
      for: "all",
      using: sql`user_id = current_setting('request.jwt.claims.user_id')`,
    }),
  ],
).enableRLS();

export const portfolioStocks = pgTable(
  "portfolio_stocks",
  {
    id: text("uuid")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    portfolioId: text("portfolio_id").references(() => savedPortfolios.id, {
      onDelete: "cascade",
    }),
    ticker: text("ticker").notNull(),
    weight: numeric("weight").notNull(),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  () => [
    pgPolicy("user_policy", {
      as: "permissive",
      to: userRole,
      for: "all",
      using: sql`user_id = current_setting('request.jwt.claims.user_id')`,
    }),
  ],
).enableRLS();
