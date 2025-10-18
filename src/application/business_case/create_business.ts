import type {
  BusinessEntity,
  BusinessProps,
} from "../../domain/business/entitys";
import type { BusinessRepository } from "../../interface/repositories/business_repo/business_repo";
import { logger } from "../../shared/userLogs/logger";
import { validateBusiness } from "./validation";

export class CreateBusinessCase {
  constructor(private businessRepo: BusinessRepository) {}

  async create(data: BusinessProps): Promise<BusinessEntity> {
    const validate = validateBusiness.safeParse(data);

    if (!validate.success) {
      const formattedErrors = validate.error.format();
      logger.error("Invalid business data: %o", formattedErrors);
      throw new Error(
        `Invalid business data: ${JSON.stringify(formattedErrors)}`
      );
    }

    const newBusiness = await this.businessRepo.create(validate.data);
    return newBusiness;
  }
}
