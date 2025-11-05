/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"

export default function AddFormation(){

    var { register, handleSubmit, reset } = useForm()
    var [ title, setTitle ] = useState('')
    var [ image, setImage ] = useState('')
    var [ prerequisites, setPrerequisites ] = useState('')
    var [ description, setDescription ] = useState('')

    const onSubmit = async (data) => {
        try{
            const formation = new FormData()
            formation.append("title", data.title)
            formation.append("poster", image)
            formation.append("prerequisites", data.prerequisites)
            formation.append("description", data.description)
            
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/formation/add`, formation,
                { headers: {"Content-Type": "multipart/form-data"} }
            ).then((res)=>{
                reset()
                setTitle("")
                setPrerequisites("")
                setDescription("")
                setImage(null)
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
                <h3>Ajout d'une formation :</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <div className="element">
                            <label>Titre de la formation :</label>
                            <input type="text" { ...register("title", { required: true })} />
                        </div>
                        <div className="element">
                            <label>Image de mis en avant pour la formation :</label>
                            <input type="file" name="" id="" required accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="element">
                            <label>Les prérequis d'une formation :</label>
                            <input type="text" name="" id="" required placeholder="Doivent être séparés par un point-virgule" { ...register("prerequisites", { required: true }) } />
                        </div>
                        <div className="element">
                            <button>Soumettre</button>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="element">
                            <label>Descriptions de la formation :</label>
                            <textarea cols="30" rows="10" required { ...register("description", { required: true }) } ></textarea>
                        </div>
                    </fieldset>
                </form>
            </section>
        </>
    )
}