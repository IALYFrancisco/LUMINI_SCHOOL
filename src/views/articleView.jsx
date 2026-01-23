import { useParams } from "react-router-dom"
import Nav from "../components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../components/loading"
import '../../public/styles/articleView.css'
import DOMPurify from 'dompurify'
import { Helmet } from "react-helmet-async"

export default function ArticleView(){

    const { slug } = useParams()
    var [ article, setArticle ] = useState(null)
    var [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get?slug=${slug}`)
        .then((response)=>{
            setArticle(response.data)
        }).finally(()=>setLoading(false))
    }, [slug])

    if (loading) return <Loading/>
    return (
        <>
            <Helmet>
                <meta name="description" content="Découvrez comment installer Windows 11, les configurations requises et les bonnes pratiques pour une installation sécurisée et professionnelle." />
                <title>Installer Windows 11 : configurations requises et bonnes pratiques</title>
            </Helmet>
            <Nav></Nav>
            <div className="article-container">
                <article>
                {
                    <>
                        <h1>{article.title}</h1>
                        <div className="article-contents ql-container ql-snow">
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contents)}} className="contents ql-editor">
                            </div>
                        </div>
                    </>
                }
                </article>
            </div>            
        </>
    )
}