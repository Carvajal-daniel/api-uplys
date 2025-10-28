// src/domain/business/entitys.ts
export interface BusinessEntity {
  id: string;
  userId: string;
  name: string;
  niche: string;
  description?: string;
  operatingYears?: string;
  location?: string; 
  amenities?: string;
  services?: string;
  socialPlatforms?: string;
  businessHours?: string;
  avgServicePrice?: string;
  postingFrequency: string;
  revenue?: string;
  expenses?: string;
  employees?: string;
  createdAt: Date;
}

export interface CreateBusinessDTO {
  userId: string;
  name: string;
  niche: string;
  postingFrequency: "1x por semana" | "2x por semana" | "3x por semana" | "Diariamente" | "Casualmente";
  description?: string;
  operatingYears?: "menos de 1 ano" | "1-3 anos" | "+3 anos";
  location?: object;
  amenities?: object;
  services?: string[];
  socialPlatforms?: string[];
  businessHours?: { day: string; open: string; close: string }[];
  revenue?: number;
  expenses?: number;
  avgServicePrice?: number;
  employees?: number;
  usesSocialMedia?: boolean;
  challenges?: string;
  reportFrequency?: string;
  capacity?: number;
  delivery?: boolean;
  ownerExperienceYears?: number;
}
