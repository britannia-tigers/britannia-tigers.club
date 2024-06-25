import { User } from "@auth0/auth0-react"
import axios, { AxiosResponse } from "axios"

export type UserType = 'admin' | 'editor' | 'member' | 'team'

export interface AppMetaData {
  isPaid: boolean
  type: UserType[]
  teamAvatar?: string
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
  chart?: {
    strength?: number
    stamina?: number
    grit?: number
    strategy?: number
    agility?: number
  }

}

export interface LinkType {
  name: string
  svg?: string
  url: string
}

export interface UserMetaData {
  description: string
  links: LinkType[]
  stats: UserStats
  images: string[]
  videos: string[]
  position: PositionType[]
}

export interface UserInfo<P = AppMetaData, T = Partial<UserMetaData>> extends User {
  name: string
  user_id: string
  email: string
  app_metadata: P
  user_metadata: T
}

export interface UserRole {
  id: string
  name: string
  description: string
}

export interface PublicUserInfo<P = AppMetaData, T = UserMetaData> {
  name: string
  user_id: string
  picture?: string
  user_metadata: T
  app_metadata: P
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

export async function updateSelf(token: string, payload: Partial<UserInfo>) {
  const { data } = await axios.put<AxiosResponse<UserInfo>>(`/api/user/self`, payload, {
    headers: {
      Authorization: `bearer ${token}`
    }
  })

  return data.data;
}

export async function uploadSelImages(token: string, images: FileList) {
  const formData = new FormData();

  let i = 0
  while(i < images.length) {
    const file = images.item(i);
    if(file) formData.append("images", file);
    i++;
  }

  const res = await axios.post(`/api/user/self/assets/upload`, formData, {
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
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