import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import LandingPage from "./components/landingpage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import LogFood from "./pages/LogFood";
import Suggestions from "./pages/Suggestions";
import OrderConfirmation from "./pages/OrderConfirmation";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

function AppRoutes() {
  const { isAuthenticated, user } = useUser();

  return (
    <>
      <Routes>
        {/* Landing Page - accessible to everyone */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Routes - always available */}
        <Route path="/login" element={<Login />} />

        {/* Authenticated Routes */}
        {isAuthenticated && (
          <>
            <Navbar />
            {!user?.onboardingComplete ? (
              <>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="*" element={<Navigate to="/onboarding" />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<LogFood />} />
                <Route path="/suggestions" element={<Suggestions />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="*" element={<Navigate to="/suggestions" />} />
              </>
            )}
          </>
        )}

        {/* Redirect unauthenticated users to landing page */}
        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </>
  );
}

function AppLayout() {
  const { isDark } = useTheme();
  
  return (
    <div
      style={{
        backgroundColor: isDark ? "#0f172a" : "#ffffff",
        color: isDark ? "#ffffff" : "#000000",
        transition: "background-color 0.3s, color 0.3s",
      }}
      className="min-h-screen"
    >
      <AppRoutes />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppLayout />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;