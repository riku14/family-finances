import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api";
import { getErrorMessage } from "@/lib/apiError";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      localStorage.setItem("access_token", data.accessToken);

      // 個人ワークスペース（type: "PERSONAL")を取得して保存
      const personalWorkspace = data.workspaces.find((ws) => ws.type === "PERSONAL");
      if (personalWorkspace) {
        localStorage.setItem("workspace_id", String(personalWorkspace.workspaceId));
        localStorage.setItem(
          "workspace_name",
          String(personalWorkspace.workspaceName ?? "個人ワークスペース")
        );
      }
      navigate("/");
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
};
