import Nav from "../components/nav"
import '../../public/styles/notFound.css'
import { Link } from "react-router-dom"

export function NotFound(){
    return(<>
        <Nav/>
        <section className="not-found-container">
            <div>
                <h1>404</h1>
                <h2>Page introuvable</h2>
                <Link to="/">
                    <button>Retour à l'accueil</button>
                </Link>
            </div>
        </section>
    </>)
}