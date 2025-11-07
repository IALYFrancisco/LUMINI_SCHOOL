import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function Sidebar(){

    const navigate = useNavigate()

    const handleClick = () => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/authentication/logout`, {}, {withCredentials: true})
            .then(()=>{
                navigate('/authentication/login')
            }).catch(()=>{
                window.alert('Erreur de déconnexion')
            })
    }

    return(
        <aside>
            <ul>
                <li className="logo">
                    <Link to="/">LUMINI School</Link>
                </li>
                <li>
                    <div className="border">
                        <div className="profile-container">
                            <img src="/images/ialy (5).jfif" alt="" />
                        </div>
                    </div>
                    <div className="user-infos">
                        <h5>IALY Francisco</h5>
                        <p title="ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</p>
                    </div>
                </li>
                <li>
                    <ul>
                        <li>
                            <Link to="/dashboard">
                                <img src="/images/formations.png" alt="" />
                                Formations
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/inscriptions">
                                <img src="/images/inscription.png" alt="" />
                                Inscriptions
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/articles">
                                <img src="/images/article.png" alt="" />
                                Articles
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/users">
                                <img src="/images/group.png" alt="" />
                                Utilisateurs
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/settings">
                                <img src="/images/settings.png" alt="" />
                                Paramètres
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="actions" onClick={handleClick}>
                <p>
                    <img src="/images/logout.png" alt="" />
                    Se déconnecter
                </p>
            </div>
        </aside>
    )
}