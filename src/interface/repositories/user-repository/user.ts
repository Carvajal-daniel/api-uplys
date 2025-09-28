import { UserProps } from "../../../domain/user/user-entities";
import type { IUserRepository } from "../../../domain/user/user-repository";
import { userTable } from "../../../infra/db/schema";
import { db } from "../../../infra/db";
import { logger } from "../../../shared/userLogs/logger";
import { eq, or } from "drizzle-orm"; // Removido 'and'

export class UserRepository implements IUserRepository {
  async create(userData: UserProps): Promise<UserProps> {
    try {
      // 1. Verifica se já existe usuário com email, cpf OU telefone
      const existing = await db.select()
        .from(userTable)
        .where(
          or(
            eq(userTable.email, userData.email),
            eq(userTable.cpf, userData.cpf),
            eq(userTable.phone, userData.phone) // 🚨 ADICIONADO: Verificação de telefone
          )
        )
        .limit(1) 
        .execute(); // Certifique-se de que .execute() está presente para rodar a query

      if (existing.length > 0) {
        // 2. Lança erros específicos para duplicidade
        
        const existingUser = existing[0];

        if (existingUser.email === userData.email) {
          throw new Error("EMAIL_DUPLICATE: Email já cadastrado"); 
        }
        if (existingUser.cpf === userData.cpf) {
          throw new Error("CPF_DUPLICATE: CPF já cadastrado");
        }
        // 🚨 ADICIONADO: Novo erro para telefone
        if (existingUser.phone === userData.phone) {
          throw new Error("PHONE_DUPLICATE: Telefone já cadastrado");
        }
      }

      // 3. Se não existe, cria normalmente
      const [created] = await db.insert(userTable).values(userData).returning();
      
      return { ...created, password: userData.password }; 

    } catch (error: any) {
      logger.error("Erro ao criar usuário: %o", { error, userData });
      throw error; 
    }
  }
}