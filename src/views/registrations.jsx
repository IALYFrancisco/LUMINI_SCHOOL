import { useParams } from "react-router-dom"
import Nav from "../components/nav"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Registrations(){

    var [formation, setFormation] = useState(null)
    var [loading, setLoading] = useState(true)
    var { id } = useParams()

    useEffect(()=>{
        axios
    })

    return(
        <>
            <Nav></Nav>
            <section className="registrations-container">
                <h2>Inscription à la formation {}</h2>
            </section>
        </>
    )
}