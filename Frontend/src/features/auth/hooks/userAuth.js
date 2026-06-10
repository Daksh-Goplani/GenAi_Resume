import { useContext, useEffect } from 'react'
import { AuthContext } from '../Auth.context'
import { login, register, logout, getme } from '../services/auth.api'

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setuser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login(email, password)
            setuser(data.user)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register(username, email, password)
            setuser(data.user)
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }
    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setuser(null)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getme()
                setuser(data.user)
            } catch (error) {} finally {
                setLoading(false)
            }
        }
        getAndSetUser()
    }, [])

    return { user, loading, handleRegister, handleLogout, handleLogin }
}