import { client } from '../../api/client'

export const login = async (email: string, password: string) => {
    const { data, error } = await client.POST('/api/auth/login', {
        body: { email, password },
    })

    if (error) throw error;
    if (!data) throw new Error('レスポンスデータがありません')
    return data;
}