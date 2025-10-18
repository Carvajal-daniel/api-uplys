import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, real, jsonb, integer } from "drizzle-orm/pg-core";
import { userTable } from "./users";

export const businessTable = pgTable("business", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),

  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  niche: text("niche").notNull(),
  location: text("location").notNull(),

  revenue: real("revenue"),
  expenses: real("expenses"),
  avgServicePrice: real("avg_service_price"),

  services: jsonb("services").$type<string[]>(),
  employees: integer("employees"),
  hours: text("hours"),
  usesSocialMedia: boolean("uses_social_media").default(false),
  socialPlatforms: jsonb("social_platforms").$type<string[]>(),
  challenges: text("challenges"),
  reportFrequency: text("report_frequency"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
