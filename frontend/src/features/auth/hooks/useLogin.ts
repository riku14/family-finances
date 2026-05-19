import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api";


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
            if (e instanceof TypeError) {
                setError("通信エラーが発生しました。しばらく待ってから再試行してください");
            } else {
                setError("メールアドレスまたはパスワードが正しくありません")
            }
        } finally {
            setLoading(false)
        }
    }

    return { handleLogin, error, loading }
}