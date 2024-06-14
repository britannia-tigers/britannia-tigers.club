import { UserInfoResponse } from 'auth0'
import { AppMetaData, UserMetaData } from 'src/user/user.interface'

export type Auth0WebhookTypes = 'user.postRegistration'

export class CheckoutWebhookDto {
  userId:string
  sessionId:string
}



export class UserRegistrationDto {
  type: Auth0WebhookTypes
  user: {
    user_id: string
    email: string
    tenant: string,
    app_metadata: AppMetaData,
    user_metadata: UserMetaData,
    email_verified: boolean,
    phone_verified: boolean
    
  }
}