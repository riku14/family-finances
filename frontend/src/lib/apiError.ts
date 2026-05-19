type ApiError = {
    errorCode?: string
    message?: string
}

const errorMessages: Record<string, string> = {
    ALREADY_EXISTS: 'このメールアドレスはすでに使用されています',
    INVALID_CREDENTIALS: 'メールアドレスまたはパスワードが正しくありません',
    UNAUTHORIZED: 'ログインが必要です',
    NOT_FOUND: '対象が見つかりませんでした',
    VALIDATION_ERROR: '入力内容に誤りがあります',
}

export const getErrorMessage = (e: unknown): string => {
    if (e instanceof TypeError) {
        return '通信エラーが発生しました。しばらく待ってから再試行してください'
    }

    const apiError = e as ApiError
    if (apiError?.errorCode && errorMessages[apiError.errorCode]) {
        return errorMessages[apiError.errorCode]
    }

    return '予期せぬエラーが発生しました'
}