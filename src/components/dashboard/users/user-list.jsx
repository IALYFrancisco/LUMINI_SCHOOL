import axios from "axios"
import { useEffect, useState, useRef } from "react"
import '../../../../public/styles/dashboard/user.css'
// import { useNavigate } from "react-router-dom"

export default function UsersList(){

    // var navigate = useNavigate()

    var [users, setUsers] = useState([])
    // var [activePopUp, setActivePopUp] = useState(null)
    const popUpRef = useRef(null)
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get`, { withCredentials: true })
            .then((response)=>{
                setUsers(response.data)
            }).catch((err)=>{
                console.log(err)
            })
    }, [])

    // useEffect(()=>{
    //     const handleClickOutside = (event) => {
    //         if(popUpRef.current && !popUpRef.current.contains(event.target)) {
    //             setActivePopUp(null)
    //         }
    //     }
    //     document.addEventListener("mousedown", handleClickOutside)
    //     return ()=>{
    //         document.removeEventListener("mousedown", handleClickOutside)
    //     }
    // }, [])

    // const togglePopUp = (userId) => {
    //     setActivePopUp((prev) => (prev === userId ? null : userId))
    // }

    // const publishFormation = async (formation) => {
    //     await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/formation/publication`, { formationId: formation._id , update: { published: !formation.published }}, { withCredentials: true })
    //     .then( async ()=>{
    //         await axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get`, { withCredentials: true })
    //         .then((response)=>{
    //             setFormations(response.data)
    //         }).catch((err)=>{
    //             console.log(err)
    //         })
    //     }).catch((err)=>console.log(err))
    // }

    return(
        <>
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche d'utilisateur"/>
            </div>
            <ul className="users" ref={popUpRef}>
                <li className="titles">
                    <ul>
                        <li className="title">Nom de l'utilisateur</li>
                        <li className="description">Email</li>
                        <li className="addDate">Numéro téléphone</li>
                        <li className="publicationDate">Compte créé le</li>
                        <li className="published">Statut</li>
                        <li className="formation-actions">Actions</li>
                    </ul>
                </li>
                    { users && <li>
                            { users.map( u => (
                                <ul className="user" key={u._id}>
                                    <li className="title">
                                        <h5>{u.name}</h5>
                                    </li>
                                    <li className="description">
                                        <p>{u.email}</p>
                                    </li>
                                    <li className="description">
                                        <p>{u.phoneNumber}</p>
                                    </li>
                                    <li  className="description">
                                        <p>{ new Date(u.registerDate).toLocaleString("fr-FR") }</p>
                                    </li>
                                    <li className="published">
                                        { u.status === "superuser" && <div className="badge superuser">
                                            <p>{u.status}</p>
                                        </div> }
                                        { u.status === "admin" && <div className="badge admin">
                                            <p>{u.status}</p>
                                        </div> }
                                        { u.status === "user" && <div className="badge _user">
                                            <p>{u.status}</p>
                                        </div> }
                                    </li>
                                    <li className="formation-actions">
                                        {/* <ul className={ activePopUp === formation._id ? 'pop-up show' : 'pop-up hide'}>
                                            <li onClick={ () => {
                                                togglePopUp(formation._id);
                                                deleteFormation(formation._id);
                                            }} >Supprimer</li>
                                            <li onClick={ () => {
                                                togglePopUp(formation._id);
                                                publishFormation(formation);
                                            }}>{ formation.published ? "Dépublier" : "Publier" }</li>
                                            <li onClick={ () => {
                                                togglePopUp(formation._id);
                                                navigate(`/dashboard/formation/update/${formation._id}`);
                                            } }>Modifier</li>
                                        </ul> */}
                                        <div className="custom-container" 
                                        // onClick={ () => togglePopUp(u._id) }
                                        >
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