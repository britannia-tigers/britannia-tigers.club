import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { Auth, Restricted } from './hooks/auth'
import { Callback } from './pages/Callback'
import { Main } from './pages/Main'
import { Profile } from './pages/Profile'
import { Calendar } from './pages/Calendar'

function App() {

  return (
    <>
      <Router>
        <Auth>
          <Routes>
            <Route path='/calendar' element={<Restricted><Calendar /></Restricted>} />
            <Route path='/profile' element={<Restricted><Profile /></Restricted>} />
            <Route path='/callback' element={<Callback />} />
            <Route index element={<Main />} />
          </Routes>
        </Auth>
      </Router>
    </>
  )
}

export default App
