import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./loading";

export default function ForNotAuthenticatedOnly({children}) {
    const { user, loading }= useAuth()

    if(loading) return <Loading/>
    if(user && (user.status === 'superuser' || user.status === 'admin')) return <Navigate to="/dashboard" replace/>
    if(user && user.status === 'user') return <Navigate to="/" replace/>

    return children
}