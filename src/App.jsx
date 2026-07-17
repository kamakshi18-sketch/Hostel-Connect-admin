import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import { NoticeProvider } from "./context/NoticeContext"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Wardens from "./pages/Wardens"
import Students from "./pages/Students"
import Security from "./pages/Security"
import Workers from "./pages/Workers"
import Meetings from "./pages/Meetings"
import StaffAttendance from "./pages/StaffAttendance"
import Notices from "./pages/Notices"
import RoomsBlocks from "./pages/RoomsBlocks"
import Reports from "./pages/Reports"
import Mess from "./pages/Mess"
import ForgotPassword from "./pages/ForgotPassword"
import CreateAccount from "./pages/CreateAccount"

export default function App() {
  return (
    <AuthProvider>
      <NoticeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wardens" element={<Wardens />} />
            <Route path="/students" element={<Students />} />
            <Route path="/security" element={<Security />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/attendance" element={<StaffAttendance />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/rooms-blocks" element={<RoomsBlocks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/mess" element={<Mess />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </NoticeProvider>
    </AuthProvider>
  )
}
