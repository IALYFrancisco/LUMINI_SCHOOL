import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./loading";

export default function IsSuperuser({children}) {
    const { user, loading } = useAuth()
    if(loading) return <Loading/>
    if(user && user.status === "superuser") return children
    return <Navigate to="/" replace/>
}