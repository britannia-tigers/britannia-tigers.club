import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.scss'
import { Auth, Restricted } from './hooks/auth'
import { Callback } from './pages/Callback'
import { Main } from './pages/Main'
import { Profile } from './pages/Profile'
import { Grommet, Page, ThemeType } from 'grommet'
import { theme } from './configs/theme'
import { Logout } from './pages/Logout'
import { Session } from './pages/Session'
import { Booking } from './pages/Booking'

function App() {

  return (
    <Grommet full theme={theme}>
      <Page>
        <Router>
          <Auth>
            <Routes>
              <Route path='/profile' element={<Restricted><Profile /></Restricted>} />
              <Route path='/session' element={<Session />} />
              <Route path='/session/:sessionId' element={<Booking />} />
              <Route path='/callback' element={<Callback />} />
              <Route path='/logout' element={<Logout />} />
              <Route index element={<Main />} />
              <Route path='*' element={<Main />} />
            </Routes>
          </Auth>
        </Router>
      </Page>
    </Grommet>
  )
}

export default App
