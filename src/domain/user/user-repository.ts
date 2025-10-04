import type { UserProps as User, UserProps } from "./user-entities";

export interface IUserRepository {
   create(userData: User): Promise<User>;
   findByEmail(email: string): Promise<UserProps | null>
}