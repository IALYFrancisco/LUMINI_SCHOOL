import { useParams } from "react-router-dom"
import Nav from "../components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import '../../public/styles/registrations.css'
import { useAuth } from "../contexts/AuthContext"

export default function Registrations(){

    const { user } = useAuth()
    var [formation, setFormation] = useState(null)
    var [loading, setLoading] = useState(true)
    var { id } = useParams()

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get?_id=${id}`)
        .then((response)=>setFormation(response.data))
        .catch(()=>setFormation(null))
        .finally(()=>setLoading(false))
    }, [id])

    if(loading) return(<p>Chargement ...</p>)
    if(!loading) return(
        <>
            <Nav></Nav>
            { formation &&
                <section className="registrations-container">
                    { formation.map( f =>
                        <>
                            <h2>Inscription à la formation <span className="title">"{f.title}"</span></h2>
                            <p>Veuillez soumettre votre inscription pour que vous soyez inscrit à cette formation 📖 .</p>
                            <form action="">
                                <div>
                                    <fieldset disabled="disabled">
                                        <legend><h3>A propos de la formation</h3></legend>
                                        <div className="element">
                                            <label htmlFor="">Titre de la formation :</label>
                                            <input type="text" name="" id="" value={f.title} />
                                        </div>
                                        <div className="element">
                                            <label htmlFor="">Les prérequis de la formation :</label>
                                            <input type="text" name="" id="" value={f.prerequisites} />
                                        </div>
                                        <div className="element">
                                            <label htmlFor="">Déscription de la formation :</label>
                                            <textarea name="" id="" value={f.description}></textarea>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend><h3>Vos informations personnelles</h3></legend>
                                        <div className="element">
                                            <label htmlFor="">Votre nom :</label>
                                            <input type="text" name="" id="" value={user.name} disabled />
                                        </div>
                                        <div className="element">
                                            <label htmlFor="">Votre email :</label>
                                            <input type="email" name="" id="" value={user.email} disabled />
                                        </div>
                                        <div className="element">
                                            <label htmlFor="">Votre numéro téléphone :</label>
                                            <input type="tel" name="" id="" value={user.phoneNumber} placeholder="ex: 030 00 000 00"/>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="element">
                                    <button>Soumettre l'inscription</button>
                                </div>
                            </form>
                        </>
                    ) }
                </section>
            }
        </>
    )
}