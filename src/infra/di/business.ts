// src/infra/di/business.ts
import { CreateBusinessCase } from "../../application/business_case/create_business";
import { BusinessRepository } from "../../interface/repositories/business_repo/business_repo";
import { UserRepository } from "../../interface/repositories/user-repository/user";
// Cria as instâncias dos repositórios
const businessRepository = new BusinessRepository();
const userRepository = new UserRepository();

// Injeta ambos no caso de uso
export const businessCaseInjection = new CreateBusinessCase(
  businessRepository,
  userRepository
);
