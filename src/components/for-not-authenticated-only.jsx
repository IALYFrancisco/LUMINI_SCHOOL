import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./loading";

export default function ForNotAuthenticatedOnly({children}) {
    const { user, loading }= useAuth()

    if(loading) return <Loading/>
    if(user) return <Navigate to="/" replace/>

    return children
}