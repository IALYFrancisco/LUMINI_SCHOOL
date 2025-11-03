import { Link } from "react-router-dom"

function Nav(){

    
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
                            <li>Formations</li>
                            <li>Articles</li>
                        </ul>
                    </li>
                    <li>
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
                    <li>Formations</li>
                    <li>Articles</li>
                </ul>
            </div>
        </div>
    )
}

export default Nav