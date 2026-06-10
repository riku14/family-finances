import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, error, loading } = useRegister();

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister(name, email, password);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-rose-50 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          {/* TODO:ロゴ追加 */}
          <CardTitle className="text-2xl font-bold">アカウント登録</CardTitle>
          <CardDescription>今日から始める、新しいお金の管理。</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6 mb-6">
              <div className="grid gap-2">
                <Label htmlFor="name">ニックネーム</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="貯金太郎"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">
                  メールアドレス<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  パスワード<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">8文字以上の英数字</p>
              </div>
            </div>
            <Button type="submit" className="w-full p-5" disabled={loading}>
              {loading ? "登録中..." : "登録"}
            </Button>
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </CardContent>
          <CardFooter className="justify-center border-none bg-card">
            <span className="text-sm">
              すでにアカウントをお持ちですか？
              <Link to="/login">ログイン</Link>
            </span>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
