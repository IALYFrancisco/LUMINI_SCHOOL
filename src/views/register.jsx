/* eslint-disable no-unused-vars */
import Nav from "../components/nav"
import '../../public/styles/login.css'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useForm } from "react-hook-form"

export function Register(){
    var { reset, register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const _handleSubmit = async (data) => {
        try{
            const user = {
                name: data.name,
                email: data.email,
                password: data.password
            }

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/authentication/register`, user )
                .then((res)=>{
                    navigate('/authentication/login')
                    reset()
                })
                .catch((err)=> console.log(err))
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <Nav></Nav>
            <section className="login-form">
                <h2>Création de compte</h2>
                <h5>à LUMINI School</h5>
                <form onSubmit={handleSubmit(_handleSubmit)}>
                    <img src="/images/note.png" alt="" className="laptop-mouse" />
                    <img src="/images/clavier (2).png" alt="" className="mouse" />
                    <div className="element">
                        <label>Votre nom complet :</label>
                        <input type="text" placeholder="Ex: John Doe" { ...register('name', { required: true }) }/>
                    </div>
                    <div className="element">
                        <label>Votre adresse email :</label>
                        <input type="email" placeholder="Ex: johndoe@example.com" { ...register('email', { required: true }) }/>
                    </div>
                    <div className="element">
                        <label>Votre mot de passe :</label>
                        <input type="password" placeholder="Choisissez un mot de passe sécurisé" { ...register('password', { required: true }) }/>
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