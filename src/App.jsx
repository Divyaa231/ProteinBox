import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import LandingPage from "./components/Landingpage";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import LogFood from "./pages/LogFood";
import Suggestions from "./pages/Suggestions";
import OrderConfirmation from "./pages/OrderConfirmation";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page - accessible to everyone */}
      <Route path="/" element={<LandingPage />} />

        {/* Public Routes - always available */}
        <Route path="/login" element={<Login />} />

        {/* Authenticated Routes */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/logfood" element={<LogFood />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={<Profile />} />

        {/* Catch all - redirect to landing if not authenticated */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-black">
      <AppRoutes />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppLayout />
    </UserProvider>
  );
}

export default App;