import { useAuth0 } from '@auth0/auth0-react'
import { Header, Nav , Anchor, Avatar, Box } from 'grommet'
import { Link, useNavigate } from 'react-router-dom'

export function Navi() {

  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth0()

  return (
    <Header background="dark-1" pad="small">
      <Nav direction='row' alignContent='stretch'>
        <Link to='/'>Home</Link>
      </Nav>
      { isAuthenticated ? (
        <Box 
          direction="row" 
          align="right" 
          gap="small">
          <Avatar src={user?.picture} background="light-1" onClick={() => navigate('/profile')}/>
        </Box>
      ) : <></> }
    </Header>
  )
}