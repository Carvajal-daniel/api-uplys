import type { IUserRepository } from "../../domain/user/user-repository";
import type { ITokebService } from "../../domain/user/services/ITokenService";
import type { CreateUserDTO, UserProps } from "../../domain/user/user-entities";
import { ValidateUser } from "./valitadion";
import type { BcryptService } from "../../infra/user/bcrypt/BcryptService";


export type UserResponse = Omit<UserProps, 'password'>;

export class CreateUserApp {
  constructor(
    private userRepo: IUserRepository,
    private jwtService: ITokebService,
    private bcryptService: BcryptService
  ) {}

  // 💡 Ajuste no tipo de retorno para garantir a segurança
  async create(data: CreateUserDTO): Promise<{ user: UserResponse; token: string }> {
    // validação com Zod
    const validation = ValidateUser.safeParse(data);
    if (!validation.success) {
      throw new Error(JSON.stringify(validation.error.format()));
    }

    const validData = validation.data;

    // 1. Geração do hash da senha
    const hashedPassword = await this.bcryptService.hash(validData.password);

    // 2. Criação do objeto completo para salvar no banco
    const userToSave: UserProps = { ...validData, password: hashedPassword };
    
    // 3. Chamada ao repositório para inserção.
    const user = await this.userRepo.create(userToSave);

    // 4. Geração do Token JWT (usa o objeto completo do banco)
    const token = this.jwtService.generate({ userId: user.id, email: user.email });

    // 5. Omissão da Senha para Retorno
    const { password, ...userWithoutPassword } = user;
    
    // 6. Retorno ao cliente
    return { 
      user: userWithoutPassword as UserResponse,
      token 
    };
  }

}