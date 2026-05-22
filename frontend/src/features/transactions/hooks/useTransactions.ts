import type { components } from "@/api/schema"
import { useCallback, useEffect, useState } from "react"
import { createTransaction, deleteTransaction, fetchTransactions, updateTransaction } from "../api"
import { getErrorMessage } from "@/lib/apiError"

type Transaction = components["schemas"]["TransactionResponse"]

const toYearMonth = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

export const useTransactions = () => {
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


    const handleCreate = async (body: Parameters<typeof createTransaction>[0]) => {
        await createTransaction(body)
        await refresh()
    }

    const handleUpdate = async (id: number, body: Parameters<typeof updateTransaction>[1]) => {
        await updateTransaction(id, body)
        await refresh()
    }

    const handleDelete = async (id: number) => {
        await deleteTransaction(id)
        await refresh()
    }

    return {
        yearMonth, setYearMonth,
        transactions, loading, error,
        handleCreate, handleUpdate, handleDelete,
    }
}
