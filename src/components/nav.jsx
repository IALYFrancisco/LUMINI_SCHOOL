import { NavLink } from "react-router-dom"
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
                        <NavLink to="/">LUMINI School</NavLink>
                    </li>
                    <li>
                        <ul>
                            <li>
                                <NavLink to="/" end className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Accueil</NavLink>
                            </li>
                            <li>
                                <NavLink to="/formations" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Formations</NavLink>
                            </li>
                            <li>
                                <NavLink to="/articles" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Articles</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        { !user &&
                            <ul>
                                <li>
                                    <NavLink to="/authentication/login">
                                        <button>Se connecter</button>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/authentication/register">
                                        <button>Créer un compte</button>
                                    </NavLink>
                                </li> 
                            </ul>
                        }{
                            user &&
                            <ul>
                                <li>
                                    <NavLink to="/dashboard">
                                        <button>Dashboard</button>
                                    </NavLink>
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
                        <NavLink  onClick={handleClick} to="/" end className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Accueil</NavLink>
                    </li>
                    <li onClick={handleClick}>
                        <NavLink  onClick={handleClick} to="/formations" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Formations</NavLink>
                    </li>
                    <li onClick={handleClick}>
                        <NavLink to="/articles" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Articles</NavLink>
                    </li>
                    { !user && <>
                        <li onClick={handleClick}>
                            <NavLink  onClick={handleClick} to="/authentication/login" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Se connecter</NavLink>
                        </li>
                        <li onClick={handleClick}>
                            <NavLink  onClick={handleClick} to="/authentication/register" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Créer un compte</NavLink>
                        </li>
                    </> }
                    { user && <>
                        <li onClick={handleClick}>
                            <NavLink  onClick={handleClick} to="/dashboard" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
                        </li>
                    </> }
                </ul>
            </div>
        </div>
    )
}

export default Nav