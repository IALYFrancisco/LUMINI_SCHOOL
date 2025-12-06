import Nav from "../components/nav"
import '../../public/styles/formationsPage.css'
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Loading from "../components/loading"

export function ArticlesPage(){

    var [ articles, setArticles ] = useState([])
    var [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get`, { withCredentials: true })
            .then((response)=>{
                setArticles(response.data.filter( article => article.published === true ))
            })
            .catch(()=>setArticles([]))
            .finally(()=>setLoading(false))
    }, [])

    if(loading) return <Loading/>
    if(articles) return(
        <>
            <Nav></Nav>
            <section className="formations-page">
                <div className="head">
                    <h2>Tout nos articles :</h2>
                    <p>Ci-dessous la liste de toute nos formations. Elles sont issues des branches existantes du secteur de l'informatique et ont été éléborées par nous-même afin de garantir leurs contenus ✨.</p>
                    <div className="actions">
                        <input type="text" name="formation" id="" placeholder="Rehcreche d'article"/>
                    </div>
                </div>
                <div className="body">
                    { articles && <>
                        { articles.map( article => (
                            <div className="card-container" key={article._id}>
                                <div className="card">
                                    <div className="formation-image">
                                        <img src={ (article.image.includes('https') || article.image.includes('http')) ? article.image : `${import.meta.env.VITE_API_BASE_URL}/${article.image}` } alt="" />
                                    </div>
                                    <div className="formation-infos">
                                        <h4>{article.title}</h4>
                                        <p>{article.contents}</p>
                                        {/* <Link to={`/registrations/formation/${formation._id}`}> */}
                                            <button>Lire plus</button>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </> }
                </div>
            </section>
        </>
    )
}