import { Request, Response } from "express";
import { logger } from "../../../shared/userLogs/logger";
import { businessCaseInjection } from "../../../infra/di/business";

export const createBusinessController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    // ✅ Pega o userId do token autenticado
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    // ✅ Adiciona userId ao corpo antes da validação
    const dataWithUserId = { ...data, userId };

    const newBusiness = await businessCaseInjection.create(dataWithUserId);

    return res
      .status(201)
      .json({ message: "Negócio criado com sucesso", newBusiness });
  } catch (error) {
    logger.error("Erro ao criar negócio: %o", error);
    return res.status(500).json({ message: "Erro ao criar negócio" });
  }
};
