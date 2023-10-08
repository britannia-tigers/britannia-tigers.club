import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.scss'
import { Auth, Restricted } from './hooks/auth'
import { Callback } from './pages/Callback'
import { Main } from './pages/Main'
import { Profile } from './pages/Profile'
import { Calendar } from './pages/Calendar'
import { Grommet, Page } from 'grommet'
import { theme } from './configs/theme'
import { Logout } from './pages/Logout'

function App() {

  return (
    <Grommet full theme={theme}>
      <Page>
        <Router>
          <Auth>
            <Routes>
              <Route path='/calendar' element={<Restricted><Calendar /></Restricted>} />
              <Route path='/profile' element={<Restricted><Profile /></Restricted>} />
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
