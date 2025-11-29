import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function UpdateFormation(){

    var { register, handleSubmit, reset, formState: { errors, isDirty }, watch } = useForm()
    var [ image, setImage ] = useState(null)
    const { id } = useParams()

    const descriptionValue = watch("description") || ""
    const wordCount = descriptionValue.trim().split(/\s+/).filter(Boolean).length

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get?_id=${id}`)
        .then((response)=>{
            reset({
                title: response.data[0].title,
                prerequisites: response.data[0].prerequisites,
                description: response.data[0].description
            })
        })
    },[id, reset])

    const isModified = isDirty || image

    const onSubmit = async (data) => {
        
        if(!isModified) return;

        const formation = new FormData()
        formation.append("title", data.title)
        formation.append("prerequisites", data.prerequisites)
        formation.append("description", data.description)
        formation.append("_id", id)

        if(image){
            formation.append("poster", image)
        }

        try{
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/formation/update`, formation,
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
                            <input type="file" name="image" id="" accept="image/jpeg, image/png" onChange={(e) => {setImage(e.target.files[0])}}/>
                        </div>
                        <div className="element">
                            <label>Les prérequis d'une formation :</label>
                            <input type="text" name="prerequis" id="" placeholder="Doivent être séparés par un point-virgule" { ...register("prerequisites", {required: true }) } required />
                        </div>
                        <div className="element">
                            <button disabled={!isModified}>Soumettre</button>
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