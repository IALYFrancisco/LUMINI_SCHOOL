import Nav from "../components/nav"
import '../../public/styles/login.css'
import { Link } from "react-router-dom"

export function Register(){
    return(
        <>
            <Nav></Nav>
            <section className="login-form">
                <h2>Création de compte</h2>
                <h5>à LUMINI School</h5>
                <form action="">
                    <img src="/images/note.png" alt="" className="laptop-mouse" />
                    <img src="/images/clavier (2).png" alt="" className="mouse" />
                    <div className="element">
                        <label htmlFor="">Votre nom complet :</label>
                        <input type="text" name="" placeholder="Ex: John Doe"/>
                    </div>
                    <div className="element">
                        <label htmlFor="">Votre adresse email :</label>
                        <input type="email" name="" placeholder="Ex: johndoe@example.com"/>
                    </div>
                    <div className="element">
                        <label htmlFor="">Votre mot de passe :</label>
                        <input type="password" name="" placeholder="Le mot de passe que vous avez choisi"/>
                    </div>
                    <div className="element">
                        <button>Soumettre</button>
                    </div>
                </form>
                <span>
                    <p>Vous avez déjà un compte? <Link to="/authentication/login">Se connecter</Link>.</p>
                </span>
            </section>
        </>
    )
}