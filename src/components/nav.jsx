import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from 'axios'

function Nav(){

    const { user, setUser } = useAuth()

    const handleClick = () => {
        const element = document.querySelector('.mobile-menu')
        element.classList.toggle('opened')
    }

    const Logout = () => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/authentication/logout`, {}, {withCredentials: true})
        .then(()=>{
            setUser(null)
        }).catch(()=>{
            window.alert('Erreur de déconnexion')
        })
    }

    return(
        <div className="nav-container">
            <nav>
                <ul>
                    <li className="logo">
                        <Link to="/">LUMINI School</Link>
                    </li>
                    <li>
                        <ul>
                            <li>
                                <Link to="/">Accueil</Link>
                            </li>
                            <li>
                                <Link to="/formations">Formations</Link>
                            </li>
                            <li>Articles</li>
                        </ul>
                    </li>
                    <li>
                        { !user &&
                            <ul>
                                <li>
                                    <Link to="/authentication/login">
                                        <button>Se connecter</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/authentication/register">
                                        <button>Créer un compte</button>
                                    </Link>
                                </li> 
                            </ul>
                        }{
                            user && (user.status === 'superuser' || user.status === 'admin') &&
                            <ul>
                                <li>
                                    <Link to="/dashboard">
                                        <button>Dashboard</button>
                                    </Link>
                                </li> 
                            </ul>
                        }{
                            (user && user.status === 'user') &&
                            <ul>
                                <li>
                                    <button onClick={Logout}>Se déconnecter</button>    
                                </li> 
                            </ul>
                        }
                    </li>
                    <li className="menu" onClick={handleClick}>
                        <img src="/images/menu.png" alt="" />
                    </li>
                </ul>
            </nav>
            <div className="mobile-menu" onClick={handleClick}>
                <ul>
                    <li onClick={handleClick}>
                        <Link  onClick={handleClick} to="/">Accueil</Link>
                    </li>
                    <li onClick={handleClick}>
                        <Link  onClick={handleClick} to="/formations">Formations</Link>
                    </li>
                    <li>Articles</li>
                    { !user && <>
                        <li onClick={handleClick}>
                            <Link  onClick={handleClick} to="/authentication/login">Se connecter</Link>
                        </li>
                        <li onClick={handleClick}>
                            <Link  onClick={handleClick} to="/authentication/register">Créer un compte</Link>
                        </li>
                    </> }
                    { (user && user.status === 'user') && <>
                        <li onClick={Logout}>
                            Se déconnecter
                        </li>
                    </> }
                    { user && (user.status === 'superuser' || user.status === 'admin') && <>
                        <li onClick={handleClick}>
                            <Link  onClick={handleClick} to="/dashboard">Dashboard</Link>
                        </li>
                    </> }
                </ul>
            </div>
        </div>
    )
}

export default Nav