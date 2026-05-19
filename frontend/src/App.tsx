import { Route, Routes } from "react-router"
import { LoginPage } from "./features/auth/pages/LoginPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<div>ダッシュボード</div>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
