import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../../../../public/styles/dashboard/inscription.css"

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
            <ul className="inscriptions">
                <li className="titles">
                    <ul>
                        <li className="title">Titres du formation</li>
                        <li className="clients-subscribed">Nombre de clients inscrits</li>
                    </ul>
                </li>
                { registrations && <li>
                            { registrations.map( registration => (
                                <ul className="formation" key={registration._id}>
                                    <li className="title">
                                        <h5>{registration.formation.title}</h5>
                                    </li>
                                    <li  className="clients-subscribed">
                                        <Link>
                                            <p>23</p>
                                        </Link>
                                    </li>
                                </ul>
                                )
                            )
                        }
                </li>}
            </ul>
        </>
    )
}