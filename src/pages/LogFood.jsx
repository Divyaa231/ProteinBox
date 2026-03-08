import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";

function LogFood() {
  const navigate = useNavigate();
  const { user, foodLog, getTodayFoodLog, getTodayProteinConsumed, removeFoodLog } = useUser();
  const [showAddFood, setShowAddFood] = useState(false);
  const [foodInput, setFoodInput] = useState({ name: "", protein: "", calories: "" });

  if (!user?.onboardingComplete) {
    return <div>Please complete onboarding first</div>;
  }

  const proteinTarget = user.calculations?.proteinTarget || 120;
  const consumedToday = getTodayProteinConsumed();
  const proteinRemaining = proteinTarget - consumedToday;
  const proteinPercentage = (consumedToday / proteinTarget) * 100;
  const todayFood = getTodayFoodLog();

  const handleAddFood = (e) => {
    e.preventDefault();
    if (foodInput.name && foodInput.protein) {
      // This would be added via context in a real app
      setFoodInput({ name: "", protein: "", calories: "" });
      setShowAddFood(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 animate-slide-in-up">Welcome, {user.name}! 👋</h1>
        <p className="text-gray-400 mb-8 animate-slide-in-up stagger-1">Your daily nutrition dashboard</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Protein Status */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 animate-slide-in-up stagger-2">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Today's Protein Intake</h2>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-cyan-400 font-bold text-2xl">{Math.round(consumedToday)}g</span>
                <span className="text-gray-400">/ {proteinTarget}g</span>
              </div>
              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-300"
                  style={{ width: `${Math.min(proteinPercentage, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              {proteinRemaining > 0
                ? `${Math.round(proteinRemaining)}g remaining`
                : "✓ Goal reached! Great job!"}
            </p>
          </div>

          {/* Your Goals */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 animate-slide-in-up stagger-3">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Your Goals</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Calories:</span>
                <span className="font-bold text-orange-400">{user.calculations?.tdee || 2400}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Goal:</span>
                <span className="font-bold capitalize text-green-400">{user.goal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Activity:</span>
                <span className="font-bold capitalize text-blue-400">{user.activityLevel}</span>
              </div>
            </div>
          </div>

          {/* Macro Targets */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 animate-slide-in-up stagger-4">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Daily Macro Targets</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-cyan-400">Protein:</span>
                <span className="font-bold">{user.calculations?.macros?.protein || 150}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-400">Carbs:</span>
                <span className="font-bold">{user.calculations?.macros?.carbs || 300}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">Fats:</span>
                <span className="font-bold">{user.calculations?.macros?.fats || 80}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Food Log */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 mb-8 animate-slide-in-up stagger-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Today's Food Log</h2>
            <button
              onClick={() => setShowAddFood(!showAddFood)}
              className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-600 transition"
            >
              + Add Food
            </button>
          </div>

          {showAddFood && (
            <form onSubmit={handleAddFood} className="bg-slate-700 rounded-lg p-4 mb-6 animate-slide-in-up stagger-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Food name"
                  value={foodInput.name}
                  onChange={(e) => setFoodInput({ ...foodInput, name: e.target.value })}
                  className="p-2 rounded bg-slate-600 border border-slate-500 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={foodInput.protein}
                  onChange={(e) => setFoodInput({ ...foodInput, protein: e.target.value })}
                  className="p-2 rounded bg-slate-600 border border-slate-500 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Calories"
                  value={foodInput.calories}
                  onChange={(e) => setFoodInput({ ...foodInput, calories: e.target.value })}
                  className="p-2 rounded bg-slate-600 border border-slate-500 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded bg-green-500 text-black font-bold hover:bg-green-600 transition"
              >
                Log Food
              </button>
            </form>
          )}

          {todayFood.length > 0 ? (
            <div className="space-y-3 animate-slide-in-up stagger-7">
              {todayFood.map((food) => (
                <div key={food.id} className="bg-slate-700 rounded-lg p-4 flex justify-between items-center hover:bg-slate-600 transition">
                  <div>
                    <p className="font-semibold text-white">{food.name}</p>
                    <p className="text-sm text-gray-400">{new Date(food.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div>
                      <p className="text-cyan-400 font-bold">{food.protein}g protein</p>
                      <p className="text-sm text-gray-400">{food.calories || 0} cal</p>
                    </div>
                    <button
                      onClick={() => removeFoodLog(food.id)}
                      className="text-red-400 hover:text-red-300 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8 animate-slide-in-up stagger-7">No food logged yet. Add your first meal!</p>
          )}
        </div>

        {/* Suggestion Banner */}
        {proteinRemaining> 0 && (
          <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-lg p-6 border border-green-700 animate-slide-in-up stagger-8">
            <h2 className="text-xl font-semibold mb-2">🍗 Complete Your Protein Intake?</h2>
            <p className="text-gray-300 mb-4">
              You still need {Math.round(proteinRemaining)}g of protein. Check out our recommended meals tailored to your preferences!
            </p>
            <button
              onClick={() => navigate("/suggestions")}
              className="px-6 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-600 transition"
            >
              View Meal Suggestions
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default LogFood;
