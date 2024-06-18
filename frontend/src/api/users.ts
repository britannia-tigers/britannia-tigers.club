import axios, { AxiosResponse } from "axios"

export type UserType = 'admin' | 'editor' | 'member' | 'team'

export interface AppMetaData {
  isPaid: boolean
  type: UserType[]
}

type PositionType = 'PG' | 'SG' | 'PF' | 'SF' | 'C'

export interface UserStats {
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

export interface UserInfo<P = AppMetaData, T = UserMetaData> {
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

export interface UserRole {
  id: string
  name: string
  description: string
}

export interface PublicUserInfo<T = UserMetaData> {
  name: string
  user_id: string
  picture?: string
  user_metadata: T
}

export interface UserRequest extends UserInfo<UserMetaData> {

}

interface CloudinaryResponse {
  created_at: string
  user_id: string
  picture: string
  name: string
}

export async function getAllUsers() {
  const users = await axios.get<UserInfo[]>(`/api/user`)
  return users.data;
}

export async function getUser(id: string) {
  const {data} = await axios.get<AxiosResponse<PublicUserInfo>>(`/api/user/${id}/public`)
  return data.data;
}

export async function getSelf(token: string) {
  const { data } = await axios.get<UserInfo>(`/api/user/self`, {
    headers: {
      Authorization: `bearer ${token}`
    }
  })
  return data;
}

export async function getSelfRoles(token: string) {
  const { data } = await axios.get<AxiosResponse<UserRole[]>>(`/api/user/self/roles`, {
    headers: {
      Authorization: `bearer ${token}`
    }
  })
  return data.data;

}

export async function updateUserSelf(authToken:string, userId:string, payload:UserRequest) {

}

export async function updateUserPic(authToken: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post<AxiosResponse<CloudinaryResponse>>(
      `/api/user/self/avatar/upload`,
      formData,
      {
        headers: {
          'Authorization': `bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return res?.data?.data;
}