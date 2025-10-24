import Nav from "../components/nav"
import '../../public/styles/login.css'

export function Login(){
    return(
        <>
            <Nav></Nav>
            <section className="login-form">
                <h2>Connexion</h2>
                <h5>à LUMINI School</h5>
                <form action="">
                    <img src="/images/fleur.png" alt="" className="laptop-mouse" />
                    <img src="/images/coffee-laptop.png" alt="" className="mouse" />
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
                    <p>Pas de compte? En créer un.</p>
                </span>
            </section>
        </>
    )
}