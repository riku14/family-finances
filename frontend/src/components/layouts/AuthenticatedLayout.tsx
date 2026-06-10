import type { components } from "@/api/schema";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ArrowLeftRight,
  ChevronsUpDown,
  CirclePlus,
  House,
  LayoutDashboard,
  Tag,
  Users,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type WorkspaceSummary = components["schemas"]["WorkspaceSummary"];

const navItems = [
  { to: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { to: "/transactions/new", label: "収支登録", icon: CirclePlus },
  { to: "/transactions", label: "収支履歴", icon: ArrowLeftRight },
  { to: "/categories", label: "カテゴリ", icon: Tag },
  { to: "/workspace", label: "ワークスペース管理", icon: Users },
];

export const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const workspaceId = Number(localStorage.getItem("workspace_id"));
  const workspaceName = localStorage.getItem("workspace_name") ?? "個人ワークスペース";
  const stored: WorkspaceSummary[] = JSON.parse(localStorage.getItem("workspaces") ?? "[]");
  const userName = localStorage.getItem("user_name") ?? "";
  const userEmail = localStorage.getItem("user_email") ?? "";

  const workspaces =
    stored.length > 0
      ? stored
      : [
          {
            workspaceId,
            workspaceName,
            type: "PERSONAL" as const,
            role: "ADMIN" as const,
          },
        ];
  const switchWorkspace = (ws: WorkspaceSummary) => {
    localStorage.setItem("workspace_id", String(ws.workspaceId));
    localStorage.setItem("workspace_name", String(ws.workspaceName ?? ""));
    navigate(0);
  };

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
                  <SidebarMenuButton size="lg" tooltip={workspaceName}>
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
                  {workspaces.map((ws) => (
                    <DropdownMenuItem
                      key={ws.workspaceId}
                      onClick={() => switchWorkspace(ws)}
                      disabled={ws.workspaceId === workspaceId}
                      className={ws.workspaceId === workspaceId ? "font-semibold" : ""}
                    >
                      <House />
                    </DropdownMenuItem>
                  ))}
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
                <SidebarMenuButton
                  asChild
                  tooltip={label}
                  isActive={location.pathname === to}
                  className="py-5 mb-1"
                >
                  <Link to={to} className="no-underline hover:no-underline">
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 [&_ul]:list-none">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" tooltip={userName} className="py-5">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-muted shrink-0">
                      <User className="size-4" />
                    </div>
                    <div className="flex flex-col text-left text-sm leading-tight min-w-0">
                      <span className="font-semibold truncate">{userName}</span>
                      <span className="text-xs text-muted-foreground truncate">{userEmail}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto shrink-0" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Settings className="mr-2 h-4 w-4" />
                    設定
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    ログアウト
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* メインコンテンツ */}
      <SidebarInset>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
