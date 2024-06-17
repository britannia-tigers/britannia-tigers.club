import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.scss'
import { Auth, Restricted } from './hooks/auth'
import { Callback } from './pages/Callback'
import { Main } from './pages/Main'
import { Profile } from './pages/Profile'
import { Grommet, Page, ThemeType } from 'grommet'
import { theme } from './configs/theme'
import { Logout } from './pages/Logout'
import { Helmet } from 'react-helmet';
import { Session } from './pages/Session'
import { Booking } from './pages/Booking'
import { Admin } from './pages/Admin'
import { AdminSession } from './pages/AdminSession'
import { Sponsor } from './pages/Sponsor'
import { ToastContainer } from 'react-toastify'
import { isMobile } from "react-device-detect";
import { Highlight } from './pages/Highlight'
import { PublicProfile } from './pages/PublicProfile'


function App() {

  return (
    <Grommet full theme={theme}>
      <Helmet titleTemplate="London Tigers Club :: %s">
        <meta charSet="utf-8" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="organization" />
        <meta property="og:description" content="We are a community basketball club based in Hackney, East London" />
        <link rel="canonical" href="https://london-tigers.club/" />
        <meta property="og:url" content="https://london-tigers.club/" />
        <meta property="og:site_name" content="London Tigers Club :: A community basketball club" />
        <meta property='og-image' content='https://images.london-tigers.club/og_image.png' />
      </Helmet>
      <Page>
        <Router>
          <Auth>
            <Routes>
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/session/:sessionId' element={<AdminSession />} />

              <Route path='/profile' element={<Restricted><Profile /></Restricted>} />
              <Route path='/team/:id' element={<PublicProfile />} />
              {/* <Route path='/session' element={<Session />} />
              <Route path='/session/:sessionId' element={<Booking />} /> */}
              <Route path='/callback' element={<Callback />} />
              <Route path='/logout' element={<Logout />} />
              <Route index element={<Main />} />
              <Route path='/sponsor/:id' element={<Sponsor />} />
              <Route path='/highlights' element={<Highlight />} />
              <Route path='*' element={<Main />} />
            </Routes>
          </Auth>
        </Router>
      </Page>
      <ToastContainer
          position={isMobile ? "top-center": "top-right"}
          closeButton={false}
          hideProgressBar={true}
          closeOnClick
          />
    </Grommet>
  )
}

export default App
