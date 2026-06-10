import { useEffect, useState } from "react";
import { getMe, updatePassword, updateProfile } from "../api";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/apiError";

export const useProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    getMe()
      .then((data) => {
        setName(data.name ?? "");
        setEmail(data.email ?? "");
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUpdateName = async (newName: string) => {
    setNameError(null);
    try {
      await updateProfile(newName);
      setName(newName);
      localStorage.setItem("user_name", newName);
      toast.success("表示名を更新しました");
    } catch (e) {
      setNameError(getErrorMessage(e));
    }
  };

  const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
    setPasswordError(null);
    try {
      await updatePassword(currentPassword, newPassword);
      toast.success("パスワードを更新しました");
      return true;
    } catch (e) {
      setPasswordError(getErrorMessage(e));
      return false;
    }
  };

  return { name, email, loading, nameError, passwordError, handleUpdateName, handleUpdatePassword };
};
