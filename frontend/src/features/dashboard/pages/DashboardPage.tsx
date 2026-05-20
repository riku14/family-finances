import { Progress } from "@/components/ui/progress"
import { useDashboard } from "../hooks/useDashboard"

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
                        <p className="font-semibold text-text-destructive">¥{summary.expense.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">残金</p>
                        <p className="font-semibold">¥{summary.balance.toLocaleString()}</p>
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
                            <li key={t.id} className="flex justify-between rounded-lg border p-3  bg-card shadow-lg">
                                <div>
                                    <span className="font-medium">{t.categoryName}</span>
                                    {t.memo && (
                                        <span className="ml-2 text-sm text-muted-foreground">{t.memo}</span>
                                    )}
                                    <p className="text-xs text-muted-foreground">{t.date}</p>
                                </div>
                                <span className={t.type === "INCOME" ? "text-green-600" : "text-text-destructive"}>
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