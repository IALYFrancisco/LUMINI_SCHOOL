import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ForNotAuthenticatedOnly({children}) {
    const { user, loading }= useAuth()

    if(loading) return <p>Chargement ...</p>
    if(user) return <Navigate to="/" replace/>

    return children
}