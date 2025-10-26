import type { BusinessEntity } from "../../domain/business/entitys";
import type { BusinessRepository } from "../../interface/repositories/business_repo/business_repo";
import { logger } from "../../shared/userLogs/logger";
import { BusinessSchema } from "./validation";
import { v4 as uuid } from "uuid";

export class CreateBusinessCase {
  constructor(private businessRepo: BusinessRepository) {}

  async create(data: any): Promise<BusinessEntity> {
    // Valida os dados recebidos
    const parsed = BusinessSchema.safeParse(data);

    if (!parsed.success) {
      const formattedErrors = parsed.error.format();
      logger.error("Invalid business data: %o", formattedErrors);
      throw new Error(
        `Invalid business data: ${JSON.stringify(formattedErrors)}`
      );
    }

    // Adiciona id e createdAt antes de enviar para o repositório
    const businessToSave = {
      ...parsed.data,
      id: uuid(),
      createdAt: new Date(),
    };

    // Cria o negócio no banco
    const newBusiness = await this.businessRepo.create(businessToSave);
    return newBusiness;
  }
}
