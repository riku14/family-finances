import { client } from "@/api/client";

export const fetchTransactions = async (workspaceId: number, yearMonth: string) => {
  const { data, error } = await client.GET("/api/workspaces/{workspaceId}/transactions", {
    params: {
      path: { workspaceId },
      query: { yearMonth },
    },
  });
  if (error) throw error;
  return data;
};
