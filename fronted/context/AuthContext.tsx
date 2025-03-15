'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface AuthContextType {
    auth: { accessToken: string | null; refreshToken: string | null };
    setAuth: (tokens: { accessToken: string; refreshToken: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuthState] = useState<{ accessToken: string | null; refreshToken: string | null } | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            setAuthState({ accessToken, refreshToken });
        }
    }, []);

    const setAuth = (tokens: { accessToken: string; refreshToken: string }) => {
        setAuthState(tokens);
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
    };

    if (auth === null) {
        return <div>Loading...</div>; // Prevents using auth before it's initialized
    }

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
