import { useEffect, useState } from "react"
import { PublicUserInfo, UserInfo, getAllUsers, getSelf, getSelfRoles, getUser } from "../api/users"
import { useAuthToken } from "./auth"


export function useUserList() {

  const [userList, setUserList] = useState<UserInfo[] | undefined>()
  const token = useAuthToken()

  useEffect(() => {
    async function fetch() {
      const users = await getAllUsers()
      setUserList(users)
    }

    fetch()
  }, [token])

  return userList
}

export function useUser(id?: string) {
  const [user, setUser] = useState<PublicUserInfo | undefined>();
  useEffect(() => {
    if(!id) return setUser(undefined);
    (async () => {
      const data = await getUser(id);
      setUser(data);
    })();
  }, [id])

  return user;

}