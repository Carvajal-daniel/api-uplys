// src/infra/db/schema/business.ts
import { pgTable, text, uuid, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";

export const businesses = pgTable("businesses", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  niche: text("niche").notNull(),
  description: text("description"),
  operatingYears: text("operating_years"),
  location: jsonb("location").notNull(),
  amenities: jsonb("amenities"),
  services: jsonb("services").notNull(),
  socialPlatforms: jsonb("social_platforms"),
  businessHours: jsonb("business_hours").notNull(),
  revenue: numeric("revenue"),
  expenses: numeric("expenses"),
  avgServicePrice: numeric("avg_service_price").notNull(),
  employees: numeric("employees"),
  postingFrequency: text("posting_frequency").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
