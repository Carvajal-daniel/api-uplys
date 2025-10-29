import { Request, Response } from "express";
import { logger } from "../../../shared/userLogs/logger";
import { businessCaseInjection } from "../../../infra/di/business";

export const createBusinessController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

   
    const userEmail = (req as any).user?.email;
    if (!userEmail) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }


    const newBusiness = await businessCaseInjection.create(data, userEmail);

    return res.status(201).json({
      message: "Negócio criado com sucesso",
      newBusiness,
    });
  } catch (error: any) {
    logger.error("Erro ao criar negócio: %o", error);
    return res.status(400).json({ message: error.message || "Erro ao criar negócio" });
  }
};
