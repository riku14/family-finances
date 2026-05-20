import { Navigate, Route, Routes } from "react-router"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
import { PrivateRoute } from "./components/PrivateRoute"
import { AuthenticatedLayout } from "./components/layouts/AuthenticatedLayout"
import { DashboardPage } from "./features/dashboard/pages/DashboardPage"
import { CategoriesPage } from "./features/categories/pages/CategoriesPage"

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
        </Route>
      </Route>
    </Routes>
  )
}

export default App
