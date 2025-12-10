import './App.css'
import Home from './views/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from './views/login'
import { Register } from './views/register'
import { FormationsPage } from './views/formationPage'
import Dashboard from './views/dashboard'
import Formations from './components/dashboard/formations/formations'
import Inscriptions from './components/dashboard/inscriptions/inscriptions'
import Articles from './components/dashboard/articles/index'
import ArticlesList from './components/dashboard/articles/article-list'
import CreateArticle from './components/dashboard/articles/create-article'
import AddFormation from './components/dashboard/formations/addFormations'
import FormationsList from './components/dashboard/formations/formations-list'
import IsAuthenticated from './components/isAuthenticated'
import Registrations from './views/registrations'
import IsNotAuthenticated from './components/isNotAuthenticated'
import IsAdminOrSuperuser from './components/isAdminOrSuperuser'
import UpdateFormation from './components/dashboard/formations/updateFormation'
import UpdateArticle from './components/dashboard/articles/update-article'
import { ArticlesPage } from './views/articlePage'
import UsersList from './components/dashboard/users/user-list'
import Users from './components/dashboard/users'
import IsSuperuser from './components/isSuperuser'
import Settings from './components/dashboard/settings'
import ArticleView from './views/articleView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/authentication/login' element={<IsNotAuthenticated><Login/></IsNotAuthenticated>}></Route>
        <Route path='/authentication/register' element={<IsNotAuthenticated><Register/></IsNotAuthenticated>}></Route>
        <Route path='/formations' element={<FormationsPage/>}></Route>
        <Route path='/registrations/formation/:id' element={<IsAuthenticated><Registrations/></IsAuthenticated>}></Route>
        <Route path='/articles' element={ <ArticlesPage/> }></Route>
        <Route path='/article/:id' element={<ArticleView/>}></Route>
        <Route path='/dashboard' element={<IsAuthenticated><IsAdminOrSuperuser><Dashboard/></IsAdminOrSuperuser></IsAuthenticated>}>
          <Route path='' element={<Formations/>}>
            <Route path='' element={<FormationsList/>} />
            <Route path="formation/create" element={<AddFormation/>} />
            <Route path="formation/update/:id" element={<UpdateFormation/>} />
          </Route>
          <Route path='articles' element={<Articles/>}>
            <Route path='' element={<ArticlesList/>}/>
            <Route path='create' element={<CreateArticle/>}/>
            <Route path='update/:id' element={<UpdateArticle/>}/>
          </Route>
          <Route path='inscriptions' element={<Inscriptions/>}/>
          <Route path='users' element={ <IsSuperuser><Users/></IsSuperuser>}>
            <Route path='' element={<UsersList/>} />
          </Route>
          <Route path='settings' element={<Settings/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App