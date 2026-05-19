import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api";
import { getErrorMessage } from "@/lib/apiError";


export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (email: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            const data = await login(email, password)
            localStorage.setItem("access_token", data.accessToken)
            navigate('/')
        } catch (e) {
            setError(getErrorMessage(e))
        } finally {
            setLoading(false)
        }
    }

    return { handleLogin, error, loading }
}