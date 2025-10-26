// src/domain/business/entitys.ts

export interface Location {
  cep?: string;
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface Amenities {
  airConditioning?: boolean;
  coffee?: boolean;
  water?: boolean;
  wifi?: boolean;
  parking?: boolean;
}

export interface BusinessHour {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  open: string;  // Ex: "09:00"
  close: string; // Ex: "18:00"
}

export interface BusinessProps {
  userId: string;
  name: string;
  niche: string;
  description?: string;
  operatingYears?: "menos de 1 ano" | "1-3 anos" | "+3 anos";
  location?: Location;
  amenities?: Amenities;
  services?: string[];
  socialPlatforms?: string[];
  businessHours?: BusinessHour[];
  postingFrequency?: string;
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

export interface BusinessEntity extends BusinessProps {
  id: string;
  createdAt: Date;
}
