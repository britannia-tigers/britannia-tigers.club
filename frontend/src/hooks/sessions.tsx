import { useEffect, useState } from "react";
import { SessionResponse } from "../api/api.interface";
import { ApiSessionGetQuery, addSelfToSession, getSessionById, getSessions } from "../api/sessions";


export const useBookSession = () => async (authToken:string, id:string) => {
  return addSelfToSession(authToken, id);
}

export function useSession(id?:string) {
  const [session, setSession] = useState<SessionResponse>()

  useEffect(() => {

    async function fetch() { 
      if(!id) return setSession(undefined);     
      const s = await getSessionById(id)
      setSession(s);
    }

    fetch()
  }, [id]);

  return session

}

export function useSessions({ startDate, endDate, date, ...restProps }:ApiSessionGetQuery) {

  const [sessions, setSessions] = useState([] as SessionResponse[])

  useEffect(() => {
    async function fetch() {
      const d = await getSessions({ startDate, endDate, date, ...restProps })
      setSessions(d)
    }

    fetch()
  }, [startDate, endDate, date])

  return sessions
}