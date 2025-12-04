import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function UpdateFormation(){

    var { register, handleSubmit, reset, formState: { errors, isDirty }, watch } = useForm()
    var [formation, setFormation] = useState(null)
    var [ image, setImage ] = useState('')
    var [ urlIsDefined, setUrlIsDefined ] = useState(false)
    var [ imageIsDefined, setImageIsDefined ] = useState(false)
    const { id } = useParams()

    const descriptionValue = watch("description") || ""
    const wordCount = descriptionValue.trim().split(/\s+/).filter(Boolean).length

    var watchAll = watch()

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get?_id=${id}`)
        .then((response)=>{
            setFormation(response.data[0])
            reset({
                title: response.data[0].title,
                prerequisites: response.data[0].prerequisites[0],
                description: response.data[0].description,
                url: (response.data[0].image.includes("https") || response.data[0].image.includes("http")) ? response.data[0].image : `${import.meta.env.VITE_API_BASE_URL}/${response.data[0].image}`,
            })
        })
    },[id, reset])

    useEffect(()=>{
        
        if(watchAll.url) setUrlIsDefined(true)
        else setUrlIsDefined(false)

        if(image) setImageIsDefined(true)
        else setImageIsDefined(false)

    }, [image, watchAll])

    const isModified = isDirty || image

    const onSubmit = async (data) => {
        
        if(!isModified) return;
        else {

            try {

                let _formation = new FormData()
                    
                if(formation.title !== watchAll.title && data.title !== ""){
                    _formation.append("title", data.title)
                }
                if(formation.prerequisites[0] !== watchAll.prerequisites && data.prerequisites !== ""){
                    _formation.append("prerequisites", data.prerequisites)
                }
                if(formation.description !== watchAll.description && data.description !== ""){
                    _formation.append("description", data.description)
                }
                if(image){
                    _formation.append("poster", image)
                }
                if(`${import.meta.env.VITE_API_BASE_URL}/${formation.image}` !== data.url && data.url !== ""){
                    _formation.append("image", data.url)
                }

                await axios.put(`${import.meta.env.VITE_API_BASE_URL}/formation/update?_id=${id}`, _formation,
                    { 
                        headers: image ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/json"},
                        withCredentials: true
                    }
                ).then(()=>{
                    axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get?_id=${id}`)
                    .then((response)=>{
                        setFormation(response.data[0])
                        reset({
                            title: response.data[0].title,
                            prerequisites: response.data[0].prerequisites[0],
                            description: response.data[0].description,
                            url: (response.data[0].image.includes("https") || response.data[0].image.includes("http")) ? response.data[0].image : `${import.meta.env.VITE_API_BASE_URL}/${response.data[0].image}`,
                        })
                    })
                    setImage(null)
                })
                .catch((err)=> console.log(err))
                
            }catch(err){
                console.log(err)
            }
            
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
                            <input disabled={ urlIsDefined } type="file" name="image" id="" accept="image/jpeg, image/png" onChange={(e) => {setImage(e.target.files[0])}}/>
                            <input disabled={ imageIsDefined } type="url" name="" id="" { ...register("url") } />
                        </div>
                        <div className="element">
                            <label>Les prérequis d'une formation :</label>
                            <input type="text" name="prerequis" id="" placeholder="Doivent être séparés par un point-virgule" { ...register("prerequisites", {required: true }) } required />
                        </div>
                        <div className="element update-actions">
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