import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})

    const { request, loading, error } = useApi()

    useEffect(() => {
        const fetchIsAuthorized = async () => {
            const data = await request('http://localhost:3000/user')

            setUser(data)
        }

        fetchIsAuthorized()
    }, [])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}