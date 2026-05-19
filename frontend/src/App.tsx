import { Route, Routes } from "react-router"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
import { PrivateRoute } from "./components/PrivateRoute"
import { AuthenticatedLayout } from "./components/layouts/AuthenticatedLayout"

function App() {

  return (
    <Routes>
      {/* 認証不要 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* 認証必要 */}
      <Route element={<PrivateRoute />}>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<div>ダッシュボード</div>} />
          <Route path="/dashboard" element={<div>ダッシュボード（仮）</div>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
