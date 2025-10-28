import './App.css'
import Home from './views/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from './views/login'
import { Register } from './views/register'
import Dashboard from './views/dashboard'
import Settings from './components/dashboard/settings'
import Formations from './components/dashboard/formations'
import Inscriptions from './components/dashboard/inscriptions'
import Articles from './components/dashboard/articles'
import Users from './components/dashboard/users'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/authentication/login' element={<Login/>}></Route>
        <Route path='/authentication/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route index element={<Formations/>}/>
          <Route path='articles' element={<Articles/>}/>
          <Route path='inscriptions' element={<Inscriptions/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='settings' element={<Settings/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App