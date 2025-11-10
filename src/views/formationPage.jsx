import Nav from "../components/nav"
import '../../public/styles/formationsPage.css'
import { useEffect, useState } from "react"
import axios from "axios"

export function FormationsPage(){

    var [ formations, setFormations ] = useState([])
    var [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get`)
            .then((response)=>setFormations(response.data))
            .catch(()=>setFormations([]))
            .finally(()=>setLoading(false))
    }, [])

    if(loading) return <p>Chargement ...</p>
    if(formations) return(
        <>
            <Nav></Nav>
            <section className="formations-page">
                <div className="head">
                    <h2>Toute nos formations :</h2>
                    <p>Ci-dessous la liste de toute nos formations. Elles sont issues des branches existantes du secteur de l'informatique et ont été éléborées par nous-même afin de garantir leurs contenus ✨.</p>
                    <div className="actions">
                        <input type="text" name="formation" id="" placeholder="Rehcrecher des formations"/>
                    </div>
                </div>
                <div className="body">
                    { formations && <>
                        { formations.map( formation => (
                            <div className="card-container">
                                <div className="card" key={formation._id}>
                                    <div className="formation-image">
                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/${formation.image}`} alt="" />
                                    </div>
                                    <div className="formation-infos">
                                        <h4>{formation.title}</h4>
                                        <p>{formation.description}</p>
                                        <button>S'inscrire</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </> }
                    { formations && <>
                        { formations.map( formation => (
                            <div className="card-container">
                                <div className="card" key={formation._id}>
                                    <div className="formation-image">
                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/${formation.image}`} alt="" />
                                    </div>
                                    <div className="formation-infos">
                                        <h4>{formation.title}</h4>
                                        <p>{formation.description}</p>
                                        <button>S'inscrire</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </> }
                </div>
            </section>
        </>
    )
}