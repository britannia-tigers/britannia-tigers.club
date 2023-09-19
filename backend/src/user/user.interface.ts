
export interface AppMetaData {
  team: boolean
  lastPaymentDate?: string
  paid: boolean
}

export interface User {
  email: string
  name: string
  password: string
  phone_number: string
  app_metadata?: AppMetaData
}

export type UserCreateUpdateRequest = Omit<User, 'app_metadata'>
