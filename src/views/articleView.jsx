import { useParams } from "react-router-dom"

export default function ArticleView(){

    const { id } = useParams()

    return <h1>This is an article view page: {id}</h1>
}