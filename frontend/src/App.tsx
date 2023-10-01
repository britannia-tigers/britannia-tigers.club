import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.scss'
import { Auth, Restricted } from './hooks/auth'
import { Callback } from './pages/Callback'
import { Main } from './pages/Main'
import { Profile } from './pages/Profile'
import { Calendar } from './pages/Calendar'
import { Navi } from './components/Navi'
import { Grommet, Page } from 'grommet'
import { theme } from './configs/theme'
import { User } from './components/User'

function App() {

  return (
    <Grommet theme={theme}>
      <Page>
        <Router>
          <Auth>
            <Navi />
            <User />
            <Routes>
              <Route path='/calendar' element={<Restricted><Calendar /></Restricted>} />
              <Route path='/profile' element={<Restricted><Profile /></Restricted>} />
              <Route path='/callback' element={<Callback />} />
              <Route index element={<Main />} />
            </Routes>
          </Auth>
        </Router>
      </Page>
    </Grommet>
  )
}

export default App
