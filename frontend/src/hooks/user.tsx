import { useEffect, useState } from "react"
import { UserInfo, getAllUsers } from "../api/users"
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