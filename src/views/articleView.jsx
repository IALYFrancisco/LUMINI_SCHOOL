import { useParams } from "react-router-dom"
import Nav from "../components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../components/loading"
import '../../public/styles/articleView.css'
import DOMPurify from 'dompurify'
import { useHead, useSeoMeta } from "@unhead/react"

export default function ArticleView(){
    
    const { slug } = useParams()
    var [ article, setArticle ] = useState(null)
    var [ loading, setLoading ] = useState(true)
    var [ seo, setSeo ] = useState(null)
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get?slug=${slug}`)
        .then((response)=>{
            setArticle(response.data)
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/seo/get?articleId=${response.data._id}`, {withCredentials: true})
                .then((response)=>{
                    setSeo(response.data)
                })
        }).finally(()=>setLoading(false))
    }, [slug])

    useHead({
        meta: [
            { name: 'description', content: seo && seo.description },
            { name: 'robots', content: 'index, follow' }
        ]
    })
    
    useSeoMeta({
        title: 'Installer Windows 11 : configurations requises et bonnes pratiques',
        ogType: 'article',
        articleAuthor: 'LUMINI School',
        articlePublishedTime: article && `${article.publishedAt}`
    })

    if (loading) return <Loading/>
    return (
        <>
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