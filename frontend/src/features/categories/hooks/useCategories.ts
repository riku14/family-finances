import type { components } from "@/api/schema";
import { useCallback, useEffect, useState } from "react";
import { createCategory, deleteCategories, fetchCategories, updateCategory } from "../api";
import { getErrorMessage } from "@/lib/apiError";

type Category = components["schemas"]["CategoryResponse"]

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)

    const refresh = useCallback(() => setRefreshKey(k => k + 1), [])

    useEffect(() => {
        async function load() {
            setLoading(true)
            try {
                const data = await fetchCategories()
                const sorted = [...(data.categories ?? [])].sort((a, b) => {
                    if (a.type === "INCOME" && b.type !== "INCOME") return -1
                    if (a.type !== "INCOME" && b.type === "INCOME") return 1
                    return 0
                })
                setCategories(sorted)
            } catch (e) {
                setError(getErrorMessage(e))
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [refreshKey])

    const handleCreate = async (body: { name: string, type: "INCOME" | "EXPENSE", color?: string }) => {
        await createCategory(body)
        await refresh()
    }

    const handleUpdate = async (id: number, body: { name: string, type: "INCOME" | "EXPENSE", color?: string }) => {
        await updateCategory(id, body)
        await refresh()
    }
    const handleDelete = async (id: number) => {
        await deleteCategories(id)
        await refresh()
    }

    return {
        categories, loading, error, handleCreate, handleUpdate, handleDelete
    }
}