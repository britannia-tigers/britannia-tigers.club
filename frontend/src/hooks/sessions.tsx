import { useEffect, useState } from "react";
import { UserSessionResponse } from "../api/api.interface";
import { ApiSessionGetQuery, addSelfToSession, getSessionById, getSessions, removeSelfFromSession } from "../api/sessions";
import { useAuth0 } from "@auth0/auth0-react";


export const useBookSession = () => async (authToken:string, id:string) => {
  return addSelfToSession(authToken, id);
}

export const useCancelSession = () => async(authToken:string, id:string) => {
  return removeSelfFromSession(authToken, id);
}

export function useSession(id?:string) {
  const [session, setSession] = useState<UserSessionResponse>()
  const { isAuthenticated, isLoading, user} = useAuth0();

  useEffect(() => {

    async function fetch() { 
      if(!id) return setSession(undefined);     
      const s = await getSessionById(id)
      const booked = !!s.participants?.find(x => x === user?.sub)
      const paid = !!s.paidParticipants?.find(x => x === user?.sub)
      setSession({...s, booked, paid});
    }

    fetch()
  }, [id, isAuthenticated, isLoading, user]);

  return session

}

export function useSessions({ startDate, endDate, date, ...restProps }:ApiSessionGetQuery) {

  const [sessions, setSessions] = useState([] as UserSessionResponse[])
  const { isAuthenticated, isLoading, user} = useAuth0();

  useEffect(() => {
    if(isLoading) return

    async function fetch() {
      const d = await getSessions({ startDate, endDate, date, ...restProps })
      const outD = d.map(s => {
        const booked = !!s.participants?.find(x => x === user?.sub)
        const paid = !!s.paidParticipants?.find(y => y === user?.sub)
        
        return { ...s, booked, paid}
      })
      setSessions(outD)
    }

    fetch()
  }, [startDate, endDate, date, isAuthenticated, user, isLoading])

  return sessions
}