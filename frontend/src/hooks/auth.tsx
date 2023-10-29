import { useMemo, useEffect, PropsWithChildren, useState } from 'react'

import { Auth0Provider, AppState, useAuth0 } from '@auth0/auth0-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { setLocalStore } from '../stores/LocalStore'

export function Auth({ children }: PropsWithChildren) {

  const navigate = useNavigate()

  const {
    audience, domain, clientId, redirectionUri
  } = useMemo(() => {
    return {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
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
        audience: audience,
        redirect_uri: window.location.origin + redirectionUri,
        scope: [
          'openid',
          'profile',
          'email',  
          'list:sessions'
        ].join(' ')
      }}
      onRedirectCallback={redirectHandler}>
        { children }
    </Auth0Provider>
  )
}

export function Restricted({ children }: PropsWithChildren) {

  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0()

  const location = useLocation()
  setLocalStore('pathname', location.pathname)

  useEffect(() => {
    console.log(isLoading, isAuthenticated)
    if(!isLoading && !isAuthenticated) loginWithRedirect()
  }, [isLoading, isAuthenticated, error])

  return isLoading ? <>loading...</> : isAuthenticated ? (
    children
  ) : null
}

export function useAuthToken() {
  const { getAccessTokenSilently } = useAuth0();
  const [authToken, setAuthToken] = useState<string>()

  useEffect(() => {
    async function fetch() {
      const token = await getAccessTokenSilently();
      setAuthToken(token);
    }

    fetch();
  }, [])

  return authToken;
}