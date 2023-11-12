import axios, { AxiosResponse } from "axios";
import { User } from "@auth0/auth0-react";

interface PaymentRequest {
  userId: string
}

interface PaymentCreateRequest extends PaymentRequest {
  priceId: string
  quantity?: number
}



export interface PaymentResponse {
  id: string
  payment_intent: string
  metadata: {
    sessionId: string
    userId: string
  },
  customer_details: {
    email: string
    name: string
    phone?: string
    address: {
      city: string
      country: string
      line1?: string
      line2?: string
      postal_code: string
      state?: string
    }
  }
  livemode: boolean
  created: string
  payment_status: string
  status: string
  url: string
  amount_total: number
  currency: string
  user?: User
}


/**
 * get a session by id
 * @param id 
 * @returns 
 */
export async function createSessionPayment(authToken:string, sessionId:string, userId:string, priceId:string) {
  const response = await axios.post<PaymentCreateRequest, AxiosResponse<PaymentResponse>>(`/api/payments/session/${sessionId}`, {
    userId, priceId
  }, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  });
  return response.data;
}

export async function getSessionPaymentList(authToken:string, sessionId:string, date?: string) {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  const response = await axios.get<PaymentRequest, AxiosResponse<PaymentResponse[]>>(`/api/payments/session/${sessionId}${query}`, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  })
  return response.data;
}