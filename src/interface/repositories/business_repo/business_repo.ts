// src/infra/db/repositories/business.repository.ts
import type { IBusinessRepository } from "../../../domain/business/repository";
import type { BusinessEntity } from "../../../domain/business/entitys";

import { eq } from "drizzle-orm";
import { db } from "../../../infra/db/schema/connection";
import { businesses } from "../../../infra/db/schema";

export class BusinessRepository implements IBusinessRepository {
  async create(data: BusinessEntity): Promise<BusinessEntity> {
    const [newBusiness] = await db.insert(businesses).values(data).returning();
    return newBusiness as BusinessEntity;
  }

  async findById(id: string): Promise<BusinessEntity | null> {
    const [business] = await db.select().from(businesses).where(eq(businesses.id, id));
    return business ? (business as BusinessEntity) : null;
  }

  async findByUser(userId: string): Promise<BusinessEntity[]> {
    const result = await db.select().from(businesses).where(eq(businesses.userId, userId));
    return result as BusinessEntity[];
  }

  async update(id: string, data: Partial<Omit<BusinessEntity, "id" | "createdAt">>): Promise<BusinessEntity | null> {
    const [updated] = await db.update(businesses).set(data).where(eq(businesses.id, id)).returning();
    return updated ? (updated as BusinessEntity) : null;
  }

  async delete(id: string): Promise<void> {
    await db.delete(businesses).where(eq(businesses.id, id));
  }
}
