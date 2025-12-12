import axios from "axios"
import { useEffect, useState, useRef } from "react"
import '../../../../public/styles/dashboard/inscription.css'
import { useAuth } from "../../../contexts/AuthContext"

export default function Inscriptions(){

    var [registrations, setRegistrations] = useState([])
    var [activePopUp, setActivePopUp] = useState(null)
    const popUpRef = useRef(null)
    const { user } = useAuth()

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/registration/get`, { withCredentials: true })
        .then((response)=>setRegistrations(response.data))
    }, [])

    const togglePopUp = (formationId) => {
        setActivePopUp((prev) => (prev === formationId ? null : formationId))
    }

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if(popUpRef.current && !popUpRef.current.contains(event.target)) {
                setActivePopUp(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return(
        <>
            <h2>Inscriptions</h2>
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche d'une inscription"/>
            </div>
            {/* List for admin or superuser */}
            { (user.status === "superuser"||user.status === "admin") && <ul className="inscriptions">
                <li className="titles">
                    <ul>
                        <li className="title">Titres du formation</li>
                        <li className="description">Clients inscrits</li>
                        <li className="addDate">Date de l'inscription</li>
                        <li className="addDate">Téléphone du client</li>
                        <li className="addDate">Actions</li>
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
                                    <li  className="addDate">
                                        <p>{ registration.user.phoneNumber }</p>
                                    </li>
                                    <li className="formation-actions">
                                        <div className="custom-container">
                                            <img src="/images/kebab.png" alt=""/>
                                        </div>
                                    </li>
                                </ul>
                                )
                            )
                        }
                </li>}
            </ul> }
            {/* List for user, simple user */}
            { user.status === "user" && <ul className="inscriptions">
                <li className="titles">
                    <ul>
                        <li className="title">Formations</li>
                        <li className="description">Lieu du formation</li>
                        <li className="formation-actions">Droit déjà payé ?</li>
                        <li className="addDate">Date de début</li>
                        <li className="addDate">Date de fin</li>
                        <li className="addDate">Actions</li>
                    </ul>
                </li>
                { registrations && <li ref={popUpRef}>
                            { registrations.map( registration => (
                                <ul className="formation" key={registration._id}>
                                    <li className="title">
                                        <h5>{registration.formation.title}</h5>
                                    </li>
                                    <li  className="description">
                                        <p>{registration.formation.coursePlace}</p>
                                    </li>
                                    <li  className="formation-actions">
                                        { registration.coursePricePayed && <div className="badge yes">
                                            <p>oui</p>
                                        </div> }
                                        { !registration.coursePricePayed && <div className="badge no">
                                            <p>non</p>
                                        </div> }
                                    </li>
                                    <li  className="description">
                                        <p>{ new Date(registration.formation.beginDate).toLocaleString("fr-FR") }</p>
                                    </li>
                                    <li  className="addDate">
                                        <p>{ new Date(registration.formation.endDate).toLocaleString("fr-FR") }</p>
                                    </li>
                                    <li className="formation-actions">
                                        <ul className={ activePopUp === registration._id ? 'pop-up show' : 'pop-up hide'}>
                                            <li onClick={ () => {
                                                togglePopUp(registration._id);
                                            }} >Télécharger les détails</li>
                                            <li onClick={ () => {
                                                togglePopUp(registration._id);
                                            } }>Payer le droit</li>
                                        </ul>
                                        <div className="custom-container" onClick={ () => togglePopUp(registration._id) }>
                                            <img src="/images/kebab.png" alt=""/>
                                        </div>
                                    </li>
                                </ul>
                                )
                            )
                        }
                </li>}
            </ul> }
        </>
    )
}