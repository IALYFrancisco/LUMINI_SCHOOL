import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"

export default function FormationsList(){

    var [formations, setFormations] = useState([])
    var [activePopUp, setActivePopUp] = useState(null)
    const popUpRef = useRef(null)
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get`)
            .then((response)=>{
                setFormations(response.data)
            }).catch((err)=>{
                console.log(err)
            })
    }, [])

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

    const togglePopUp = (formationId) => {
        setActivePopUp((prev) => (prev === formationId ? null : formationId))
    }

    const deleteFormation = (formationId) => {
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/formation/delete`, { data: { _id: formationId }, withCredentials: true })
            .then(()=>{ setFormations( (prev) => prev.filter( f => f._id !== formationId ) ) })
            .catch((err)=>{
                console.log(err)
            })
    }

    const publishFormation = async (formation) => {
        await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/formation/publication`, { formationId: formation._id , update: { published: !formation.published }}, { withCredentials: true })
        .then( async ()=>{
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get`)
            .then((response)=>{
                setFormations(response.data)
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>console.log(err))
    }

    return(
        <>
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche de formation"/>
                    <Link to="/dashboard/formation/create">
                        <button>
                            Ajouter une formation
                        </button>
                    </Link>
            </div>
            <ul className="formations" ref={popUpRef}>
                <li className="titles">
                    <ul>
                        <li className="title">Titres</li>
                        <li className="description">Descriptions</li>
                        <li className="addDate">Date d'ajout</li>
                        <li className="publicationDate">Date de publication</li>
                        <li className="published">Publiée</li>
                        <li className="formation-actions">Actions</li>
                    </ul>
                </li>
                    { formations && <li>
                            { formations.map( formation => (
                                <ul className="formation" key={formation._id}>
                                    <li className="title">
                                        <h5>{formation.title}</h5>
                                    </li>
                                    <li  className="description">
                                        <p>{formation.description}</p>
                                    </li>
                                    <li  className="addDate">
                                        <p>{ new Date(formation.createdAt).toLocaleString("fr-FR") }</p>
                                    </li>
                                    <li className="publicationDate">
                                        { formation.published ? <p>{ new Date(formation.publishDate).toLocaleString("fr-FR") }</p> : <p>------------</p>}
                                    </li>
                                    <li className="published">
                                        { formation.published && <div className="badge yes">
                                            <p>oui</p>
                                        </div> }
                                        { !formation.published && <div className="badge no">
                                            <p>non</p>
                                        </div> }
                                    </li>
                                    <li className="formation-actions">
                                        <ul className={ activePopUp === formation._id ? 'pop-up show' : 'pop-up hide'}>
                                            <li onClick={ () => {
                                                togglePopUp(formation._id);
                                                deleteFormation(formation._id);
                                            }} >Supprimer</li>
                                            <li onClick={ () => {
                                                togglePopUp(formation._id);
                                                publishFormation(formation);
                                            }}>{ formation.published ? "Dépublier" : "Publier" }</li>
                                            <li onClick={ () => togglePopUp(formation._id) }>Modifier</li>
                                        </ul>
                                        <div className="custom-container" onClick={ () => togglePopUp(formation._id) }>
                                            <img src="/images/kebab.png" alt=""/>
                                        </div>
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