import { Outlet } from "react-router"

export const AuthenticatedLayout = () => {
    return (
        <div className="flex h-screen">
            {/* サイドバー */}
            <aside className="w-64 border-r bg-muted/40 p-4">
                <nav className="flex flex-col gap-2">
                    <a href="/dashboard">ダッシュボード</a>
                    <a href="/categories">カテゴリ</a>
                    <a href="/transactions">収支履歴</a>
                </nav>
            </aside>

            {/* メインコンテンツ */}
            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>

    )
}