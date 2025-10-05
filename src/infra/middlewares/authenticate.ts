import { Request, Response, NextFunction } from "express";
import { JwtService } from "../user/auth/JwtService";

const jwtService = new JwtService();

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; 

  if (!token) return res.status(401).json({ message: "Acesso negado" });

  const decoded = jwtService.verify(token);
  if (!decoded) return res.status(403).json({ message: "Token inválido" });

  (req as any).user = decoded;
  next();
};
