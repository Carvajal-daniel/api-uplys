import { z } from "zod";

export const validateBusiness = z.object({
  name: z.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  niche: z.string()
    .min(3, "O nicho deve ter pelo menos 3 caracteres")
    .max(50, "O nicho deve ter no máximo 50 caracteres"),
  location: z.string()
    .min(3, "A localização deve ter pelo menos 3 caracteres")
    .max(50, "A localização deve ter no máximo 50 caracteres"),
  userId: z.string().uuid(),
  revenue: z.number().optional(),
  expenses: z.number().optional(),
  avgServicePrice: z.number().optional(),
  services: z.array(z.string()).optional(),
  employees: z.number().optional(),
  hours: z.string().optional(),
  usesSocialMedia: z.boolean().optional(),
  socialPlatforms: z.array(z.string()).optional(),
  challenges: z.string().optional(),
  reportFrequency: z.enum(["weekly", "monthly"]).optional(),
});
