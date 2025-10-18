import { JwtPayload } from 'jsonwebtoken';
export interface ITokenService {
  generate(payload: JwtPayload): string;
  verify(token: string): JwtPayload | null;
}
