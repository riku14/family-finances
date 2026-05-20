import type { components } from "@/api/schema";
import { useEffect, useState } from "react";
import { createCategory, deleteCategories, fetchCategories, updateCategory } from "../api";

type Category = components["schemas"]["CategoryResponse"]

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const load = async () => {
        setLoading(true)
        try {
            const data = await fetchCategories()
            const sorted = [...(data.categories ?? [])].sort((a, b) => {
                if (a.type === "INCOME" && b.type !== "INCOME") return -1
                if (a.type !== "INCOME" && b.type === "INCOME") return 1
                return 0
            })
            setCategories(sorted)
        } catch {
            setError("カテゴリの取得に失敗しました")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const handleCreate = async (body: { name: string, type: "INCOME" | "EXPENSE", color?: string }) => {
        await createCategory(body)
        await load()
    }

    const handleUpdate = async (id: number, body: { name: string, type: "INCOME" | "EXPENSE", color?: string }) => {
        await updateCategory(id, body)
        await load()
    }
    const handleDelete = async (id: number) => {
        await deleteCategories(id)
        await load()
    }

    return {
        categories, loading, error, handleCreate, handleUpdate, handleDelete
    }
}