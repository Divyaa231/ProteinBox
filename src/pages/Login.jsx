import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useUser();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      if (!user.onboardingComplete) {
        navigate("/onboarding");
      } else if (!user.profileComplete) {
        navigate("/profile");
      } else {
        navigate("/suggestions");
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate("/onboarding");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-4xl shadow-lg">
            💪
          </div>
          <h1 className="text-4xl font-bold mb-2">ProteinBox</h1>
          <p className="text-gray-400">Your Personal Nutrition Coach</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 font-bold text-black hover:from-green-500 hover:to-green-700 transition transform hover:scale-105"
          >
            Sign In
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Demo: Use any email and password
          </p>
        </form>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl mb-2">📊</p>
            <p className="text-xs text-gray-400">Smart Tracking</p>
          </div>
          <div>
            <p className="text-2xl mb-2">🍗</p>
            <p className="text-xs text-gray-400">Custom Meals</p>
          </div>
          <div>
            <p className="text-2xl mb-2">🎯</p>
            <p className="text-xs text-gray-400">Goal Based</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
