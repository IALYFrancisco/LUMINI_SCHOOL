import { useNavigate, useParams } from "react-router-dom"
import Nav from "../components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import '../../public/styles/registrations.css'
import { useAuth } from "../contexts/AuthContext"
import { useForm } from "react-hook-form"

export default function Registrations(){

    const navigate = useNavigate()

    const { reset, register, handleSubmit } = useForm()

    const { user, setUser } = useAuth()
    var [formation, setFormation] = useState(null)
    var [loading, setLoading] = useState(true)
    var { id } = useParams()

    var _formation = {
        _id: id
    }

    var _handleSubmit = async (data) => {
        try{
            var dataToSend = {
                formation: _formation,
                userPhoneNumber: data.phoneNumber
            }
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/registration/create`,
                dataToSend,
                { withCredentials: true }
            ).then( async ()=>{
                await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/informations`, {withCredentials: true})
                    .then((response)=> {
                        setUser(response.data)
                        console.log(response.data)
                        reset()
                        navigate('/formations')
                    })
                    .catch(()=>setUser(null))
            })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get?_id=${id}`)
        .then((response)=>setFormation(response.data))
        .catch(()=>setFormation(null))
        .finally(()=>setLoading(false))
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/informations`, {withCredentials: true})
        .then((response)=> {
            setUser(response.data)
        })
        .catch(()=>setUser(null))
    }, [id, setUser])

    if(loading) return(<p>Chargement ...</p>)
    if(!loading) return(
        <>
            <Nav></Nav>
            { formation &&
                <section className="registrations-container">
                    { formation.map( f =>
                        <>
                            <h2>Inscription à la formation <span className="title">"{f.title}"</span></h2>
                            <p>Veuillez <a href="#submition" className="colored">soumettre votre inscription</a> pour que vous soyez inscrit à cette formation 📖 .</p>
                            <form onSubmit={handleSubmit(_handleSubmit)}>
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
                                            <label htmlFor="">Votre numéro téléphone <span className="colored">*</span> :</label>
                                            <input type="tel" name="" id="" value={user.phoneNumber} placeholder="ex: 030 00 000 00" { ...register('phoneNumber', { required:true }) } />
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="element">
                                    <button id="submition">Soumettre l'inscription</button>
                                </div>
                            </form>
                        </>
                    ) }
                </section>
            }
        </>
    )
}