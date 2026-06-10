import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useWorkspaces } from "../hooks/useWorkspaces";
import { createInvitation, acceptInvitation } from "../api";
import { getErrorMessage } from "@/lib/apiError";
import { toast } from "sonner";

type DialogMode = "create" | "invite" | null;

export const WorkspacesPage = () => {
  const { loading, error, data, handleCreate } = useWorkspaces();
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [name, setName] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("invite");
    if (!token) return;

    setSearchParams((prev) => {
      prev.delete("invite");
      return prev;
    });

    acceptInvitation({ inviteToken: token })
      .then(() => {
        toast.success("グループに参加しました");
        navigate(0);
      })
      .catch(() => {
        toast.error("招待リンクが無効または期限切れです");
      });
  }, [navigate, searchParams, setSearchParams]);

  const closeDialog = () => {
    setDialogMode(null);
    setName("");
    setGeneratedLink(null);
  };

  const onCreateSubmit = async () => {
    await handleCreate({ name });
    closeDialog();
  };

  const onGenerateInvite = async (workspaceId: number) => {
    try {
      const result = await createInvitation(workspaceId);
      const inviteLink = `${window.location.origin}/workspace?invite=${result?.inviteToken}`;
      setGeneratedLink(inviteLink);
      setDialogMode("invite");
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>ワークスペース</h1>
        <Button onClick={() => setDialogMode("create")}>＋ グループ作成</Button>
      </div>

      {/* 一覧 */}
      <ul className="space-y-2 list-none">
        {!data || data.length === 0 ? (
          <p className="text-muted-foreground">ワークスペースがありません</p>
        ) : (
          data.map((ws) => (
            <li
              key={ws.workspaceId}
              className="flex items-center justify-between rounded-lg border p-4 bg-card"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">{ws.workspaceName}</span>
                <Badge variant={ws.type === "PERSONAL" ? "secondary" : "default"}>
                  {ws.type === "PERSONAL" ? "個人" : "グループ"}
                </Badge>
                {ws.role && (
                  <Badge variant="outline">{ws.role === "ADMIN" ? "管理者" : "メンバー"}</Badge>
                )}
              </div>
              {ws.type === "GROUP" && ws.role === "ADMIN" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onGenerateInvite(ws.workspaceId!)}
                >
                  招待リンク発行
                </Button>
              )}
            </li>
          ))
        )}
      </ul>

      {/* グループ作成ダイアログ */}
      <Dialog open={dialogMode === "create"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>グループ作成</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <Label>
              グループ名 <span className="text-destructive">*</span>
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="家族の家計簿"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              キャンセル
            </Button>
            <Button onClick={onCreateSubmit} disabled={!name}>
              作成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 招待リンク表示ダイアログ */}
      <Dialog open={dialogMode === "invite"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>招待リンク</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <Label>以下のリンクを招待したい相手に共有してください</Label>
            <Input value={generatedLink ?? ""} readOnly />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(generatedLink ?? "");
                toast.success("コピーしました");
                closeDialog();
              }}
            >
              コピー
            </Button>
            <Button variant="outline" onClick={closeDialog}>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
