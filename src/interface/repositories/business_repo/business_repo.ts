// src/interface/repositories/business_repo/business_repo.ts
import { v4 as uuid } from "uuid";
import { db } from "../../../infra/db/schema/connection";
import { businesses } from "../../../infra/db/schema/business";
import { eq } from "drizzle-orm";
import type { BusinessProps, BusinessEntity } from "../../../domain/business/entitys";

function normalizeBusinessData(data: BusinessProps) {
  return {
    id: uuid(),
    userId: data.userId,
    name: data.name,
    niche: data.niche,
    description: data.description ?? null,
    operatingYears: data.operatingYears ?? null,
    location: JSON.stringify(data.location ?? {}),
    amenities: JSON.stringify(data.amenities ?? {}),
    services: JSON.stringify(data.services ?? []),
    socialPlatforms: JSON.stringify(data.socialPlatforms ?? []),
    businessHours: JSON.stringify(data.businessHours ?? []),
    revenue: data.revenue?.toString() ?? null,
    expenses: data.expenses?.toString() ?? null,
    avgServicePrice: (data.avgServicePrice ?? 0).toString(),
    employees: data.employees?.toString() ?? null,
    postingFrequency: data.postingFrequency ?? "Casualmente",
    createdAt: new Date(),
  };
}

function parseBusinessEntity(b: any): BusinessEntity {
  return {
    ...b,
    revenue: b.revenue ? Number(b.revenue) : undefined,
    expenses: b.expenses ? Number(b.expenses) : undefined,
    avgServicePrice: b.avgServicePrice ? Number(b.avgServicePrice) : undefined,
    employees: b.employees ? Number(b.employees) : undefined,
    location: typeof b.location === "string" ? JSON.parse(b.location) : {},
    amenities: typeof b.amenities === "string" ? JSON.parse(b.amenities) : {},
    services: typeof b.services === "string" ? JSON.parse(b.services) : [],
    socialPlatforms: typeof b.socialPlatforms === "string" ? JSON.parse(b.socialPlatforms) : [],
    businessHours: typeof b.businessHours === "string" ? JSON.parse(b.businessHours) : [],
  };
}

export class BusinessRepository {
  async create(data: BusinessProps): Promise<BusinessEntity> {
    const newData = normalizeBusinessData(data);

    const [newBusiness] = await db.insert(businesses).values(newData).returning();

    return parseBusinessEntity(newBusiness);
  }

  async findByUserId(userId: string): Promise<BusinessEntity[]> {
    const result = await db.select().from(businesses).where(eq(businesses.userId, userId));
    return result.map(parseBusinessEntity);
  }
}
