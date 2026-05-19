import { Route, Routes } from "react-router"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<div>ダッシュボード</div>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
