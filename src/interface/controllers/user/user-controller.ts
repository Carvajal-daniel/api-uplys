import { Request, Response } from "express";
import { createUserUseeCase } from "../../../infra/di/container";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { user, token } = await createUserUseeCase.create(req.body);
    res.status(201).json({ message: "Usuário criado com sucesso", user, token });
  } catch (error: any) {
    // Tratar erro de CPF inválido
    if (error.message === "INVALID_CPF") {
      return res.status(400).json({ error: "INVALID_CPF" });
    }

    // Outros erros
    return res.status(400).json({
      error: error.message || "Erro ao criar usuário",
    });
  }
};
