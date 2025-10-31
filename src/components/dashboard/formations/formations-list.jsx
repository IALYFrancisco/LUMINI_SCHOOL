import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function FormationsList(){

    var [formations, setFormations] = useState([])

    useEffect(()=>{
        // eslint-disable-next-line no-undef
        axios.get(`http://localhost:3000//formation/get`)
            .then((response)=>{
                setFormations(response.data)
            }).catch((err)=>{
                console.log(err)
            })
    }, undefined)

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
                {/* <li>
                    <ul className="formation">
                        <li className="title">
                            <h5>Bases du HTML et CSS</h5>
                        </li>
                        <li  className="description">
                            <p>Cette formation apprend aux débutants les bases du HTML et CSS.</p>
                        </li>
                        <li  className="addDate">
                            <p>27 Octobre 2025 à 16:49</p>
                        </li>
                        <li className="publicationDate">
                            <p>29 Octobre 2025 à 8:12</p>
                        </li>
                        <li className="published">
                            <div className="badge">
                                <p>oui</p>
                            </div>
                        </li>
                        <li className="formation-actions">
                            <img src="/images/kebab.png" alt="" />
                        </li>
                    </ul>
                </li> */}
            </ul>
        </>
    )
}