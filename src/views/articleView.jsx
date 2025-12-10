import { useParams } from "react-router-dom"
import Nav from "../components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../components/loading"

export default function ArticleView(){

    const { id } = useParams()
    var [ article, setArticle ] = useState(null)
    var [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get?_id=${id}`)
        .then((response)=>{
            setArticle(response.data)
        }).finally(()=>setLoading(false))
    }, [id])

    if (loading) return <Loading/>
    return (
        <>
            <Nav></Nav>
            {
                article && <div className="image-container">
                <img src={(article.image.includes('https') || article.image.includes('http')) ? article.image : `${import.meta.env.VITE_API_BASE_URL}/${article.image}` } alt={article.title} />
            </div>
            }
            
        </>
    )
}