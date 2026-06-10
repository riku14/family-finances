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
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error, loading } = useLogin();

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-rose-50 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          {/* TODO:ロゴ追加 */}
          <CardTitle className="text-2xl font-bold">家計簿へようこそ</CardTitle>
          <CardDescription>日々の記録を、もっと身近に。</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6 mb-6">
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
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
                <div className="flex items-center">
                  <Label htmlFor="password">パスワード</Label>
                  {/* TODO: パスワード変更画面実装 */}
                  {/* <Link to="/">
                          パスワードをお忘れですか？
                      </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full p-5" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </CardContent>
          <CardFooter className="justify-center border-none bg-card">
            <span className="text-sm">
              アカウントをお持ちでないですか？
              <Link to="/register">新規登録</Link>
            </span>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
