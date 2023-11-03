import axios, { AxiosResponse } from "axios";

interface PaymentRequest {
  userId: string
  priceId: string
  quantity?: number
}

interface PaymentResponse {
  metadata: {
    sessionId: string
    userId: string
  },
  status: string
  url: string
  amount_total: number
}

/**
 * get a session by id
 * @param id 
 * @returns 
 */
export async function createSessionPayment(sessionId:string, userId:string, priceId:string) {
  const response = await axios.post<PaymentRequest, AxiosResponse<PaymentResponse>>(`/api/payments/session/${sessionId}`, {
    userId, priceId
  });
  return response.data;
}