import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/informations`, {withCredentials: true})
            .then((response)=>setUser(response.data))
            .catch(()=>setUser(null))
            .finally(()=> setLoading(false))
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)