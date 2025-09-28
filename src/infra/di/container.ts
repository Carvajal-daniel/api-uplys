import { CreateUserApp } from "../../application/user/use-case";
import { UserRepository } from "../../interface/repositories/user-repository/user";
import { JwtService } from "../user/auth/JwtService";
import { BcryptService } from "../user/bcrypt/BcryptService";

const userReository =  new UserRepository();
const jwtService = new JwtService();
const bcryptService = new BcryptService();

export const createUserUseeCase = new CreateUserApp (userReository, jwtService, bcryptService);