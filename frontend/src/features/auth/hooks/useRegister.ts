import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../api";
import { getErrorMessage } from "@/lib/apiError";


export const useRegister = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleRegister = async (name: string, email: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            const data = await register(name, email, password)
            localStorage.setItem("access_token", data.accessToken)
            navigate('/')
        } catch (e) {
            setError(getErrorMessage(e))
        } finally {
            setLoading(false)
        }
    }

    return { handleRegister, error, loading }
}