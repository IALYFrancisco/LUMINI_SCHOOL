import Nav from "../components/nav"
import '../../public/styles/login.css'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"

export function Login(){

    var { reset, register, handleSubmit } = useForm()

    const navigate = useNavigate()

    var _handleSubmit = async (data) => {
        try{
            const user = {
                email: data.email,
                password: data.password
            }

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/authentication/login`,
                user,
                { withCredentials: true }
            )
            .then(()=>{
                navigate('/')
                reset()
            }).catch((err)=>{
                console.log(err)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <Nav></Nav>
            <section className="login-form">
                <h2>Connexion</h2>
                <h5>à LUMINI School</h5>
                <form onSubmit={handleSubmit(_handleSubmit)}>
                    <img src="/images/fleur.png" alt="" className="laptop-mouse" />
                    <img src="/images/coffee-laptop.png" alt="" className="mouse" />
                    <div className="element">
                        <label htmlFor="">Votre adresse email :</label>
                        <input type="email" name="email" placeholder="Ex: johndoe@example.com" { ...register('email', { required: true }) }/>
                    </div>
                    <div className="element">
                        <label htmlFor="">Votre mot de passe :</label>
                        <input type="password" name="password" placeholder="Le mot de passe que vous avez choisi" { ...register('password', { required: true }) }/>
                    </div>
                    <div className="element">
                        <button>Soumettre</button>
                    </div>
                </form>
                <span>
                    <p>Pas de compte? <Link to="/authentication/register">En créer un</Link>.</p>
                </span>
            </section>
        </>
    )
}