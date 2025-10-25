import { Link } from "react-router-dom"

function Nav(){
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
                </ul>
            </nav>
        </div>
    )
}

export default Nav