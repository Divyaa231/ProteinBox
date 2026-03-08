import { useState } from "react";
import { useUser } from "../context/UserContext";

function Progress() {
  const { user } = useUser();

  if (!user?.onboardingComplete) {
    return <div>Please complete onboarding first</div>;
  }

  const [weeklyData] = useState([
    { day: "Mon", protein: 120, calories: 2350, carbs: 285 },
    { day: "Tue", protein: 135, calories: 2420, carbs: 295 },
    { day: "Wed", protein: 110, calories: 2280, carbs: 270 },
    { day: "Thu", protein: 145, calories: 2480, carbs: 310 },
    { day: "Fri", protein: 155, calories: 2550, carbs: 330 },
    { day: "Sat", protein: 140, calories: 2450, carbs: 305 },
    { day: "Sun", protein: 125, calories: 2350, carbs: 285 },
  ]);

  const avgProtein = Math.round(weeklyData.reduce((sum, d) => sum + d.protein, 0) / weeklyData.length);
  const avgCalories = Math.round(weeklyData.reduce((sum, d) => sum + d.calories, 0) / weeklyData.length);
  const maxProtein = Math.max(...weeklyData.map((d) => d.protein));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 animate-slide-in-up">Your Progress</h1>
        <p className="text-gray-400 mb-8 animate-slide-in-up stagger-1">Track your fitness journey and nutrition trends</p>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-in-up stagger-2">
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Weekly Avg Protein</h2>
          <p className="text-4xl font-bold text-cyan-400">{avgProtein}g</p>
          <p className="text-sm text-gray-400 mt-2">Good consistency!</p>
        </div>

        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Peak Day</h2>
          <p className="text-4xl font-bold text-green-400">{maxProtein}g</p>
          <p className="text-sm text-gray-400 mt-2">Your best intake</p>
        </div>

        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Weekly Avg Calories</h2>
          <p className="text-4xl font-bold text-orange-400">{avgCalories}</p>
          <p className="text-sm text-gray-400 mt-2">Consistent intake</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700 mb-8 animate-slide-in-up stagger-3">
        <h2 className="text-2xl font-semibold mb-6">Weekly Nutrition Tracker</h2>

        {/* Protein Chart */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Protein Intake</h3>
          <div className="flex items-end justify-between h-64 gap-2 mb-4">
            {weeklyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-linear-to-t from-cyan-400 to-cyan-500 rounded-t-lg transition-all hover:from-cyan-500 hover:to-cyan-600"
                  style={{ height: `${(data.protein / 160) * 100}%` }}
                  title={`${data.protein}g`}
                />
                <p className="text-sm text-gray-400 mt-2">{data.day}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0g</span>
            <span>160g+</span>
          </div>
        </div>

        {/* Calories Chart */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-orange-400 mb-4">Calorie Intake</h3>
          <div className="flex items-end justify-between h-64 gap-2 mb-4">
            {weeklyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-linear-to-t from-orange-400 to-orange-500 rounded-t-lg transition-all hover:from-orange-500 hover:to-orange-600"
                  style={{ height: `${(data.calories / 2600) * 100}%` }}
                  title={`${data.calories}`}
                />
                <p className="text-sm text-gray-400 mt-2">{data.day}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0</span>
            <span>2600+</span>
          </div>
        </div>
      </div>

      {/* Daily Breakdown */}
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700 mb-8 animate-slide-in-up stagger-4">
        <h2 className="text-2xl font-semibold mb-6">Daily Breakdown</h2>

        <div className="space-y-4">
          {weeklyData.map((data, idx) => (
            <div key={idx} className="border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition">
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-lg">{data.day}</p>
                <div className="text-right">
                  <p className="text-cyan-400 font-bold">{data.protein}g protein</p>
                  <p className="text-sm text-gray-400">{data.calories} cal</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <div className="w-full h-2 bg-slate-600 rounded-full mb-1 overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: "85%" }} />
                  </div>
                  <span className="text-gray-400">Protein</span>
                </div>
                <div>
                  <div className="w-full h-2 bg-slate-600 rounded-full mb-1 overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: "92%" }} />
                  </div>
                  <span className="text-gray-400">Calories</span>
                </div>
                <div>
                  <div className="w-full h-2 bg-slate-600 rounded-full mb-1 overflow-hidden">
                    <div className="h-full bg-yellow-400" style={{ width: "88%" }} />
                  </div>
                  <span className="text-gray-400">Carbs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in-up stagger-5">
        <div className="bg-blue-900 rounded-lg p-6 border border-blue-700">
          <h3 className="text-lg font-semibold mb-3">📊 Insights</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>✓ You're meeting your protein goals 6/7 days</li>
            <li>✓ Consistent calorie intake across the week</li>
            <li>→ Try to be more consistent on your off-days</li>
            <li>→ Consider meal planning for better results</li>
          </ul>
        </div>

        <div className="bg-purple-900 rounded-lg p-6 border border-purple-700">
          <h3 className="text-lg font-semibold mb-3">🎯 Goal Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Protein Consistency</span>
                <span className="text-sm font-bold">85%</span>
              </div>
              <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-cyan-400 to-cyan-500" style={{ width: "85%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Calorie Goals</span>
                <span className="text-sm font-bold">92%</span>
              </div>
              <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-orange-400 to-orange-500" style={{ width: "92%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}

export default Progress;
