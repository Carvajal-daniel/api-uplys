
import type { IBusinessRepository } from "../../../domain/business/repository";
import type { BusinessEntity, BusinessProps } from "../../../domain/business/entitys";
import { businessTable } from "../../../infra/db/schema";
import { db } from "../../../infra/db/schema/connection";
import { eq } from "drizzle-orm";
import { logger } from "../../../shared/userLogs/logger";

export class BusinessRepository implements IBusinessRepository {
  async create(
    data: BusinessProps): Promise<BusinessEntity> {
    try {
      const [newBusiness] = await db.insert(businessTable).values(data).returning();
      return newBusiness as BusinessEntity;
    } catch (error: any) {
      logger.error("Error creating business: %o", { error, data });
      throw error;
    }
  }

  async findById(id: string): Promise<BusinessEntity | null> {
    try {
      const [business] = await db.select().from(businessTable).where(eq(businessTable.id, id)).limit(1);
      return business ? (business as BusinessEntity) : null;
    } catch (error) {
      logger.error("Error finding business by ID: %s", id);
      throw error;
    }
  }

  async findByUser(userId: string): Promise<BusinessEntity[]> {
    try {
      const businessUser = await db.select().from(businessTable).where(eq(businessTable.userId, userId));
      return businessUser as BusinessEntity[];
    } catch (error) {
      logger.error("Error finding business by user ID: %s", userId);
      throw error;
    }
  }

  async update(
    id: string,
    data: BusinessProps): Promise<BusinessEntity | null> {
    try {
      const [updatedBusiness] = await db.update(businessTable).set(data).where(eq(businessTable.id, id)).returning();
      return updatedBusiness ? (updatedBusiness as BusinessEntity) : null;
    } catch (error) {
      logger.error("Error updating business: %s", id);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.delete(businessTable).where(eq(businessTable.id, id));
    } catch (error) {
      logger.error("Error deleting business: %s", id);
      throw error;
    }
  }
}
