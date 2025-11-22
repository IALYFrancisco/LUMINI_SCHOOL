import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function UpdateFormation(){

    var { register, handleSubmit, reset, formState: { errors }, watch } = useForm()
    var [ image, setImage ] = useState(null)
    const [ formation, setFomation ] = useState(null)
    const [ isModified, setIsModified ] = useState(false)
    const { id } = useParams()
    
    const watchAll = watch()
    const descriptionValue = watch("description") || ""
    const wordCount = descriptionValue.trim().split(/\s+/).filter(Boolean).length

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get?_id=${id}`)
        .then((response)=>{
            setFomation(response.data)
            reset({
                title: response.data.title,
                prerequisites: response.data.prerequisites,
                description: response.data.description
            })
        })
    },[id, reset])

    useEffect(()=>{
        if(!formation) return
        const changed = 
            watchAll.title !== formation.title ||
            watchAll.prerequisites !== formation.prerequisites ||
            watchAll.description !== formation.description ||
            image !== null;
        setIsModified(changed)
    }, [watchAll, image, formation])

    const onSubmit = async (data) => {
        
        if(!isModified) return;

        const _formation = new FormData()
        _formation.append("title", data.title)
        _formation.append("prerequisites", data.prerequisites)
        _formation.append("description", data.description)
        _formation.append("_id", id)

        if(image){
            _formation.append("poster", image)
        }

        try{
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/formation/update`, _formation,
                { headers: {"Content-Type": "multipart/form-data"}, withCredentials: true }
            ).then(()=>{
                reset()
                alert("Mis à jour effectué !")
            })
            .catch((err)=> console.log(err))
        }
        catch(err){
            console.log(err)
        }
    }

    if(!formation) return <p>Chargement...</p>

    return(
        <>
            <section className="add-formation-form">
                <h3>Modification d'une formation :</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <div className="element">
                            <label>Titre de la formation :</label>
                            <input type="text" required name="titre" placeholder="Ajoutez un titre pour la formation" { ...register("title", { required: true })}/>
                        </div>
                        <div className="element">
                            <label>Image de mis en avant pour la formation :</label>
                            <input type="file" name="image" id="" required accept="image/*" onChange={(e) => {setImage(e.target.files[0])}}/>
                        </div>
                        <div className="element">
                            <label>Les prérequis d'une formation :</label>
                            <input type="text" name="prerequis" id="" placeholder="Doivent être séparés par un point-virgule" { ...register("prerequisites", {required: true }) } required />
                        </div>
                        <div className="element">
                            <button>Soumettre</button>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="element">
                            <label>Descriptions de la formation : <p>nombre de mots : {wordCount} / 150</p></label>
                            <textarea cols="30" rows="10" required name="descriptions" placeholder="Redigez ici les descriptions ..." { ...register("description", { required: "La description est obligatoire.", validate: {
                                minWords: (value) => 
                                    value.trim().split(/\s+/).length >= 50 ||
                                    "La description doit contenir au moins 50 mots.",
                                maxWords: (value) =>
                                    value.trim().split(/\s+/).length <= 150 ||
                                    "La description ne doit pas dépasser 150 mots."
                            } }) } ></textarea>
                        </div>
                        { errors.description && (
                            <p className="message">{errors.description.message}</p>
                        ) }
                    </fieldset>
                </form>
            </section>
        </>
    )
}