import { useAuth0 } from '@auth0/auth0-react'
import { Header, Nav , Avatar, Box, Button } from 'grommet'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useNaviStore } from '../stores/NaviStore';
import { useCallback } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';


export function User() {

  const { pathname } = useLocation();
  const { navi: { bgIsDark, textColor } } = useNaviStore();
  const navigate = useNavigate()
  const { isAuthenticated, user, loginWithRedirect } = useAuth0()

  const loginHandler = useCallback(() => {
    loginWithRedirect({
      appState: {
        returnTo: pathname
      }
    })
  }, [pathname]);

  const signupHandler = useCallback(() => {
    loginWithRedirect({
      appState: {
        returnTo: '/profile'
      }
    })
  }, [pathname])

  return (
    <UserContainer 
      bgIsDark={bgIsDark}
      textColor={textColor}>
      <BrowserView>
        { isAuthenticated ? (
          <Avatar 
            src={user?.picture} 
            background="light-1" 
            onClick={() => isAuthenticated && navigate('/profile')}/>
        ) : (
          <UserButtonContainer>
            <h4 onClick={signupHandler}>Become a Member</h4>
            <Button onClick={loginHandler} size='small' primary label='Login'/>
          </UserButtonContainer>
        )}
      </BrowserView>
      <MobileView>
        
      </MobileView>
    </UserContainer>
  )
}

const UserButtonContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`

interface UserContainerProps {
  bgIsDark: boolean
  textColor: string
}

const UserContainer = styled.div<UserContainerProps>`
  position: fixed;
  padding: 40px 30px 30px 30px;
  right: 0;
  top: 0;
  z-index: 99;
  transition: color 0.25s ease-in-out;
  color: ${props => props.textColor};
  text-transform: uppercase;

  h4 {
    margin: 0;
    padding: 0;
    padding-right: 12px;
    font-size: 12px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;