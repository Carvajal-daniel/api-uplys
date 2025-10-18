export interface BusinessEntity {
  id: string
  userId: string
  name:string
  niche: string
  location: string


  revenue?: number
  expenses?: number
  avgServicePrice?: number

  services?: string[]
  employees?: number
  hours?: string
  usesSocialMedia?: boolean
  socialPlatforms?: string[]
  challenges?: string
  reportFrequency?: string

  createdAt?: Date
  updatedAt?: Date
}

export type BusinessProps = Omit<BusinessEntity, "id" | "createdAt" | "updatedAt">