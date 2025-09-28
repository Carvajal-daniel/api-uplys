import type { UserProps as User } from "./user-entities";

export interface IUserRepository {
   create(userData: User): Promise<User>;
}