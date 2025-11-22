import './App.css'
import Home from './views/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from './views/login'
import { Register } from './views/register'
import { FormationsPage } from './views/formationPage'
import Dashboard from './views/dashboard'
import Settings from './components/dashboard/settings'
import Formations from './components/dashboard/formations/formations'
import Inscriptions from './components/dashboard/inscriptions/inscriptions'
import Articles from './components/dashboard/articles'
import Users from './components/dashboard/users'
import Blog from './views/blog'
import AddFormation from './components/dashboard/formations/addFormations'
import FormationsList from './components/dashboard/formations/formations-list'
import IsAuthenticated from './components/isAuthenticated'
import Registrations from './views/registrations'
import IsNotAuthenticated from './components/isNotAuthenticated'
import IsAdminOrSuperuser from './components/isAdminOrSuperuser'
import UpdateFormation from './components/dashboard/formations/updateFormation'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/blog' element={<Blog/>}></Route>
        <Route path='/authentication/login' element={<IsNotAuthenticated><Login/></IsNotAuthenticated>}></Route>
        <Route path='/authentication/register' element={<IsNotAuthenticated><Register/></IsNotAuthenticated>}></Route>
        <Route path='/formations' element={<FormationsPage/>}></Route>
        <Route path='/registrations/formation/:id' element={<IsAuthenticated><Registrations/></IsAuthenticated>}></Route>
        <Route path='/dashboard' element={<IsAuthenticated><IsAdminOrSuperuser><Dashboard/></IsAdminOrSuperuser></IsAuthenticated>}>
          <Route path='' element={<Formations/>}>
            <Route path='' element={<FormationsList/>} />
            <Route path="formation/create" element={<AddFormation/>} />
            <Route path="formation/update/:id" element={<UpdateFormation/>} />
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