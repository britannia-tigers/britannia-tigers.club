import { useEffect, useState } from "react"
import { PaymentResponse, getSessionPaymentList } from "../api/payments"
import { useAuthToken } from "./auth";


/**
 * get list of payment according to session
 * @param id 
 * @returns 
 */
export const useSessionPaymentList = (id?:string) => {

  const [list, setList] = useState<PaymentResponse[]>()
  const token = useAuthToken();

  useEffect(() => {

    async function fetch() {
      if(!id || !token) return setList(undefined)
      const s = await getSessionPaymentList(token, id)
      setList(s)
    }

    fetch()
  }, [token, id]);

  return list
} 