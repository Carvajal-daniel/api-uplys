
import * as jwt from "jsonwebtoken";
import type { ITokebService } from "../../../domain/user/services/ITokenService";

export class JwtService implements ITokebService {
  private secret = process.env.JWT_SECRET || "default_secret";

  generate(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verify(token: string): object | null {
    try {
      return jwt.verify(token, this.secret) as object;
    } catch {
      return null;
    }
  }
}
