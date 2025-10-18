import { Request, Response, NextFunction } from "express";
import { JwtService } from "../user/auth/JwtService";

// Tipagem do payload do JWT
interface MyJwtPayload {
  id: string;
  email?: string;
  sub?: string; // caso o token use sub
}

const jwtService = new JwtService();

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Acesso negado" });

  const decoded = jwtService.verify(token) as MyJwtPayload | null;
  if (!decoded) return res.status(403).json({ message: "Token inválido" });

  // Mapeia sub → id se necessário
  const userId = decoded.id || decoded.sub;
  if (!userId) return res.status(403).json({ message: "Token inválido: id ausente" });

  // ✅ Atribui ao req.user
  (req as any).user = {
    id: userId,
    email: decoded.email,
  };

  next();
};
