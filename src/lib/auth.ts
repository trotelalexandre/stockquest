import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { passkey } from "better-auth/plugins/passkey";
import {
  BASE_URL,
  IS_DEV,
  MAXIMUM_USERNAME_LENGTH,
  MINIMUM_USERNAME_LENGTH,
} from "./settings";
import { username, admin } from "better-auth/plugins";

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
      rpID: IS_DEV ? "localhost" : "stockquest.app",
      rpName: "StockQuest",
      origin: BASE_URL,
    }),
    username({
      minUsernameLength: MINIMUM_USERNAME_LENGTH,
      maxUsernameLength: MAXIMUM_USERNAME_LENGTH,
    }),
    admin(),
  ],
});
