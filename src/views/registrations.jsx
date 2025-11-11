import { useParams } from "react-router-dom"
import Nav from "../components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import '../../public/styles/registrations.css'

export default function Registrations(){

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
                        <h2>Inscription à la formation <span className="title">"{f.title}"</span></h2>
                    ) }
                </section>
            }
        </>
    )
}