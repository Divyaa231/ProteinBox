import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function OrderConfirmation() {
  const navigate = useNavigate();
  const { user } = useUser();

  const orderMacros = {
    protein: 64,
    calories: 480,
    carbs: 38,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-r from-green-400 to-green-600 flex items-center justify-center text-5xl shadow-lg">
            ✓
          </div>
          <h1 className="text-4xl font-bold mb-2">Order Placed!</h1>
          <p className="text-gray-400 text-lg">Your protein box is on its way to you</p>
        </div>

        {/* Order Details */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6 pb-6 border-b border-slate-700">
            <div className="flex justify-between">
              <span className="text-gray-400">Order ID:</span>
              <span className="font-mono font-bold">#ORD-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Customer:</span>
              <span className="font-bold">{user?.name || "User"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estimated Delivery:</span>
              <span className="font-bold">30 - 45 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="px-3 py-1 rounded-full bg-green-900 text-green-400 text-sm font-semibold">Confirmed</span>
            </div>
          </div>

          <div className="space-y-4 mb-6 pb-6 border-b border-slate-700">
            <h3 className="font-semibold text-lg">Macro Impact</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <p className="text-cyan-400 font-bold text-2xl">+{orderMacros.protein}g</p>
                <p className="text-xs text-gray-400 mt-1">Protein</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <p className="text-orange-400 font-bold text-2xl">+{orderMacros.calories}</p>
                <p className="text-xs text-gray-400 mt-1">Calories</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <p className="text-yellow-400 font-bold text-2xl">+{orderMacros.carbs}g</p>
                <p className="text-xs text-gray-400 mt-1">Carbs</p>
              </div>
            </div>
          </div>

          <div className="bg-green-900 rounded-lg p-4 mb-6 border border-green-700">
            <p className="text-green-400 font-semibold mb-1">✅ Your daily protein goal will be met!</p>
            <p className="text-sm text-green-300">
              Great job staying on track with your nutrition goals.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 font-bold text-black hover:from-green-500 hover:to-green-700 transition"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate("/suggestions")}
            className="w-full py-3 rounded-lg bg-slate-700 font-bold text-white hover:bg-slate-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
}

export default OrderConfirmation;
