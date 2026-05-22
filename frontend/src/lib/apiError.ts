type ApiError = {
    errorCode?: string
    message?: string
}

export const getErrorMessage = (e: unknown): string => {
    if (e instanceof TypeError) {
        return '通信エラーが発生しました。しばらく待ってから再試行してください'
    }

    const apiError = e as ApiError
    if (apiError?.message) return apiError.message

    return '予期せぬエラーが発生しました'
}