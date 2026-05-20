import { Link, Outlet } from "react-router"

export const AuthenticatedLayout = () => {
    return (
        <div className="flex h-screen">
            {/* サイドバー */}
            <aside className="w-64 border-r bg-muted/40 p-4 space-y-2">
                <h2 className="text-primary">家計簿</h2>
                <nav className="flex flex-col gap-2">
                    <Link to="/dashboard">ダッシュボード</Link>
                    <Link to="/categories">カテゴリ</Link>
                    <Link to="/transactions">収支履歴</Link>
                </nav>
            </aside>

            {/* メインコンテンツ */}
            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>

    )
}