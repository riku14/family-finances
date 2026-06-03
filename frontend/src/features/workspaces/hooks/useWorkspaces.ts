import { getErrorMessage } from "@/lib/apiError";
import { apiUtils } from "@/lib/apiUtils";
import { useCallback, useEffect, useState } from "react";
import { createInvitation, createWorkspace, fetchWorkspaces } from "../api";
import type { components } from "@/api/schema";

type WorkspaceSummary = components["schemas"]["WorkspaceSummary"];

export const useWorkspaces = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WorkspaceSummary[] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        setData((await fetchWorkspaces()).workspaces ?? null);
      } catch (e) {
        setError(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshKey]);

  const handleCreate = async (body: { name?: string }) => {
    await apiUtils(() => createWorkspace(body), "登録しました", refresh);
  };

  const handleCreateInvitation = async (workspaceId: number) => {
    await apiUtils(
      () => createInvitation(workspaceId),
      "招待リンクを発行しました",
    );
  };
  return { loading, error, data, handleCreate, handleCreateInvitation };
};
