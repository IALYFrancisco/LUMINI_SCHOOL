import { Outlet } from "react-router-dom"
import '../../../../public/styles/dashboard/article.css'
import { useHead } from "@unhead/react"

export default function Formations(){

    useHead({
        title: 'Articles - Dashboard | LUMINI School'
    })

    return(
        <>
            <h2>Articles</h2>
            <Outlet/>
        </>
    )
}