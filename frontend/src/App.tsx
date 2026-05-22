import { Navigate, Route, Routes } from "react-router"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
import { PrivateRoute } from "./components/PrivateRoute"
import { AuthenticatedLayout } from "./components/layouts/AuthenticatedLayout"
import { DashboardPage } from "./features/dashboard/pages/DashboardPage"
import { CategoriesPage } from "./features/categories/pages/CategoriesPage"
import { TransactionsPage } from "./features/transactions/pages/TransactionsPage"
import { TransactionFormPage } from "./features/transactions/pages/TransactionFormPage"

function App() {

  return (
    <Routes>
      {/* 認証不要 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* 認証必要 */}
      <Route element={<PrivateRoute />}>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/new" element={<TransactionFormPage />} />
          <Route path="/transactions/:id/edit" element={<TransactionFormPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
