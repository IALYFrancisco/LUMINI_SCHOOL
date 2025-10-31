import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function FormationsList(){

    var [formations, setFormations] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3000/formation/get`)
            .then((response)=>{
                setFormations(response.data)
            }).catch((err)=>{
                console.log(err)
            })
    }, [])

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
            <ul className="formations">
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
                                <ul className="formation">
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
                                        { formation.publishDate && <p>{ new Date(formation.publishDate).toLocaleString("fr-FR") }</p>}
                                        { !formation.publishDate && <p>------------</p>}
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
                                        <img src="/images/kebab.png" alt="" />
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