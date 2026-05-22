import type { components } from "@/api/schema"
import { getErrorMessage } from "@/lib/apiError"
import { apiUtils } from "@/lib/apiUtils"
import { useCallback, useEffect, useState } from "react"
import { deleteTransaction, fetchTransactions, updateTransaction } from "../api"

type Transaction = components["schemas"]["TransactionResponse"]

const toYearMonth = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

export const useTransactionList = () => {
    const [yearMonth, setYearMonth] = useState(() => toYearMonth(new Date()))
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)

    const refresh = useCallback(() => setRefreshKey(k => k + 1), [])

    useEffect(() => {
        async function load() {
            setLoading(true)
            try {
                const data = await fetchTransactions(yearMonth)
                setTransactions(data?.transactions ?? [])
            } catch (e) {
                setError(getErrorMessage(e))
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [yearMonth, refreshKey])

    const handleUpdate = async (id: number, body: Parameters<typeof updateTransaction>[1]) => {
        await apiUtils(() => updateTransaction(id, body), "更新しました", refresh)
    }

    const handleDelete = async (id: number) => {
        await apiUtils(() => deleteTransaction(id), "削除しました", refresh)
    }

    return {
        yearMonth, setYearMonth,
        transactions, loading, error,
        handleUpdate, handleDelete,
    }
}
