import { Request, Response } from "express";
import { createUserUseeCase } from "../../../infra/di/container";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { user, token } = await createUserUseeCase.create(req.body);
    res.status(201).json({ message: "Usuário criado com sucesso", user, token });
  } catch (error: any) {
    res.status(400).json({
      message: "Erro ao criar usuário",
      error: error.message || error,
    });
  }
};
