// src/infra/user/auth/JwtService.ts

import * as jwt from "jsonwebtoken";



type MyJwtPayload = {
  id: string;
  email?: string;
  userId?: string;
};

declare module 'express' { 
  export interface Request {
    user?: MyJwtPayload; 
  }
}


export class JwtService {
  private secret = process.env.JWT_SECRET || "default_secret";

  generate(payload: MyJwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verify(token: string): MyJwtPayload | null {
    try {
      return jwt.verify(token, this.secret) as MyJwtPayload;
    } catch {
      return null;
    }
  }
}