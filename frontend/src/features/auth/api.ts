import { client } from "../../api/client";

export const login = async (email: string, password: string) => {
  const { data, error } = await client.POST("/api/auth/login", {
    body: { email, password },
  });

  if (error) throw error;
  if (!data) throw new Error("レスポンスデータがありません");
  return data;
};

export const register = async (name: string, email: string, password: string) => {
  const { data, error } = await client.POST("/api/users", {
    body: { name, email, password },
  });
  if (error) throw error;
  if (!data) throw new Error("レスポンスデータがありません");
  return data;
};

export const getMe = async () => {
  const { data, error } = await client.GET("/api/users/me");
  if (error) throw error;
  if (!data) throw new Error("レスポンスデータがありません");
  return data;
};

export const updateProfile = async (name: string) => {
  const { data, error } = await client.PATCH("/api/users/me", {
    body: { name },
  });
  if (error) throw error;
  if (!data) throw new Error("レスポンスデータがありません");
  return data;
};

export const updatePassword = async (currentPassword: string, newPassword: string) => {
  const { data, error } = await client.PATCH("/api/users/me/password", {
    body: { currentPassword, newPassword },
  });
  if (error) throw error;
  if (!data) throw new Error("レスポンスデータがありません");
  return data;
};
