import axios from "axios"

export type UserType = 'admin' | 'editor' | 'member' 

export interface UserMetaData {
  isPaid: boolean
  isTeam: boolean
  type: UserType
}

export interface UserInfo<T = UserMetaData> {
  name: string
  given_name?: string | null
  family_name?: string | null
  user_id: string
  phone_number?: string
  readonly phone_verified: boolean
  email: string
  readonly email_verified: boolean
  picture?: string
  user_metadata: T

}

export interface UserRequest extends UserInfo<UserMetaData> {

}

export async function getAllUsers(token: string) {
  const users = await axios.get<UserInfo[]>(`/api/user`)
  return users.data;
}

export async function updateUserSelf(authToken:string, userId:string, payload:UserRequest) {

}