import { Nav } from 'grommet'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useNaviStore } from '../stores/NaviStore';


export function Navi() {

  const { navi: { bgIsDark, textColor } } = useNaviStore();
  const navigate = useNavigate()

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
          
         </MobileView>
      </NaviContainer>
  )
}

const NaviContainer = styled.header`
  left: 30px;
  top: 40px;
  position: fixed;
  z-index: 99;
`

const NavLinks = styled(Nav)<IMainTitle>`
  margin: 0;
  padding-left: 5px;

  a {
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