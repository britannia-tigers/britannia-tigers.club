import { useEffect, useState } from "react"
import { UserInfo, getAllUsers, getSelf } from "../api/users"
import { useAuthToken } from "./auth"


export function useUserList() {

  const [userList, setUserList] = useState<UserInfo[] | undefined>()
  const token = useAuthToken()

  useEffect(() => {
    async function fetch() {
      if(!token) return setUserList(undefined)
      const users = await getAllUsers(token)
      setUserList(users)
    }

    fetch()
  }, [token])

  return userList
}

export function useSelf() {
  const [self, setSelf] = useState<UserInfo | undefined>();
  const token = useAuthToken();

  useEffect(() => {
    (async () => {
      if(!token) return setSelf(undefined);
      const data = await getSelf(token);
      setSelf(data);
    })();
  }, [token])

  return self;
}