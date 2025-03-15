import React, { useContext, createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie';

const AuthContext = createContext<any | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState({
        accessToken: Cookies.get("accessToken") || null,
        refreshToken: Cookies.get("refreshToken") || null
    });

    useEffect(() => {
        if (auth.accessToken) {
            Cookies.set("accessToken", auth.accessToken, { expires: 1 })
        }

        if (auth.refreshToken) {
            Cookies.set("refreshToken", auth.refreshToken,{expires:7})
        }
    }, [auth])
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useauth must be used inside an AuthProvider")
    }

    return context;
}
