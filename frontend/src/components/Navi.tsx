import { Nav } from 'grommet'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { useNaviStore } from '../stores/NaviStore';


export function Navi() {

  const { navi: { bgIsDark, textColor } } = useNaviStore();


  return (
    <NaviContainer>
      <MainTitle isDark={bgIsDark} color={textColor} >Britannia<br/>Tigers<br/>Club</MainTitle>
      <NavLinks isDark={bgIsDark} gap='xsmall' color={textColor} direction='column' alignContent='stretch'>
        <Link to='/'>Story</Link>
        <Link to='/'>Team</Link>
        <Link to='/'>Session</Link>
        <Link to='/'>Contact</Link>
      </NavLinks>
    </NaviContainer>
  )
}

const NaviContainer = styled.header`
  left: 0;
  top: 0;
  position: fixed;
  z-index: 99;
`

const NavLinks = styled(Nav)<IMainTitle>`
  margin: 0;
  padding: 0 35px;

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
  margin: 0;
  padding: 40px 30px 30px 30px;
  text-transform: uppercase;
  line-height: 1em;
  font-size: 64px;
  color: ${props => props.color};
  transition: color 0.25s ease-in-out;
`;