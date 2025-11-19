import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function Nav(){

    const { user } = useAuth()

    const handleClick = () => {
        const element = document.querySelector('.mobile-menu')
        element.classList.toggle('opened')
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
                    <li onClick={handleClick}>
                        <Link  onClick={handleClick} to="/authentication/login">Se connecter</Link>
                    </li>
                    <li onClick={handleClick}>
                        <Link  onClick={handleClick} to="/authentication/register">Créer un compte</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav