import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function SEOUpdate(){
    var [article, setArticle] = useState(null)
    const {id} = useParams()
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get?_id=${id}`, { withCredentials: true })
            .then((response)=>{
                setArticle(response.data)
            }).catch(()=>setArticle(null))
    },[id])
    return(
        article &&
        <>
            <div className="update-article-seo">
                <h3>Modification du SEO de l'article <span>"{article.title}"</span></h3>
                <form>
                    <fieldset>
                        <div className="element">
                            <label htmlFor="page-title">Titre de page [ title, og:title, twitter:title ] :</label>
                            <input type="text" id="page-title" placeholder="Ajoutez un titre à la page d'article (ce sera également utilisé par og:title et twitter:title)"/>
                        </div>
                        <div className="element">
                            <label htmlFor="page-url">Url de page [ lien canonique, og:url, twitter:url ] :</label>
                            <input type="url" id="page-url" placeholder="Ajoutez un url canonique à la page d'article (ce sera également utilisé par og:url et twitter:url)"/>
                        </div>
                        <div className="element">
                            <label htmlFor="image">Image de mise en avant [ og:image, twitter:image ] :</label>
                            <input type="url" id="image" placeholder="Ceci n'est pas modifiable d'ici"/>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    )
}