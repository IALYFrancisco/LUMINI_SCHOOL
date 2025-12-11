import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"

export default function AddFormation(){
    
    var { register, handleSubmit, reset, formState: { errors }, watch } = useForm()
    const watchAll = watch()
    var [ image, setImage ] = useState('')
    var [ urlIsDefined, setUrlIsDefined ] = useState(false)  
    var [ imageIsDefined, setImageIsDefined ] = useState(false)  
    const descriptionValue = watchAll.description || ""
    const wordCount = descriptionValue.trim().split(/\s+/).filter(Boolean).length


    useEffect(()=>{

        if (watchAll.url) setUrlIsDefined(true)
        else setUrlIsDefined(false)
        
        if (image) setImageIsDefined(true)
        else setImageIsDefined(false)

    }, [image, watchAll])

    const onSubmit = async (data) => {
        try{
            if(image){
                const formation = new FormData()
                formation.append("title", data.title)
                formation.append("poster", image)
                formation.append("prerequisites", data.prerequisites)
                formation.append("description", data.description)
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/formation/add`, formation,
                    { headers: {"Content-Type": "multipart/form-data"}, withCredentials: true }
                ).then(()=>{
                    setImage(null)
                    reset()
                })
                .catch((err)=> console.log(err))
            }else{
                const formation = {
                    title: data.title,
                    image: data.url,
                    prerequisites: data.prerequisites,
                    description: data.description,
                }
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/formation/add`, formation, { headers: { "Content-Type": "application/json" }, withCredentials: true })
                .then(()=> reset())
                .catch((err) => console.log(err))
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <section className="add-formation-form">
                <h3>Ajout d'une formation :</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <div className="element">
                            <label>Titre de la formation :</label>
                            <input type="text" required name="titre" placeholder="Ajoutez un titre pour la formation" { ...register("title", { required: true })}/>
                        </div>
                        <div className="element">
                            <label>Image de mis en avant pour la formation :</label>
                            <input disabled={ urlIsDefined } type="file" name="image" id="" required accept="image/jpeg, image/png" onChange={(e) => setImage(e.target.files[0])}/>
                            <input disabled={ imageIsDefined } type="url" name="image" id="" { ...register("url") } placeholder="Utilisez cet champ pour une image en ligne" />
                        </div>
                        <div className="element">
                            <label>Les prérequis du formation :</label>
                            <input type="text" name="prerequis" id="" placeholder="Doivent être séparés par un point-virgule" { ...register("prerequisites", {required: true}) } required />
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