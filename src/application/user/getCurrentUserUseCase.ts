import type { IUserRepository } from "../../domain/user/user-repository";
import { logger } from "../../shared/userLogs/logger";
import { ValidateEmail, ValidateUser } from "./valitadion";

export class GetCurrentUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      logger.error("User not found for email: %s", email);
      throw new Error("USER_NOT_FOUND");
    }


    const validate = ValidateEmail.safeParse(user);

    if (!validate.success) {
      logger.error("Invalid user data: %o", validate.error.format());
      throw new Error("Invalid data");
    }

    return {
      name: validate.data.name,
      email: validate.data.email,
    };
  }
}
