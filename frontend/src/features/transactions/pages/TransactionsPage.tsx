import type { components } from "@/api/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTransactionList } from "../hooks/useTransactionList";

type Transaction = components["schemas"]["TransactionResponse"];
type TransactionType = "INCOME" | "EXPENSE";

interface FormState {
  categoryId: number | "";
  type: TransactionType;
  amount: number | "";
  date: string;
  memo: string;
}

const defaultForm: FormState = {
  categoryId: "",
  type: "EXPENSE",
  amount: "",
  date: new Date().toISOString().split("T")[0],
  memo: "",
};

const DAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"];

const formatDateHeader = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日（${DAY_NAMES[d.getDay()]}）`;
};

const formatDateShort = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
};

const toYearMonthStr = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const TransactionsPage = () => {
  const { yearMonth, setYearMonth, transactions, loading, error, handleUpdate, handleDelete } =
    useTransactionList();
  const { categories } = useCategories();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);

  // 年月ナビゲーション
  const [year, month] = yearMonth.split("-").map(Number);
  const prevMonth = () => setYearMonth(toYearMonthStr(new Date(year, month - 2)));
  const nextMonth = () => setYearMonth(toYearMonthStr(new Date(year, month)));

  // 月次サマリー
  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((s, t) => s + (t.amount ?? 0), 0);
    const expense = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((s, t) => s + (t.amount ?? 0), 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  // 日付でグループ化（降順）
  const groupedByDate = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    transactions.forEach((t) => {
      const date = t.date ?? "";
      if (!groups[date]) groups[date] = [];
      groups[date].push(t);
    });
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [transactions]);

  // 日次合計
  const dailyNet = (txs: Transaction[]) =>
    txs.reduce((sum, t) => sum + (t.type === "INCOME" ? (t.amount ?? 0) : -(t.amount ?? 0)), 0);

  const openEdit = (t: Transaction) => {
    setEditing(t);
    setForm({
      categoryId: t.categoryId ?? "",
      type: t.type ?? "EXPENSE",
      amount: t.amount ?? "",
      date: t.date ?? "",
      memo: t.memo ?? "",
    });
    setDialogOpen(true);
  };

  const onSubmit = async () => {
    if (form.categoryId === "" || form.amount === "") return;
    const body = {
      categoryId: Number(form.categoryId),
      type: form.type,
      amount: Number(form.amount),
      date: form.date,
      memo: form.memo || undefined,
    };
    if (editing) await handleUpdate(editing.id!, body);

    setDialogOpen(false);
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="space-y-4">
      {/* ページヘッダー */}
      <div className="flex items-center justify-between">
        <h1>履歴一覧</h1>
      </div>

      {/* 月ナビ＋サマリーカード */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* 月ナビ */}
          <div className="flex items-center justify-between px-6 py-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-base font-bold">
              {year}年{month}月
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          {/* 月次サマリー */}
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="px-4 py-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">収入</p>
              <p className="font-bold text-green-600">¥{summary.income.toLocaleString()}</p>
            </div>
            <div className="px-4 py-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">支出</p>
              <p className="font-bold text-red-500">¥{summary.expense.toLocaleString()}</p>
            </div>
            <div className="px-4 py-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">収支</p>
              <p
                className={`font-bold ${summary.balance >= 0 ? "text-green-600" : "text-red-500"}`}
              >
                {summary.balance >= 0 ? "+" : "−"}¥{Math.abs(summary.balance).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 日付グループ */}
      {groupedByDate.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border border-dashed rounded-xl">
          <p className="text-sm">この月の取引データがありません</p>
        </div>
      ) : (
        <div className="space-y-3">
          {groupedByDate.map(([date, txs]) => {
            const net = dailyNet(txs);
            return (
              <Card key={date} className="overflow-hidden py-0 gap-0">
                {/* 日付ヘッダー */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b">
                  <span className="text-sm font-semibold">{formatDateHeader(date)}</span>
                  <span
                    className={`text-sm font-semibold ${net >= 0 ? "text-green-600" : "text-red-500"}`}
                  >
                    {net >= 0 ? "+" : "−"}¥{Math.abs(net).toLocaleString()}
                  </span>
                </div>
                {/* トランザクション行 */}
                <CardContent className="p-0">
                  {txs.map((t, i) => (
                    <div key={t.id}>
                      {i > 0 && <Separator />}
                      <div className="flex items-center gap-3 px-4 py-3">
                        {/* カテゴリカラーバー */}
                        <span
                          className="w-1 h-10 rounded-full shrink-0"
                          style={{ backgroundColor: t.categoryColor ?? "#ccc" }}
                        />
                        {/* カテゴリ名 ＋ ユーザーバッジ ＋ メモ */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{t.categoryName}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                              {t.registeredBy}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {formatDateShort(date)}
                            {t.memo ? ` · ${t.memo}` : ""}
                          </p>
                        </div>
                        {/* 金額 */}
                        <span
                          className={`font-semibold text-sm whitespace-nowrap ${t.type === "INCOME" ? "text-green-600" : "text-red-500"}`}
                        >
                          {t.type === "INCOME" ? "+" : "−"}¥{(t.amount ?? 0).toLocaleString()}
                        </span>
                        {/* 編集・削除 */}
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground"
                            onClick={() => openEdit(t)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>削除しますか？</AlertDialogTitle>
                                <AlertDialogDescription>
                                  この取引を削除します。この操作は取り消せません。
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(t.id!)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  削除
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* 追加・編集ダイアログ */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) setDialogOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle>{editing ? "収支を編集" : "収支を追加"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* 種別トグル */}
            <div className="flex rounded-lg overflow-hidden border border-border">
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: "EXPENSE", categoryId: "" }))}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${form.type === "EXPENSE" ? "bg-red-500 text-white" : "bg-background text-muted-foreground hover:bg-muted"}`}
              >
                支出
              </button>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: "INCOME", categoryId: "" }))}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${form.type === "INCOME" ? "bg-green-500 text-white" : "bg-background text-muted-foreground hover:bg-muted"}`}
              >
                収入
              </button>
            </div>
            <div className="space-y-1.5">
              <Label>
                金額（円）<span className="text-destructive"> *</span>
              </Label>
              <Input
                type="number"
                min={1}
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
                placeholder="1500"
              />
            </div>
            <div className="space-y-1.5">
              <Label>
                日付<span className="text-destructive"> *</span>
              </Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>
                カテゴリ<span className="text-destructive"> *</span>
              </Label>
              <Select
                value={form.categoryId === "" ? "" : String(form.categoryId)}
                onValueChange={(v) => setForm((f) => ({ ...f, categoryId: Number(v) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.type === form.type)
                    .map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: c.color ?? "#ccc" }}
                          />
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
                onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))}
                placeholder="ランチ代"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            {editing && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-destructive border-destructive/30 hover:bg-destructive/10 mr-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    削除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      この取引を削除します。この操作は取り消せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        await handleDelete(editing.id!);
                        setDialogOpen(false);
                      }}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      削除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={onSubmit} disabled={form.categoryId === "" || form.amount === ""}>
              {editing ? "更新" : "追加"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
