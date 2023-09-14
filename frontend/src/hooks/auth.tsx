import { useMemo, useEffect, PropsWithChildren } from 'react'

import { Auth0Provider, AppState, useAuth0 } from '@auth0/auth0-react'
import { useNavigate, redirect, Navigate, Route } from 'react-router-dom'

export function Auth({ children }: PropsWithChildren) {

  const navigate = useNavigate()

  const {
    domain, clientId, redirectionUri
  } = useMemo(() => {
    return {
      domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID as string,
      redirectionUri: import.meta.env.VITE_AUTH0_CALLBACK_URL as string
    }
  }, [])

  const redirectHandler = (state?:AppState) => {
    navigate(state?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectionUri
      }}
      onRedirectCallback={redirectHandler}>
        { children }
    </Auth0Provider>
  )
}

export function Restricted({ children }: PropsWithChildren) {

  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0()

  useEffect(() => {
    console.log(isLoading, isAuthenticated)
    if(!isLoading && !isAuthenticated) loginWithRedirect()
  }, [isLoading, isAuthenticated, error])

  return isLoading ? <>loading...</> : isAuthenticated ? (
    children
  ) : null
}