import { pgRole } from "drizzle-orm/pg-core";

export const userRole = pgRole("user");
export const adminRole = pgRole("admin", {
  inherit: true,
  createRole: true,
  createDb: true,
});
