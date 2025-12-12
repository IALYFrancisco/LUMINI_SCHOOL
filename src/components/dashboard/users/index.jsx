import { Outlet } from "react-router-dom"

export default function Users(){
    return(
        <>
            <h2>Utilisateurs</h2>
            <Outlet/>
        </>
    )
}