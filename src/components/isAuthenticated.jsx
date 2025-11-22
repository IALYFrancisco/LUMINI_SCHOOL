import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./loading";

export default function IsAuthenticated({children}) {
    const { user, loading } = useAuth()

    if(loading) return <Loading/>
    if(!user) return <Navigate to="/authentication/login" replace/>

    return children
}