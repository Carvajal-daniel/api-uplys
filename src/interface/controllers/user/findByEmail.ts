import type { Request, Response } from "express";
import { loginUserUseCase } from "../../../infra/di/container";
import type { LoginDTO } from "../../../domain/user/user-entities";

const PRODUCTION_DOMAIN_ROOT = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || "https://www.uplys.com.br";
const COOKIE_DOMAIN = process.env.NODE_ENV === "production" ? PRODUCTION_DOMAIN_ROOT : "localhost";

export const loginController = async (req: Request, res: Response) => {
  try {
    const loginData = req.body as LoginDTO;
    const { email, password } = loginData;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    const { user, token } = await loginUserUseCase.login(loginData);

    // ⚡️ Cookie seguro para cross-site
    res.cookie("token", token, {
      httpOnly: true,
      domain: COOKIE_DOMAIN,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res.status(200).json({
      message: "Login bem-sucedido",
      user,
    });
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") return res.status(401).json({ message: "Email não encontrado" });
    if (error.message === "INVALID_PASSWORD") return res.status(401).json({ message: "Senha incorreta" });

    console.error("Erro interno no login:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
