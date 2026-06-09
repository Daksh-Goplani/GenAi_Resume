import { useAuth } from "../hooks/userAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <main className="loading-page">
                <div className="loader"></div>
                <h2>Signing you in...</h2>
            </main>
        )
    }

    if(!user){
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected
