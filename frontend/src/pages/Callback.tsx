import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { getLocalStore } from '../stores/LocalStore'
import { WhitePage } from '../components/WhitePage';
import { InnerContainer, InnerTitle } from '../components/InnerContainer';
import { Button } from 'grommet';

export function Callback() {

  const pathname = getLocalStore('pathname') || ''
  const [searchParams] = useSearchParams()

  const { isAuthenticated } = useAuth0();
  console.log(pathname)

  return isAuthenticated ? (
    <Navigate to={pathname !== 'callback' ? pathname : '/'} replace/>
  ) : <Error searchParams={searchParams}/>
}

interface ErrorProps {
  searchParams: URLSearchParams
}

function Error({ searchParams }: ErrorProps) {

  const { logout } = useAuth0()
  const {  } = useLocation()
  const error = searchParams.get('error')
  const description = searchParams.get('error_description')
  const state = searchParams.get('state')
  
  return (
    <WhitePage bgColor='black' textColor='white' backTo='/'>
      <InnerContainer>
        <InnerTitle>Auth Error...</InnerTitle>
        <h3 style={{ textTransform: 'uppercase' }}>{error?.replace('_', ' ')}</h3>
        <p>{description}</p>
        <Button size='small' primary label='Back to main' onClick={() => logout({ logoutParams: { returnTo: `${window.location.origin}/logout` } })}/>
        <h6>STATE: {state}</h6>
      </InnerContainer>
    </WhitePage>
  )
}