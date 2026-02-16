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
            </div>
        </>
    )
}