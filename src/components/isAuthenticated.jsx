// This component allows to protect routes by not authenticated users

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./loading";
import { toast } from "sonner";

export default function IsAuthenticated({children}) {
    const { user, loading } = useAuth()

    if(loading) return <Loading/>
    if(!user){
        toast.info("Vous devez d'abord vous connecter à votre compte.")
        return <Navigate to="/authentication/login" replace/>
    }

    return children
}