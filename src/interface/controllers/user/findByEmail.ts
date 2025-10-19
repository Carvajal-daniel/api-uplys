import type { Request, Response } from "express";
import { loginUserUseCase } from "../../../infra/di/container";
import type { LoginDTO } from "../../../domain/user/user-entities";

// 🛑 VARIÁVEL DE AMBIENTE: Você deve definir NEXT_PUBLIC_FRONTEND_DOMAIN no Render.
// Ex: Se o seu frontend é 'https://www.uplys.com.br', o domínio raiz é '.uplys.com.br'
const PRODUCTION_DOMAIN_ROOT = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || '.uplys.com.br';
const COOKIE_DOMAIN = process.env.NODE_ENV === 'production' ? PRODUCTION_DOMAIN_ROOT : 'localhost';

export const loginController = async (req: Request, res: Response) => {
  try {
    const loginData = req.body as LoginDTO;
    const { email, password } = loginData;

    if (!email || !password) {
      return res.status(400).json({
        message: "El email y la contraseña son requeridos.",
      });
    }

    const { user, token } = await loginUserUseCase.login(loginData);

    // ⭐️ CORREÇÃO: Adicionando 'domain' e corrigindo 'sameSite' para 'None' em produção ⭐️
    res.cookie("token", token, {
      httpOnly: true,
      
      // 1. Define o domínio raiz para compartilhamento (CRUCIAL EM PRODUÇÃO)
      domain: COOKIE_DOMAIN, 
      
      // 2. OBRIGATÓRIO: 'Secure: true' em produção (HTTPS)
      secure: process.env.NODE_ENV === "production",
      
      // 3. ESSENCIAL: 'None' permite o envio do cookie para serviços separados (Render/Frontend)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    // ✅ Retorna apenas os dados do usuário (sem o token)
    return res.status(200).json({
      message: "Login bem-sucedido",
      user,
    });
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(401).json({ message: "Email não encontrado" });
    }
    if (error.message === "INVALID_PASSWORD") {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // 🛑 É uma boa prática logar o erro interno completo aqui
    console.error("Erro interno no login:", error); 
    
    return res
      .status(500)
      .json({ message: "Ocorreu um erro interno do servidor" });
  }
};