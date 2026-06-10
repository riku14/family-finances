import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";

export const ProfilePage = () => {
  const { name, email, loading, nameError, passwordError, handleUpdateName, handleUpdatePassword } =
    useProfile();

  const [nameInput, setNameInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // name がロードされたら input の初期値をセット
  const [nameInitialized, setNameInitialized] = useState(false);
  if (!loading && !nameInitialized) {
    setNameInput(name);
    setNameInitialized(true);
  }

  if (loading) return <p>読み込み中...</p>;

  return (
    <div className="space-y-6 max-w-lg">
      <h1>プロフィール設定</h1>

      {/* アカウント情報 */}
      <Card>
        <CardHeader>
          <CardTitle>アカウント情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>メールアドレス</Label>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="name">表示名</Label>
            <div className="flex gap-2">
              <Input id="name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
              <Button
                onClick={() => handleUpdateName(nameInput)}
                disabled={!nameInput || nameInput === name}
              >
                更新
              </Button>
            </div>
            {nameError && <p className="text-sm text-destructive">{nameError}</p>}
          </div>
        </CardContent>
      </Card>

      {/* パスワード変更 */}
      <Card>
        <CardHeader>
          <CardTitle>パスワード変更</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">現在のパスワード</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">新しいパスワード</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
          <Button
            onClick={async () => {
              const ok = await handleUpdatePassword(currentPassword, newPassword);
              if (ok) {
                setCurrentPassword("");
                setNewPassword("");
              }
            }}
            disabled={!currentPassword || !newPassword}
          >
            変更する
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
