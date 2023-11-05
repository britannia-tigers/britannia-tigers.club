


export interface UserInfo<T> {
  given_name?: string | null
  family_name?: string | null

  phone_number?: string
  readonly email: string
  user_metadata: T

}

export interface UserRequest<T = {}> extends UserInfo<T> {
  phone_verified?: boolean
  email_verified?:boolean

}

export async function updateUserSelf(authToken:string, userId:string, payload:User) {

}