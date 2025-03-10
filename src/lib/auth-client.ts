import { createAuthClient } from "better-auth/react";
import { BASE_URL } from "./settings";
import {
  passkeyClient,
  usernameClient,
  adminClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [passkeyClient(), usernameClient(), adminClient()],
});
