// src/application/business/create-business-case.ts
import type { BusinessEntity, CreateBusinessDTO } from "../../domain/business/entitys";
import type { BusinessRepository } from "../../interface/repositories/business_repo/business_repo";
import { logger } from "../../shared/userLogs/logger";
import { v4 as uuid } from "uuid";
import { BusinessSchema } from "./validation";
import type { IBusinessRepository } from "../../domain/business/repository";

export class CreateBusinessCase {
  constructor(private businessRepo: IBusinessRepository) {}

  async create(data: CreateBusinessDTO): Promise<BusinessEntity> {
    // 1. Valida os dados do front
    const parsed = BusinessSchema.safeParse(data);

    if (!parsed.success) {
      const formattedErrors = parsed.error.format();
      logger.error("Invalid business data: %o", formattedErrors);
      throw new Error(`Invalid business data: ${JSON.stringify(formattedErrors)}`);
    }

    const dataValid = parsed.data;

    const newBusiness = await this.businessRepo.create(dataValid as BusinessEntity);

    return newBusiness;
  }
}
