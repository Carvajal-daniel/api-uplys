import e, { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../interface/repositories/user-repository/user";

const userRepository = new UserRepository();

export const checkIsActive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = (req as any).user?.email;
    if (!email) return res.status(401).json({ message: "Usuário não autenticado" });

    const user = await userRepository.findByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: "Conta inativa. Ative sua conta para acessar." });
    }

    // Usuário ativo → continua
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao validar usuário" });
  }
};
