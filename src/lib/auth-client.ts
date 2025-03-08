import { createAuthClient } from "better-auth/react";
import { BASE_URL } from "./settings";
import { passkeyClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [passkeyClient()],
});
