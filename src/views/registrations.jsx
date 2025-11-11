import { useParams } from "react-router-dom"

export default function Registrations(){

    var { id } = useParams()

    return(
        <h1>Registration page {id}</h1>
    )
}