import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function SEOUpdate(){
    
    var [article, setArticle] = useState(null)
    var [seo, setSeo] = useState(null)
    const {id} = useParams()
    const { register, handleSubmit, reset } = useForm()
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get?_id=${id}`, { withCredentials: true })
            .then((response)=>{
                setArticle(response.data)
            }).catch(()=>setArticle(null))
    },[id])
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/seo/get?articleId=${id}`, { withCredentials: true })
            .then((response)=>{
                if(response.status === 200){
                    setSeo(response.data)
                }
                if(response.status === 209){
                    setSeo(null)
                    toast.info("Cet article n'a pas encore de SEO.")
                }
            }).catch(()=>{
                setSeo(null)
                toast.error('Erreur de récupération du SEO de cet article')
            })
    }, [id])

    return(
        article &&
        <>
            <div className="update-article-seo">
                <h3>Modification du SEO de l'article <span>"{article.title}"</span></h3>
                <form>
                    <fieldset>
                        <div className="element">
                            <label htmlFor="page-title">Titre de page [ title, og:title, twitter:title ] :</label>
                            <input type="text" id="page-title" placeholder="Ajoutez un titre à la page d'article (ce sera également utilisé par og:title et twitter:title)" { ...register('title') } required/>
                        </div>
                        <div className="element">
                            <label htmlFor="page-url">Url de page [ lien canonique, og:url, twitter:url ] :</label>
                            <input type="url" id="page-url" placeholder="Ajoutez un url canonique à la page d'article (ce sera également utilisé par og:url et twitter:url)" { ...register('canonicUrl') } required/>
                        </div>
                        <div className="element">
                            <label htmlFor="image">Image de mise en avant [ og:image, twitter:image ] :</label>
                            <input type="url" id="image" placeholder="Ceci n'est pas modifiable d'ici" { ...register('image') } required/>
                        </div>
                        <div className="element">
                            <button>Soumettre</button>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="element">
                            <label htmlFor="page-description">Description de page :</label>
                            <textarea id="page-description" placeholder="Rediger une description pour la page, ce sera utilisée par meta:description: , og:description et twitter:description" { ...register('description')} required></textarea>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    )
}