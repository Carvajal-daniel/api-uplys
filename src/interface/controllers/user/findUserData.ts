import type { Request, Response } from "express";
import { getCurrentUserUseCase } from "../../../infra/di/container";

export const dashboardController = async (req: Request, res: Response) =>{
 try {
  const email = (req as any).user.email;
  const user = await getCurrentUserUseCase.execute(email); 
   res.json({
      message: "Você está logado!",
      user,
    });
 } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(500).json({ message: "Erro interno" });
  }
}