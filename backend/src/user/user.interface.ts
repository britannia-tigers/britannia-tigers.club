
export interface AppMetaData {
  type: string[]
  lastPaymentDate?: string
  isPaid: boolean
}

export interface UserMetaData {
  description: string
  stats: {
    strength?: number
    stamina?: number
    grit?: number
    strategy?: number
    agility?: number
  }
  images: string[]
  videos: string[]
}

export interface User {
  email: string
  name: string
  password: string
  phone_number: string
  app_metadata?: AppMetaData
  user_metadata?: UserMetaData
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
