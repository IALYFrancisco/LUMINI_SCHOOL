import './App.css'
import Home from './views/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from './views/login'
import { Register } from './views/register'
import Dashboard from './views/dashboard'
import Settings from './components/dashboard/settings'
import Formations from './components/dashboard/formations/formations'
import Inscriptions from './components/dashboard/inscriptions'
import Articles from './components/dashboard/articles'
import Users from './components/dashboard/users'
import Blog from './views/blog'
import AddFormation from './components/dashboard/formations/addFormations'
import FormationsList from './components/dashboard/formations/formations-list'
import ProtectedRoute from './components/protected-route'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/blog' element={<Blog/>}></Route>
        <Route path='/authentication/login' element={<Login/>}></Route>
        <Route path='/authentication/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
          <Route path='' element={<Formations/>}>
            <Route path='' element={<FormationsList/>} />
            <Route path="formation/create" element={<AddFormation/>} />
          </Route>
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