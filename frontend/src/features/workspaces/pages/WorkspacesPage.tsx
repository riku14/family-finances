import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useWorkspaces } from "../hooks/useWorkspaces"
import { createInvitation } from "../api"
import { getErrorMessage } from "@/lib/apiError"
import { toast } from "sonner"

type DialogMode = "create" | "join" | "invite" | null

export const WorkspacesPage = () => {
    const { loading, error, data, handleCreate, handleAcceptInvitation } = useWorkspaces()
    const [dialogMode, setDialogMode] = useState<DialogMode>(null)
    const [name, setName] = useState("")
    const [inviteToken, setInviteToken] = useState("")
    const [generatedToken, setGeneratedToken] = useState<string | null>(null)


    const closeDialog = () => {
        setDialogMode(null)
        setName("")
        setInviteToken("")
        setGeneratedToken(null)
    }

    const onCreateSubmit = async () => {
        await handleCreate({ name })
        closeDialog()
    }

    const onJoinSubmit = async () => {
        await handleAcceptInvitation({ inviteToken })
        closeDialog()
    }

    const onGenerateInvite = async (workspaceId: number) => {
        try {
            const result = await createInvitation(workspaceId)
            setGeneratedToken(result?.inviteToken ?? null)
            setDialogMode("invite")
        } catch (e) {
            toast.error(getErrorMessage(e))
        }
    }

    if (loading) return <p>読み込み中...</p>
    if (error) return <p className="text-destructive">{error}</p>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1>ワークスペース</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setDialogMode("join")}>招待で参加</Button>
                    <Button onClick={() => setDialogMode("create")}>＋ グループ作成</Button>
                </div>
            </div>

            {/* 一覧 */}
            <ul className="space-y-2 list-none">
                {!data || data.length === 0 ? (
                    <p className="text-muted-foreground">ワークスペースがありません</p>
                ) : (
                    data.map(ws => (
                        <li key={ws.workspaceId} className="flex items-center justify-between rounded-lg border p-4
bg-card">
                            <div className="flex items-center gap-3">
                                <span className="font-medium">{ws.workspaceName}</span>
                                <Badge variant={ws.type === "PERSONAL" ? "secondary" : "default"}>
                                    {ws.type === "PERSONAL" ? "個人" : "グループ"}
                                </Badge>
                                {ws.role && (
                                    <Badge variant="outline">
                                        {ws.role === "ADMIN" ? "管理者" : "メンバー"}
                                    </Badge>
                                )}
                            </div>
                            {ws.type === "GROUP" && ws.role === "ADMIN" && (
                                <Button variant="outline" size="sm" onClick={() => onGenerateInvite(ws.workspaceId!)}>
                                    招待リンク発行
                                </Button>
                            )}
                        </li>
                    ))
                )}
            </ul>

            {/* グループ作成ダイアログ */}
            <Dialog open={dialogMode === "create"} onOpenChange={open => !open && closeDialog()}>
                <DialogContent className="bg-card">
                    <DialogHeader>
                        <DialogTitle>グループ作成</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-2">
                        <Label>グループ名 <span className="text-destructive">*</span></Label>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="家族の家計簿"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDialog}>キャンセル</Button>
                        <Button onClick={onCreateSubmit} disabled={!name}>作成</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* 招待で参加ダイアログ */}
            <Dialog open={dialogMode === "join"} onOpenChange={open => !open && closeDialog()}>
                <DialogContent className="bg-card">
                    <DialogHeader>
                        <DialogTitle>招待で参加</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-2">
                        <Label>招待トークン <span className="text-destructive">*</span></Label>
                        <Input
                            value={inviteToken}
                            onChange={e => setInviteToken(e.target.value)}
                            placeholder="トークンを貼り付け"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDialog}>キャンセル</Button>
                        <Button onClick={onJoinSubmit} disabled={!inviteToken}>参加</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* 招待トークン表示ダイアログ */}
            <Dialog open={dialogMode === "invite"} onOpenChange={open => !open && closeDialog()}>
                <DialogContent className="bg-card">
                    <DialogHeader>
                        <DialogTitle>招待トークン</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-2">
                        <Label>以下のトークンを招待したい相手に共有してください</Label>
                        <Input value={generatedToken ?? ""} readOnly />
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(generatedToken ?? "")
                                toast.success("コピーしました")
                            }}
                        >
                            コピー
                        </Button>
                        <Button variant="outline" onClick={closeDialog}>閉じる</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}