import axios from "axios"
import { useEffect, useState } from "react"
import '../../../../public/styles/dashboard/inscription.css'
import { useAuth } from "../../../contexts/AuthContext"

export default function Inscriptions(){

    var [registrations, setRegistrations] = useState([])
    const { user } = useAuth()

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/registration/get`, { withCredentials: true })
        .then((response)=>setRegistrations(response.data))
    }, [])

    return(
        <>
            <h2>Inscriptions</h2>
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche d'une inscription"/>
            </div>
            {/* List form admin or superuser */}
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
            {/* List form user, simple user */}
            { user.status === "user" && <ul className="inscriptions">
                <li className="titles">
                    <ul>
                        <li className="title">Formations</li>
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
                                    {/* <li  className="description">
                                        <p>{registration.user.name}</p>
                                    </li> */}
                                    <li  className="addDate">
                                        <p>{ new Date(registration.registrationDate).toLocaleString("fr-FR") }</p>
                                    </li>
                                    {/* <li  className="addDate">
                                        <p>{ registration.user.phoneNumber }</p>
                                    </li> */}
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
        </>
    )
}