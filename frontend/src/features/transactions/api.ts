import { client } from "@/api/client"

const getWorkspaceId = () => Number(localStorage.getItem("workspace_id"))

// 収支一覧取得
export const fetchTransactions = async (yearMonth: string) => {
    const { data, error } = await client.GET("/api/workspaces/{workspaceId}/transactions", {
        params: {
            path: { workspaceId: getWorkspaceId() },
            query: { yearMonth }
        }
    })
    if (error) throw error
    return data
}

// 収支登録
export const createTransaction = async (body: {
    categoryId: number
    type: "INCOME" | "EXPENSE"
    amount: number
    date: string
    memo?: string
}) => {
    const { data, error } = await client.POST('/api/workspaces/{workspaceId}/transactions', {
        params: { path: { workspaceId: getWorkspaceId() } },
        body,
    })
    if (error) throw error
    return data
}

// 収支更新
export const updateTransaction = async (
    transactionId: number,
    body: {
        categoryId: number
        type: "INCOME" | "EXPENSE"
        amount: number
        date: string
        memo?: string
    }
) => {
    const { data, error } = await client.PUT('/api/workspaces/{workspaceId}/transactions/{transactionId}', {
        params: {
            path: { workspaceId: getWorkspaceId(), transactionId }
        },
        body
    })
    if (error) throw error
    return data
}

// 収支削除
export const deleteTransaction = async (transactionId: number) => {
    const { error } = await client.DELETE('/api/workspaces/{workspaceId}/transactions/{transactionId}', {
        params: { path: { workspaceId: getWorkspaceId(), transactionId } }
    })
    if (error) throw error
}