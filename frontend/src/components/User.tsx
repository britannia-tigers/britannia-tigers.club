import { useAuth0 } from '@auth0/auth0-react'
import { Header, Nav , Avatar, Box } from 'grommet'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'


export function User() {

  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth0()

  return (
    <>
    { isAuthenticated ? (
        <UserContainer>
          <Avatar src={user?.picture} background="light-1" onClick={() => navigate('/profile')}/>
        </UserContainer>
      ) : <></> }
    </>
  )
}

const UserContainer = styled.div`
  position: sticky;
  right: 0;
  top: 0;
`;