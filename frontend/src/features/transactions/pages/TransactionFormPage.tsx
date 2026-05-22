import type { components } from "@/api/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategories } from "@/features/categories/hooks/useCategories"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { useTransactions } from "../hooks/useTransactions"

type Transaction = components["schemas"]["TransactionResponse"]
type TransactionType = "INCOME" | "EXPENSE"

interface FormState {
    categoryId: number | ""
    type: TransactionType
    amount: number | ""
    date: string
    memo: string
}

const defaultForm: FormState = {
    categoryId: "",
    type: "EXPENSE",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    memo: "",
}

export const TransactionFormPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const isEdit = id !== undefined
    const transaction = location.state?.transaction as Transaction | undefined

    const { handleCreate, handleUpdate } = useTransactions()
    const { categories } = useCategories()

    const [form, setForm] = useState<FormState>(() => {
        if (isEdit && transaction) {
            return {
                categoryId: transaction.categoryId ?? "",
                type: transaction.type ?? "EXPENSE",
                amount: transaction.amount ?? "",
                date: transaction.date ?? "",
                memo: transaction.memo ?? "",
            }
        }
        return defaultForm
    })

    const onSubmit = async () => {
        if (form.categoryId === "" || form.amount === "") return
        const body = {
            categoryId: Number(form.categoryId),
            type: form.type,
            amount: Number(form.amount),
            date: form.date,
            memo: form.memo || undefined,
        }
        if (isEdit) {
            await handleUpdate(Number(id), body)
        } else {
            await handleCreate(body)
        }
        navigate("/transactions")
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <h1>収支登録</h1>
            </div>

            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {isEdit ? "編集内容を入力" : "収支情報を入力"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* 種別トグル */}
                        <div className="flex rounded-lg overflow-hidden border border-border">
                            <button
                                type="button"
                                onClick={() => setForm(f => ({ ...f, type: "EXPENSE", categoryId: "" }))}
                                className={`flex-1 py-2 text-sm font-medium transition-colors ${form.type === "EXPENSE" ? "bg-red-500 text-white" : "bg-background text-muted-foreground hover:bg-muted"}`}
                            >
                                支出
                            </button>
                            <button
                                type="button"
                                onClick={() => setForm(f => ({ ...f, type: "INCOME", categoryId: "" }))}
                                className={`flex-1 py-2 text-sm font-medium transition-colors ${form.type === "INCOME" ? "bg-green-500 text-white" : "bg-background text-muted-foreground hover:bg-muted"}`}
                            >
                                収入
                            </button>
                        </div>
                        <div className="space-y-1.5">
                            <Label>金額（円）<span className="text-destructive"> *</span></Label>
                            <Input
                                type="number" min={1} value={form.amount}
                                onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))}
                                placeholder="1500"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label>日付<span className="text-destructive"> *</span></Label>
                            <Input
                                type="date" value={form.date}
                                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label>カテゴリ<span className="text-destructive"> *</span></Label>
                            <Select
                                value={form.categoryId === "" ? "" : String(form.categoryId)}
                                onValueChange={v => setForm(f => ({ ...f, categoryId: Number(v) }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="カテゴリを選択" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.filter(c => c.type === form.type).map(c => (
                                        <SelectItem key={c.id} value={String(c.id)}>
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color ?? "#ccc" }} />
                                                {c.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label>メモ</Label>
                            <Input
                                value={form.memo}
                                onChange={e => setForm(f => ({ ...f, memo: e.target.value }))}
                                placeholder="ランチ代"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className=" bg-card border-none">
                        <Button onClick={onSubmit} disabled={form.categoryId === "" || form.amount === ""} className=" w-full p-5">
                            保存
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
