import type { ITokenService } from "../../domain/user/services/ITokenService";

import type { LoginDTO, UserProps } from "../../domain/user/user-entities";
import type { IUserRepository } from "../../domain/user/user-repository";
import type { BcryptService } from "../../infra/user/bcrypt/BcryptService";
import { logger } from "../../shared/userLogs/logger";
import { ValidateLogin } from "./valitadion";

export interface LoginResponse {
  user: Omit<UserProps, "password">;
  token: string;
}

export class LoginApp {
  constructor(
    private userRepo: IUserRepository,
    private jwtService: ITokenService,
    private bcryptService: BcryptService
  ) {}

  async login(data: LoginDTO): Promise<LoginResponse> {
    
    const result = ValidateLogin.safeParse(data);
    if (!result.success) {
      logger.error("Invalid data: %o", result.error.format());
      throw new Error("Invalid data");
    }

    const { email, password } = result.data;

    const user = await this.userRepo.findByEmail(email);
    if (!user) {
  logger.error("User not found: %s", email);
  throw new Error("USER_NOT_FOUND");
}

    const isValidPassword = await this.bcryptService.compare(password, user.password);
    if (!isValidPassword) {
      logger.error("Invalid password for user: %s", email);
  throw new Error("INVALID_PASSWORD");
    }

    const token = this.jwtService.generate({
      sub: user.id,
      email: user.email,
    });

  const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
