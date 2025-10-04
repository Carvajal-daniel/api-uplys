export interface UserProps {
  id?: string; 
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  emailVerified: boolean  ;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface CreateUserDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export type AuthenticatedUser = Omit<UserProps, 'password'>;