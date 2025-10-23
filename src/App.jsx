import './App.css'
import Home from './views/home'
import Nav from './components/nav'
import Footer from './components/footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  )
}

export default App
