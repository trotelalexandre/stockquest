import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { passkey } from "better-auth/plugins/passkey";
import { BASE_URL } from "./settings";

const dev = process.env.NODE_ENV === "development";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    passkey({
      rpID: dev ? "localhost" : "stockquest.app",
      rpName: "StockQuest",
      origin: BASE_URL,
    }),
  ],
});
