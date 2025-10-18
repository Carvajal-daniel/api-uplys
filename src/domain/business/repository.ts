import type { BusinessEntity } from "./entitys";


export interface IBusinessRepository {
  create(data: Omit<BusinessEntity, "id" | "createdAt" | "updatedAt">): Promise<BusinessEntity>;
  findById(id: string): Promise<BusinessEntity | null>;
  findByUser(userId: string): Promise<BusinessEntity[]>;
  update(id: string, data: Partial<Omit<BusinessEntity, "id" | "createdAt" | "userId">>): Promise<BusinessEntity | null>;
  delete(id: string): Promise<void>;
}
