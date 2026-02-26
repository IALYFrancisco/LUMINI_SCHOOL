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
import Payments from './components/dashboard/paiements'
import { NotFound } from './views/notFound'
import { useHead, useSeoMeta } from '@unhead/react'
import SEOUpdate from './components/dashboard/articles/seo-update'

function App() {

  useHead({
    meta: [
      { name: 'robots', content: 'index, follow' }
    ]
  })

  useSeoMeta({

    ogSiteName: 'LUMINI School',
    ogLocale: 'fr_MG',
    ogType: 'website',
    ogImage: 'https://raw.githubusercontent.com/IALYFrancisco/ASSETS/refs/heads/main/LUMINI%20School/IMAGES/lumini-school-logo.png',
    
    twitterCard: 'summary_large_image',
    twitterImage: 'https://raw.githubusercontent.com/IALYFrancisco/ASSETS/refs/heads/main/LUMINI%20School/IMAGES/lumini-school-logo.png'

  })

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/authentication/login' element={<IsNotAuthenticated><Login/></IsNotAuthenticated>}></Route>
        <Route path='/authentication/register' element={<IsNotAuthenticated><Register/></IsNotAuthenticated>}></Route>
        <Route path='/formations' element={<FormationsPage/>}></Route>
        <Route path='/registrations/formation/:id' element={<IsAuthenticated><Registrations/></IsAuthenticated>}></Route>
        <Route path='/articles' element={ <ArticlesPage/> }></Route>
        <Route path='/article/:slug' element={<ArticleView/>}></Route>
        <Route path='/dashboard' element={<IsAuthenticated><Dashboard/></IsAuthenticated>}>
          <Route path='' element={ <IsAdminOrSuperuser><Formations/></IsAdminOrSuperuser>}>
            <Route path='' element={<FormationsList/>} />
            <Route path="formation/create" element={<AddFormation/>} />
            <Route path="formation/update/:id" element={<UpdateFormation/>} />
          </Route>
          <Route path='articles' element={ <IsAdminOrSuperuser><Articles/></IsAdminOrSuperuser> }>
            <Route path='' element={<ArticlesList/>}/>
            <Route path='create' element={<CreateArticle/>}/>
            <Route path='update/:id' element={<UpdateArticle/>}/>
            <Route path='update/:id/seo' element={<SEOUpdate/>}/>
          </Route>
          <Route path='inscriptions' element={<Inscriptions/>}/>
          <Route path='users' element={ <IsSuperuser><Users/></IsSuperuser>}>
            <Route path='' element={<UsersList/>} />
          </Route>
          <Route path='settings' element={<Settings/>}/>
          <Route path='payments/:userId/:formationId' element={<Payments/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </Router>
  )
}

export default App