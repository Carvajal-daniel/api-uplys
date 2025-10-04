import type { Request, Response } from "express";
import { loginUserUseCase } from "../../../infra/di/container"; 
import type { LoginDTO } from "../../../domain/user/user-entities";
export const loginController = async (req: Request, res: Response) => {
  try {
    const loginData = req.body as LoginDTO;
    const { email, password } = loginData;

    if (!email || !password) {
        return res.status(400).json({ 
            message: "El email y la contraseña son requeridos." 
        });
    }


    const { user, token } = await loginUserUseCase.login(loginData);

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      user, 
      token,
    });

  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
    return res.status(401).json({ message: "Email não encontrado" });
  }
  if (error.message === "INVALID_PASSWORD") {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  return res.status(500).json({ message: "Ocorreu um erro interno do servidor" });
  }
}