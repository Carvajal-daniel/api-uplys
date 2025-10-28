// src/interface/repositories/business_repo/validation.ts
import { z } from "zod";

export const BusinessSchema = z.object({
  userId: z.string(),
  name: z.string().min(1),
  niche: z.string().min(1),
  description: z.string().optional(),
  operatingYears: z.enum(["menos de 1 ano", "1-3 anos", "+3 anos"]).optional(),
  location: z.object({
    cep: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  amenities: z.object({
    airConditioning: z.boolean().optional(),
    coffee: z.boolean().optional(),
    water: z.boolean().optional(),
    wifi: z.boolean().optional(),
    parking: z.boolean().optional(),
  }).optional(),
  services: z.array(z.string()).optional(),
  socialPlatforms: z.array(z.string()).optional(),
  businessHours: z.array(
    z.object({
      day: z.enum(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]),
      open: z.string(),
      close: z.string(),
    })
  ).optional(),
  postingFrequency: z.enum([
    "1x por semana",
    "2x por semana",
    "3x por semana",
    "Diariamente",
    "Casualmente",
  ]),
  revenue: z.number().optional(),
  expenses: z.number().optional(),
  avgServicePrice: z.number().optional(),
  employees: z.number().optional(),
  usesSocialMedia: z.boolean().optional(),
  challenges: z.string().optional(),
  reportFrequency: z.string().optional(),
  capacity: z.number().optional(),
  delivery: z.boolean().optional(),
  ownerExperienceYears: z.number().optional(),
});

export type CreateBusinessDTO = z.infer<typeof BusinessSchema>;
