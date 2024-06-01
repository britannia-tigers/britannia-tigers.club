import { useAuth0 } from '@auth0/auth0-react'
import { Header, Nav , Avatar, Box, Button, ResponsiveContext } from 'grommet'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useNaviStore } from '../stores/NaviStore';
import { useCallback, useContext } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

interface UserProps {
  showInMobileView?: boolean
  notFixed?: boolean
}

export function User({ showInMobileView, notFixed }: UserProps) {

  // const windowSize = useContext(ResponsiveContext)

  const { pathname } = useLocation();
  const { navi: { bgIsDark, textColor } } = useNaviStore();
  const navigate = useNavigate()
  const { isLoading, isAuthenticated, user, loginWithRedirect } = useAuth0()

  const loginHandler = useCallback(() => {
    loginWithRedirect({
      authorizationParams: {
        scope: [
          'openid',
          'profile',
          'email',  
          'list:sessions',
          'list:pages',
          'read:pages',
          'read:self',
          'read:sessions',
          'write:self'
        ].join(' ')
      },
      appState: {
        returnTo: pathname
      }
    })
  }, [pathname]);

  const signupHandler = useCallback(() => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        scope: [
          'openid',
          'profile',
          'email'
        ].join(' ')
      },
      appState: {
        returnTo: '/profile'
      }
    })
  }, [pathname])

  return isLoading ? (
    <></>
  ) : (
    <UserContainer 
      isNotFixed={notFixed}
      bgIsDark={bgIsDark}
      textColor={textColor}>
      <BrowserView style={{ padding: '0 50px' }}>
        { isAuthenticated ? (
          <Avatar 
            src={user?.picture} 
            background="light-1" 
            onClick={() => isAuthenticated && navigate('/profile')}/>
        ) : (
          <UserButtonContainer>
            {/* <h4 onClick={signupHandler}>Become a Member</h4> */}
            <Button onClick={loginHandler} size='small' primary label='Login'/>
          </UserButtonContainer>
        )}
      </BrowserView>
      {showInMobileView && (
        <MobileView>
          { isAuthenticated ? (
            <Avatar 
              src={user?.picture} 
              background="light-1" 
              onClick={() => isAuthenticated && navigate('/profile')}/>
          ) : (
            <UserButtonContainer>
              {/* <h4 onClick={signupHandler}>Become a Member</h4> */}
              <Button onClick={loginHandler} size='small' primary label='Login'/>
            </UserButtonContainer>
          )}
        </MobileView>
      )}
    </UserContainer>
  )
}

const UserButtonContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: end;
  justify-content: end;
  padding-top: 10px;
`

interface UserContainerProps {
  bgIsDark: boolean
  textColor: string
  isNotFixed?: boolean
}

const UserContainer = styled.div<UserContainerProps>`
  position: ${props => props.isNotFixed ? 'relative' : 'fixed'};
  padding: 30px 0;
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