import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ArrowLeftRight, ChevronsUpDown, CirclePlus, House, LayoutDashboard, Tag } from "lucide-react"
import { Link, Outlet, useLocation } from "react-router"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

const navItems = [
    { to: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
    { to: "/transactions/new", label: "収支登録", icon: CirclePlus },
    { to: "/transactions", label: "収支履歴", icon: ArrowLeftRight },
    { to: "/categories", label: "カテゴリ", icon: Tag },
]

export const AuthenticatedLayout = () => {
    const location = useLocation()
    const workspaceName = localStorage.getItem("workspace_name") ?? "個人ワークスペース"
    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">

                {/* ワークスペーススイッチャー */}
                <SidebarHeader className="[&_ul]:list-none">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex justify-end mb-3">
                                <SidebarTrigger />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton size="lg" tooltip={workspaceName} >
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            <House className="size-4" />
                                        </div>
                                        <div className="flex flex-col text-left text-sm leading-tight">
                                            <span className="font-semibold">家計簿</span>
                                            <span className="text-xs text-muted-foreground">{workspaceName}</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="start" className="w-56">
                                    {/* TODO: ワークスペース切り替え */}
                                    <DropdownMenuItem disabled>
                                        <House />
                                        {workspaceName}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                {/* ナビゲーション */}
                <SidebarContent className="p-2 [&_ul]:list-none">
                    <SidebarMenu>
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <SidebarMenuItem key={to}>
                                <SidebarMenuButton asChild tooltip={label} isActive={location.pathname === to}
                                    className="py-5 mb-1">
                                    <Link to={to} className="no-underline hover:no-underline">
                                        <Icon />
                                        <span>{label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>

            </Sidebar>

            {/* メインコンテンツ */}
            <SidebarInset>
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}