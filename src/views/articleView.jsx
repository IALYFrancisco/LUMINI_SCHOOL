import { useParams } from "react-router-dom"
import Nav from "../components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../components/loading"
import '../../public/styles/articleView.css'
import DOMPurify from 'dompurify'

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
            <div className="article-container">
                <article>
                {
                    <>
                        <h1>{article.title}</h1>
                        <div className="article-contents">
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contents)}} className="contents">
                            </div>
                        </div>
                    </>
                }
                </article>
            </div>            
        </>
    )
}