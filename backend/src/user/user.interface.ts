
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

export enum UserRoles {
  member = 'member',
  editor = 'editor',
  admin = 'admin'
}

export type UserRoleType = keyof typeof UserRoles

export type UserRoleTypeId = {
  [key in UserRoles]: string
}

export type UserCreateUpdateRequest = Omit<User, 'app_metadata'>
