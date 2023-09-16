import { Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { getLocalStore } from '../stores/LocalStore'

export function Callback() {

  const pathname = getLocalStore('pathname') || ''
  const { isAuthenticated } = useAuth0();
  console.log(pathname)

  return isAuthenticated ? (
    <Navigate to={pathname !== 'callback' ? pathname : '/'} replace/>
  ) : null
}