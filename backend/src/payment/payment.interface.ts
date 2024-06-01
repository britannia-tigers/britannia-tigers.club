import { GetUsers200Response } from "auth0";

export type UnixTimestamp = number;
export type PaymentStatus = '';
export enum CheckoutSession {
  COMPLETED = 'checkout.session.completed'
}

export interface SessionMetaData {
  userId: string
  sessionId: string
}


export interface PaymentCheckoutEventObject<T = SessionMetaData> {
  id: string
  object: "checkout.session"
  amount_subtotal: number
  amount_total: number
  created: UnixTimestamp
  currency: "gbp"
  customer_details: {
    address: {
      city: string
      country: string
      line1: string
      line2: string | null
      postal_code: string
      state: string | null
    },
    "email": "henryyp.ho@gmail.com",
    "name": "Y P Ho"
  }
  customer_email: string | null
  livemode: boolean
  metadata: T
  mode: "payment"
  payment_intent: string
  payment_link: string | null
  payment_method_types: string[]
  payment_status: string
  phone_number_collection: {
    enabled: boolean
  },
  user?: GetUsers200Response
}