import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.scss'
import { Auth, Restricted } from './hooks/auth'
import { Callback } from './pages/Callback'
import { Main } from './pages/Main'
import { Profile } from './pages/Profile'
import { Calendar } from './pages/Calendar'
import { Grommet, Page, ThemeType } from 'grommet'
import { theme } from './configs/theme'
import { Logout } from './pages/Logout'
import { Helmet } from 'react-helmet';
function App() {

  return (
    <Grommet full theme={theme}>
      <Helmet titleTemplate="Britannia Tigers Club :: %s">
        <meta charSet="utf-8" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="organization" />
        <meta property="og:description" content="We are a community basketball club based in London" />
        <link rel="canonical" href="https://britannia-tigers.club/" />
        <meta property="og:url" content="https://britannia-tigers.club/" />
        <meta property="og:site_name" content="Britannia Tigers Club :: A community basketball club based in London" />
        <meta property='og-image' content='https://images.britannia-tigers.club/og_image.png' />
      </Helmet>
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
