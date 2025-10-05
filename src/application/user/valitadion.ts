import { z } from "zod";

export const ValidateUser = z
  .object({
    name: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .max(50, "O nome deve ter no máximo 50 caracteres"),

    email: z
      .string()
      .email("Email inválido"),

    emailVerified: z
      .boolean()
      . default(false),

    cpf: z
      .string()
      .length(11, "O CPF deve ter exatamente 11 caracteres"),

    phone: z
      .string()
      .min(11, "O telefone deve ter pelo menos 11 caracteres")
      .max(11, "O telefone deve ter no máximo 11 caracteres"),

    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(50, "A senha deve ter no máximo 50 caracteres"),
  });

export type ValidateUserDTO = z.infer<typeof ValidateUser>;
export const ValidateLogin = ValidateUser.pick({ email: true, password: true });

export const ValidateEmail = ValidateUser.pick({ email: true, name: true });

export type ValidateLoginDTO = z.infer<typeof ValidateLogin>;
