import { useEffect, useMemo } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from 'grommet'

export function Profile() {

  const { user, logout } = useAuth0()


  const { name, picture, email } = useMemo(() => ({
    ...user
  }), [user])

  return (
    <>
      <div>
        {name} {picture} {email}
      </div>
      <Button onClick={() => logout()}>logout</Button>
    </>
  )
}
