import { client } from "@/api/client";

// ワークスペース一覧取得
export const fetchWorkspaces = async (type?: "PERSONAL" | "GROUP") => {
  const { data, error } = await client.GET("/api/workspaces", {
    params: { query: { type } },
  });
  if (error) throw error;
  return data;
};

// ワークスペース作成
export const createWorkspace = async (body: { name?: string }) => {
  const { data, error } = await client.POST("/api/workspaces", {
    body,
  });
  if (error) throw error;
  return data;
};

// ワークスペース参加
export const acceptInvitation = async (body: { inviteToken: string }) => {
  const { data, error } = await client.POST("/api/workspaces/invitations/accept", {
    body,
  });
  if (error) throw error;
  return data;
};

// ワークスペース招待
export const createInvitation = async (workspaceId: number) => {
  const { data, error } = await client.POST("/api/workspaces/{workspaceId}/invitations", {
    params: { path: { workspaceId } },
    body: {},
  });
  if (error) throw error;
  return data;
};
