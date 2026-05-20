
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCategories } from "../hooks/useCategories"
import type { components } from "@/api/schema"
import { Badge } from "@/components/ui/badge"

type Category = components["schemas"]["CategoryResponse"]
type CategoryType = "INCOME" | "EXPENSE"

interface FormState {
    name: string
    type: CategoryType
    color: string
}

const defaultForm: FormState = { name: "", type: "EXPENSE", color: "#FF5733" }

export const CategoriesPage = () => {
    const { categories, loading, error, handleCreate, handleUpdate, handleDelete } = useCategories()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editing, setEditing] = useState<Category | null>(null)
    const [form, setForm] = useState<FormState>(defaultForm)

    const openCreate = () => {
        setEditing(null)
        setForm(defaultForm)
        setDialogOpen(true)
    }

    const openEdit = (category: Category) => {
        setEditing(category)
        setForm({
            name: category.name ?? "",
            type: (category.type as CategoryType) ?? "EXPENSE",
            color: category.color ?? "#FF5733",
        })
        setDialogOpen(true)
    }

    const onSubmit = async () => {
        if (editing) {
            await handleUpdate(editing.id!, form)
        } else {
            await handleCreate(form)
        }
        setDialogOpen(false)
    }

    if (loading) return <p>読み込み中...</p>
    if (error) return <p className="text-destructive">{error}</p>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1>カテゴリ管理</h1>
                <Button onClick={openCreate}>＋ 新規追加</Button>
            </div>

            {/* 一覧 */}
            <ul className="space-y-2 list-none">
                {categories.length === 0 ? (
                    <p className="text-muted-foreground">カテゴリがありません</p>
                ) : (
                    categories.map(c => (
                        <li key={c.id} className="flex items-center justify-between rounded-lg border p-3 bg-card">
                            <div className="flex items-center gap-3">
                                <span
                                    className="size-8 rounded-xl"
                                    style={{ backgroundColor: c.color ?? "#ccc" }}
                                />
                                <span>{c.name}</span>
                                <Badge className={c.type === "INCOME" ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                                    : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}>
                                    {c.type === "INCOME" ? "収入" : "支出"}
                                </Badge>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => openEdit(c)}>編集</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(c.id!)}>削除</Button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {/* 追加・編集ダイアログ */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-card">
                    <DialogHeader>
                        <DialogTitle>{editing ? "カテゴリを編集" : "カテゴリを追加"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label>名前 <span className="text-destructive">*</span></Label>
                            <Input
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="食費"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>種別 <span className="text-destructive">*</span></Label>
                            <div className="flex gap-2">
                                {(["EXPENSE", "INCOME"] as CategoryType[]).map(t => (
                                    <Button
                                        key={t}
                                        type="button"
                                        variant={form.type === t ? "default" : "outline"}
                                        onClick={() => setForm(f => ({ ...f, type: t }))}
                                    >
                                        {t === "EXPENSE" ? "支出" : "収入"}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>色</Label>
                            <input
                                type="color"
                                value={form.color}
                                onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                                className="h-10 w-16 cursor-pointer rounded border"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex justify-center sm:justify-center">
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>キャンセル</Button>
                        <Button onClick={onSubmit} disabled={!form.name}>
                            {editing ? "更新" : "追加"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}