import axios from "axios"
import { useEffect, useState } from "react"

export default function Inscriptions(){

    var [registrations, setRegistrations] = useState([])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/registration/get`, { withCredentials: true })
        .then((response)=>setRegistrations(response.data))
    }, [setRegistrations])

    return(
        <>
            <h2>Inscriptions</h2>
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche d'une inscription"/>
            </div>
            <ul className="formations">
                <li className="titles">
                    <ul>
                        <li className="title">Titres du formation</li>
                        <li className="description">Clients inscrits</li>
                        <li className="addDate">Date de l'inscription</li>
                        <li className="formation-actions">Actions</li>
                    </ul>
                </li>
                { registrations && <li>
                            { registrations.map( registration => (
                                <ul className="formation" key={registration._id}>
                                    <li className="title">
                                        <h5>{registration.formation.title}</h5>
                                    </li>
                                    <li  className="description">
                                        <p>{registration.user.name}</p>
                                    </li>
                                    <li  className="addDate">
                                        <p>{ new Date(registration.registrationDate).toLocaleString("fr-FR") }</p>
                                    </li>
                                    {/* <li className="formation-actions">
                                        <ul className={ activePopUp === formation._id ? 'pop-up show' : 'pop-up hide'}>
                                            <li onClick={ () => {
                                                togglePopUp(formation._id);
                                                deleteFormation(formation._id);
                                            }} >Supprimer</li>
                                            <li onClick={ () => togglePopUp(formation._id) }>Publier</li>
                                            <li onClick={ () => togglePopUp(formation._id) }>Modifier</li>
                                        </ul>
                                        <div className="custom-container" onClick={ () => togglePopUp(formation._id) }>
                                            <img src="/images/kebab.png" alt=""/>
                                        </div>
                                    </li> */}
                                </ul>
                                )
                            )
                        }
                </li>}
            </ul>
        </>
    )
}