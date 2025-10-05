import { GetCurrentUserUseCase } from "../../application/user/getCurrentUserUseCase";
import { CreateUserApp } from "../../application/user/use-case";
import { LoginApp } from "../../application/user/user-login";
import { UserRepository } from "../../interface/repositories/user-repository/user";
import { JwtService } from "../user/auth/JwtService";
import { BcryptService } from "../user/bcrypt/BcryptService";

//create User
const userReository =  new UserRepository();
const jwtService = new JwtService();
const bcryptService = new BcryptService();

export const createUserUseeCase = new CreateUserApp (userReository, jwtService, bcryptService);

export const loginUserUseCase = new LoginApp(userReository, jwtService, bcryptService);

export const getCurrentUserUseCase = new GetCurrentUserUseCase(userReository);