import { Box, Layer, Nav } from 'grommet'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useNaviStore } from '../stores/NaviStore';
import { Menu } from 'grommet-icons';
import { Burger } from './Burger';
import { useState } from 'react';
import { Close } from './Close';



/**
 * Navi component
 * @returns 
 */
export function Navi() {

  const { navi: { bgIsDark, textColor } } = useNaviStore();
  const navigate = useNavigate()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <NaviContainer 
      onScroll={e => console.log('me scroll')}
      onTouchMove={e => console.log('me move')}>
        <BrowserView>
          <MainTitle 
            onClick={() => navigate('/')}
            isDark={bgIsDark} 
            color={textColor} >
              Britannia<br/>Tigers<br/>Club
          </MainTitle>
          <NavLinks isDark={bgIsDark} gap='xsmall' color={textColor} direction='column' alignContent='stretch'>
            <Link to='/story'>Story</Link>
            <Link to='/team'>Team</Link>
            {/* <Link to='/session'>Session</Link> */}
            <Link to='/contact'>Contact</Link>
            <Link to='/sponsors'>Sponsors</Link>
          </NavLinks>
         </BrowserView>
         <MobileView>
          <Box direction='row-reverse' pad={{ vertical: '30px', horizontal: '30px' }} margin='none'>
            {isMobileOpen ? (
              <Close
                onTouchEnd={() => setIsMobileOpen(false)}
              />
            ) : (
              <Burger bgIsDark={bgIsDark} 
                onTouchEnd={() => setIsMobileOpen(true)}
              />
            )}
          </Box>
          {isMobileOpen && (
            <Layer
              position="right"
              
              modal
            >
              <NavLinks 
                isDark={bgIsDark} 
                gap='xsmall' 
                color='black' 
                direction='column' 
                alignContent='stretch'>
                <Link to='/' onTouchEnd={() => setIsMobileOpen(false)}>Home</Link>
                <Link to='/story' onTouchEnd={() => setIsMobileOpen(false)}>Story</Link>
                <Link to='/team' onTouchEnd={() => setIsMobileOpen(false)}>Team</Link>
                {/* <Link to='/session'>Session</Link> */}
                <Link to='/contact' onTouchEnd={() => setIsMobileOpen(false)}>Contact</Link>
                <Link to='/sponsors' onTouchEnd={() => setIsMobileOpen(false)}>Sponsors</Link>
              </NavLinks>
            </Layer>
          )}
         </MobileView>
      </NaviContainer>
  )
}

const NaviContainer = styled.header`
  left: ${isMobile ? 'auto' : '30px'};
  right: ${isMobile ? '0px' : 'auto'};
  top: ${isMobile ? '0px' : '40px'};
  position: fixed;
  z-index: 99;
`

const NavLinks = styled(Nav)<IMainTitle>`
  margin: 0;
  text-align: ${isMobile ? 'right' : 'left'};
  padding-left: 5px;
  padding-top: ${isMobile ? '120px' : 0};
  padding-right: ${isMobile ? '30px' : 0};

  a {
    font-size: ${isMobile ? '36px' : 'inherit'};
    line-height: 1em;
    padding: 0;
    color: ${props => props.color};
    text-decoration: none;
    text-transform: uppercase;
    font-family: "din-2014", sans-serif;
    font-weight: 600;
    font-style: normal;

    &:visited {
      color: ${props => props.color};
    }

    &:hover {
      text-decoration: underline;
    }
  }
`

interface IMainTitle {
  isDark: boolean
  color: string

}

export const MainTitle = styled.h1<IMainTitle>`
  cursor: pointer;
  margin: 0;
  padding: 0 0 30px 0;
  text-transform: uppercase;
  line-height: 1em;
  font-size: 64px;
  color: ${props => props.color};
  transition: color 0.25s ease-in-out;
`;