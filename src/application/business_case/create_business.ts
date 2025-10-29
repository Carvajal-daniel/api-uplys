// src/application/business/create-business-case.ts
import type { BusinessEntity, CreateBusinessDTO } from "../../domain/business/entitys";
import { logger } from "../../shared/userLogs/logger";
import { BusinessSchema } from "./validation";
import type { IBusinessRepository } from "../../domain/business/repository";
import type { IUserRepository } from "../../domain/user/user-repository";


export class CreateBusinessCase {
  constructor(private businessRepo: IBusinessRepository,
    private userRepo: IUserRepository
  ) {}
  
  
  async create(data: CreateBusinessDTO, userEmail: string ): Promise<BusinessEntity> {

    const user = await this.userRepo.findByEmail(userEmail);
    if (!user) {
      logger.error("User not found with email: %s", userEmail);
      throw new Error("User not found");
    }

    if(!user.isActive){
      logger.error("Inactive user with email: %s", userEmail);
      throw new Error("Inactive user");
    }

   
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
