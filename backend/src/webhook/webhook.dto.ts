import { UserInfoResponse } from 'auth0'

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
    app_metadata: {},
    user_metadata: {},
    email_verified: boolean,
    phone_verified: boolean
    
  }
}