import { Outlet } from "react-router-dom"
import '../../../../public/styles/dashboard/article.css'

export default function Formations(){
    return(
        <>
            <h2>Articles</h2>
            <Outlet/>
        </>
    )
}