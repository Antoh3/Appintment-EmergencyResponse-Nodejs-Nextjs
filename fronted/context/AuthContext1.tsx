'use client'
import React, { useState, useContext, createContext, ReactNode } from "react";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: {children:React.ReactNode}) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    // console.log("Context token",accessToken);
    
    const [refreshToken, setRefreshToken] = useState<string | null>(null)

    const setTokens = (newAccessToken: string, newRefreshToken: string) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
    }

    // console.log("Access token", accessToken,refreshToken);
    

    const clearTokens = () => {
        setAccessToken(null);
        setRefreshToken(null);
    }
    return (
        <AuthContext.Provider value={{accessToken,refreshToken,setTokens,clearTokens}}>
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