import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-lg font-bold">
              🥗
            </div>
            <span className="text-xl font-bold text-white">ProteinBox</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/suggestions"
              className={`transition-colors ${
                isActive("/suggestions")
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`transition-colors ${
                isActive("/dashboard")
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/progress"
              className={`transition-colors ${
                isActive("/progress")
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Progress
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-yellow-400 transition text-lg"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            <Link
              to="/profile"
              className="text-gray-300 hover:text-white transition flex items-center space-x-1"
            >
              <span>👤</span>
              <span className="hidden md:inline text-sm">{user?.name || "Profile"}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
