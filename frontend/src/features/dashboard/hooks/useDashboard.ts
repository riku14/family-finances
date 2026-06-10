import { useEffect, useState } from "react";
import { fetchTransactions } from "../api";
import type { components } from "@/api/schema";
import { getErrorMessage } from "@/lib/apiError";

interface Summary {
  income: number;
  expense: number;
  balance: number;
}

type Transaction = components["schemas"]["TransactionResponse"];

export const useDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const workspaceId = Number(localStorage.getItem("workspace_id"));
      const yearMonth = new Date().toISOString().slice(0, 7);

      try {
        const data = await fetchTransactions(workspaceId, yearMonth);
        const list = data.transactions ?? [];

        const income = list
          .filter((t) => t.type === "INCOME")
          .reduce((sum, t) => sum + (t.amount ?? 0), 0);
        const expense = list
          .filter((t) => t.type === "EXPENSE")
          .reduce((sum, t) => sum + (t.amount ?? 0), 0);

        setTransactions(list);
        setSummary({ income, expense, balance: income - expense });
      } catch (e) {
        setError(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);
  return { transactions, summary, loading, error };
};
