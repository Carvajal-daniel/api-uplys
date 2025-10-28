import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const businesses = pgTable("businesses", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  niche: text("niche").notNull(),
  description: text("description"),
  operatingYears: text("operating_years"),
  location: jsonb("location"), 
  amenities: jsonb("amenities"),
  services: jsonb("services"),
  socialPlatforms: jsonb("social_platforms"),
  businessHours: jsonb("business_hours"),
  postingFrequency: text("posting_frequency"), 
  revenue: text("revenue"),
  expenses: text("expenses"),
  avgServicePrice: text("avg_service_price"),
  employees: text("employees"),
  usesSocialMedia: boolean("uses_social_media"),
  challenges: text("challenges"),
  reportFrequency: text("report_frequency"),
  capacity: text("capacity"),
  delivery: boolean("delivery"),
  ownerExperienceYears: text("owner_experience_years"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

