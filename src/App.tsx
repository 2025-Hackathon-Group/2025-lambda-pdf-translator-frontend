import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { AuthProvider } from "./context/AuthContext"
import { AuthRoute, ProtectedRoute } from "./components/ProtectedRoute"
import Home from "./pages/Home"
import LoginPage from "./pages/Login"
import Navigation from "./components/Navigation"
import RegisterPage from "./pages/Register"
import TranslationPage from "./pages/TranslationPage"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/translate" element={<TranslationPage />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}
