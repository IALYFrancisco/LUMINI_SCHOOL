import { useHead } from "@unhead/react"
import { Outlet } from "react-router-dom"

export default function Users(){

    useHead({
        title: 'Utilisateurs - Dashboard | LUMINI School'
    })

    return(
        <>
            <h2>Utilisateurs</h2>
            <Outlet/>
        </>
    )
}