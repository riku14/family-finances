import { client } from "@/api/client";

const getWorkspaceId = () => Number(localStorage.getItem("workspace_id"));

// カテゴリ取得
export const fetchCategories = async () => {
  const { data, error } = await client.GET("/api/workspaces/{workspaceId}/categories", {
    params: { path: { workspaceId: getWorkspaceId() } },
  });
  if (error) throw error;
  return data;
};

// カテゴリ登録
export const createCategory = async (body: {
  name: string;
  type: "INCOME" | "EXPENSE";
  color?: string;
}) => {
  const { data, error } = await client.POST("/api/workspaces/{workspaceId}/categories", {
    params: { path: { workspaceId: getWorkspaceId() } },
    body,
  });
  if (error) throw error;
  return data;
};

// カテゴリ更新
export const updateCategory = async (
  categoryId: number,
  body: { name: string; type: "INCOME" | "EXPENSE"; color?: string }
) => {
  const { data, error } = await client.PUT(
    "/api/workspaces/{workspaceId}/categories/{categoryId}",
    {
      params: { path: { workspaceId: getWorkspaceId(), categoryId } },
      body,
    }
  );
  if (error) throw error;
  return data;
};

// カテゴリ削除
export const deleteCategories = async (categoryId: number) => {
  const { error } = await client.DELETE("/api/workspaces/{workspaceId}/categories/{categoryId}", {
    params: { path: { workspaceId: getWorkspaceId(), categoryId } },
  });
  if (error) throw error;
};
