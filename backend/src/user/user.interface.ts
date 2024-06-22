
export enum UserTypeEnum {
  member = 'member',
  team = 'team'
}

export type UserType = keyof typeof UserTypeEnum

export interface AppMetaData {
  type: UserType[]
  lastPaymentDate?: string
  isPaid: boolean
}

export enum PositionTypeEnum {
  PG = 'PG',
  SG = 'SG',
  PF = 'PF',
  SF = 'SF',
  C = 'C'
}

export type PositionType = keyof typeof PositionTypeEnum

export interface MetricType {
  unit: string
  value: number
}

export interface UserStats {
  weight?: MetricType
  height?: MetricType

  position?: PositionType[]
  strength?: number
  stamina?: number
  grit?: number
  strategy?: number
  agility?: number

}

export interface UserMetaData {
  description: string
  stats: UserStats
  images: string[]
  videos: string[]
}

export interface User {
  username: string
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

export interface UserResponse<P = AppMetaData, T = UserMetaData> {
  username: string
  name: string
  given_name?: string | null
  family_name?: string | null
  user_id: string
  phone_number?: string
  readonly phone_verified: boolean
  email: string
  readonly email_verified: boolean
  picture?: string
  app_metadata: P
  user_metadata: T
}

export interface UserPublicResponse<P = Partial<AppMetaData>, T = Partial<UserMetaData>> {
  username: string
  name: string
  user_id: string
  user_metadata: T
  app_metadata: P
  picture: string
}