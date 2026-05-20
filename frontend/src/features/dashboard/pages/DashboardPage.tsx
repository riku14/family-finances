import { Progress } from "@/components/ui/progress"
import { useDashboard } from "../hooks/useDashboard"
import { Badge } from "@/components/ui/badge"

export const DashboardPage = () => {
    const { transactions, summary, loading, error } = useDashboard()

    if (loading) return <p>読み込み中...</p>
    if (error) return <p className="text-red-500">{error}</p>

    const usagePercent = summary.income > 0 ? Math.min(Math.round((summary.expense / summary.income) * 100), 100) : 0

    return (
        <div className="space-y-6">
            <h1>ダッシュボード</h1>

            {/* プログレスバー */}
            <div className="rounded-lg border p-6 space-y-4  bg-card shadow-lg">
                <div className="space-y-1">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>今月の支出割合</span>
                        <span>{usagePercent}%</span>
                    </div>
                    <Progress value={usagePercent} />
                </div>

                <div className="flex justify-between text-sm">
                    <div>
                        <p className="text-muted-foreground">収入</p>
                        <p className="font-semibold text-green-600">¥{summary.income.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">支出</p>
                        <p className="font-semibold text-destructive">¥{summary.expense.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">残金</p>
                        <p className={`font-semibold ${summary.balance >= 0 ? "text-green-600" : "text-destructive"}`}>
                            {summary.balance >= 0 ? "+" : "-"}¥{Math.abs(summary.balance).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* 直近の収支 */}
            <div className="space-y-2">
                <h2>最近の収支</h2>
                {transactions.length === 0 ? (
                    <p className="text-muted-foreground">今月の収支はまだありません</p>
                ) : (
                    <ul className="space-y-2 list-none">
                        {transactions.slice(0, 5).map(t => (
                            <li key={t.id} className="flex justify-between rounded-lg border border-l-4 p-3 bg-card shadow-lg"
                                style={{ borderLeftColor: t.categoryColor ?? "#ccc" }}>
                                <div>
                                    <span className="font-medium">{t.categoryName}</span>
                                    {t.memo && (
                                        <span className="mx-2 text-sm text-muted-foreground">{t.memo}</span>
                                    )}
                                    <Badge className={t.type === "INCOME" ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                                        : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}>
                                        {t.type === "INCOME" ? "収入" : "支出"}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground">{t.date}</p>
                                </div>
                                <span className={t.type === "INCOME" ? "text-green-600" : "text-destructive"}>
                                    {t.type === "INCOME" ? "+" : "-"}¥{(t.amount ?? 0).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}