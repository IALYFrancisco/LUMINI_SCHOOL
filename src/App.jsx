import './App.css'
import Home from './views/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from './views/login'
import { Register } from './views/register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/authentication/login' element={<Login/>}></Route>
        <Route path='/authentication/register' element={<Register/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
