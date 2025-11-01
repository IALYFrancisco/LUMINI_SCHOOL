/* eslint-disable no-unused-vars */
import Nav from "../components/nav"
import '../../public/styles/login.css'
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"

export function Register(){

    var [ register, handleSubmit ] = useForm()
    var [ name, setUserFullName ] = useState()
    var [ email, setUserEmail ] = useState()
    var [ password, setUserPassword ] = useState()

    const onSubmit = async (data) => {
        try{
            const user = new FormData()
            user.append("name", data.name)
            user.append("email", data.email)
            user.append("password", data.password)

            console.log(user)

            await axios.post(`http://localhost:3000/authentication/register`, user )
                .then(()=>{
                    
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <img src="/images/note.png" alt="" className="laptop-mouse" />
                    <img src="/images/clavier (2).png" alt="" className="mouse" />
                    <div className="element">
                        <label htmlFor="">Votre nom complet :</label>
                        <input { ...register("name", {required: true}) } type="text" name="" placeholder="Ex: John Doe"/>
                    </div>
                    <div className="element">
                        <label htmlFor="">Votre adresse email :</label>
                        <input { ...register("email", {required: true}) } type="email" name="" placeholder="Ex: johndoe@example.com"/>
                    </div>
                    <div className="element">
                        <label htmlFor="">Votre mot de passe :</label>
                        <input { ...register("password", {required: true}) } type="password" name="" placeholder="Le mot de passe que vous avez choisi"/>
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