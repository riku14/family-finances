import { apiUtils } from "@/lib/apiUtils";
import { createTransaction, deleteTransaction, updateTransaction } from "../api";

export const useTransactionMutations = (onSuccess?: () => void) => {
  const handleCreate = async (body: Parameters<typeof createTransaction>[0]) => {
    await apiUtils(() => createTransaction(body), "登録しました", onSuccess);
  };

  const handleUpdate = async (id: number, body: Parameters<typeof updateTransaction>[1]) => {
    await apiUtils(() => updateTransaction(id, body), "更新しました", onSuccess);
  };

  const handleDelete = async (id: number) => {
    await apiUtils(() => deleteTransaction(id), "削除しました", onSuccess);
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
