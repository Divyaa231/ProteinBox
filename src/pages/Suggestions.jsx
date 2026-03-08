import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";

function Suggestions() {
  const navigate = useNavigate();
  const { user, getMealsByPreferences, getTodayProteinConsumed, addCustomMeal, addToFoodLog } = useUser();
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [mealForm, setMealForm] = useState({
    name: "",
    restaurant: "",
    price: "",
    protein: "",
    calories: "",
    carbs: "",
  });

  if (!user?.onboardingComplete) {
    return <div>Please complete onboarding first</div>;
  }

  const proteinTarget = user.calculations?.proteinTarget || 120;
  const consumedToday = getTodayProteinConsumed();
  const proteinNeeded = proteinTarget - consumedToday;

  const relevantMeals = getMealsByPreferences();

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (mealForm.name && mealForm.protein && mealForm.price) {
      addCustomMeal({
        name: mealForm.name,
        restaurant: mealForm.restaurant || "Custom",
        price: parseFloat(mealForm.price),
        protein: parseFloat(mealForm.protein),
        calories: parseFloat(mealForm.calories) || 0,
        carbs: parseFloat(mealForm.carbs) || 0,
      });
      setMealForm({
        name: "",
        restaurant: "",
        price: "",
        protein: "",
        calories: "",
        carbs: "",
      });
      setShowAddMeal(false);
    }
  };

  const handleOrder = (meal) => {
    addToFoodLog({
      name: meal.name,
      protein: meal.protein,
      calories: meal.calories,
      meal: meal.name,
    });
    navigate("/order-confirmation");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 animate-slide-in-up">Smart Protein Suggestions</h1>
        <p className="text-gray-400 mb-8 animate-slide-in-up stagger-1">Personalized recommendations based on your nutrition goals & preferences</p>

        {/* Protein Needed Banner */}
        <div className="bg-gradient-to-r from-green-900 to-green-950 rounded-lg p-6 border border-green-700 mb-8 animate-slide-in-up stagger-2">
          <p className="text-gray-300 mb-2">You still need today:</p>
          <p className="text-4xl font-extrabold text-green-400">{Math.round(proteinNeeded)}g Protein</p>
          <p className="text-gray-400 text-sm mt-2">
            Based on your {user.goal} goal • Preferences: {user.preferences?.join(", ") || "No preferences set"}
          </p>
        </div>

        {/* Add Custom Meal Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 mb-8 animate-slide-in-up stagger-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Available Meals</h2>
            <button
              onClick={() => setShowAddMeal(!showAddMeal)}
              className="px-4 py-2 rounded-lg bg-blue-500 text-black font-semibold hover:bg-blue-600 transition"
            >
              + Add Custom Meal
            </button>
          </div>

          {showAddMeal && (
            <form onSubmit={handleAddMeal} className="bg-slate-700 rounded-lg p-6 mb-6 border border-slate-600 animate-slide-in-up stagger-4">
              <h3 className="text-lg font-bold mb-4">Add Your Own Meal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Meal name *"
                  value={mealForm.name}
                  onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                  className="p-3 rounded bg-slate-600 border border-slate-500 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Restaurant/Source"
                  value={mealForm.restaurant}
                  onChange={(e) => setMealForm({ ...mealForm, restaurant: e.target.value })}
                  className="p-3 rounded bg-slate-600 border border-slate-500 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Price (₹) *"
                  value={mealForm.price}
                  onChange={(e) => setMealForm({ ...mealForm, price: e.target.value })}
                  className="p-3 rounded bg-slate-600 border border-slate-500 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Protein (g) *"
                  value={mealForm.protein}
                  onChange={(e) => setMealForm({ ...mealForm, protein: e.target.value })}
                  className="p-3 rounded bg-slate-600 border border-slate-500 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Calories"
                  value={mealForm.calories}
                  onChange={(e) => setMealForm({ ...mealForm, calories: e.target.value })}
                  className="p-3 rounded bg-slate-600 border border-slate-500 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Carbs (g)"
                  value={mealForm.carbs}
                  onChange={(e) => setMealForm({ ...mealForm, carbs: e.target.value })}
                  className="p-3 rounded bg-slate-600 border border-slate-500 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-500 text-black font-bold hover:bg-blue-600 transition"
              >
                Add Meal to Database
              </button>
            </form>
          )}
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-in-up stagger-5">
          {relevantMeals.map((meal) => {
            const mealServings = Math.ceil(proteinNeeded / meal.protein);
            const totalPrice = meal.price * mealServings;
            const totalProtein = meal.protein * mealServings;

            return (
              <div
                key={meal.id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 overflow-hidden hover:border-green-500 transition transform hover:scale-105"
              >
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-slate-700 to-slate-800">
                  <h2 className="font-bold text-lg mb-2">{meal.name}</h2>
                  <p className="text-sm text-gray-400">{meal.restaurant}</p>
                  {meal.createdBy !== "system" && (
                    <p className="text-xs text-blue-400 mt-1">⭐ Custom Meal by {meal.createdBy}</p>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Macro Info */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-slate-700 rounded-lg p-4">
                      <p className="text-cyan-400 font-bold text-2xl">{meal.protein}g</p>
                      <p className="text-xs text-gray-400 mt-1">Protein</p>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <p className="text-orange-400 font-bold text-2xl">{meal.calories}</p>
                      <p className="text-xs text-gray-400 mt-1">Calories</p>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <p className="text-yellow-400 font-bold text-2xl">{meal.carbs}g</p>
                      <p className="text-xs text-gray-400 mt-1">Carbs</p>
                    </div>
                  </div>

                  {/* Recommended Servings */}
                  <div className="bg-slate-700 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-400 mb-2">Recommended for you:</p>
                    <p className="text-xl font-bold text-green-400">{mealServings}x serving{mealServings > 1 ? "s" : ""}</p>
                    <p className="text-sm text-gray-400 mt-1">= {totalProtein}g protein</p>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-700">
                    <span className="text-gray-400">Total Price:</span>
                    <span className="text-green-400 font-bold text-xl">₹{totalPrice}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleOrder(meal)}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 font-bold text-black hover:from-green-500 hover:to-green-700 transition"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {relevantMeals.length === 0 && (
          <div className="text-center py-12 animate-slide-in-up stagger-5">
            <p className="text-gray-400 mb-4">No meals match your preferences and allergies</p>
            <button
              onClick={() => setShowAddMeal(true)}
              className="px-6 py-3 rounded-lg bg-blue-500 text-black font-bold hover:bg-blue-600 transition"
            >
              Add a Custom Meal
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in-up stagger-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-3">💡 Your Preferences</h3>
            <div className="space-y-2">
              <div>
                <p className="text-gray-400 text-sm">Preferred proteins:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.preferences?.length > 0 ? (
                    user.preferences.map((pref) => (
                      <span key={pref} className="bg-green-900 text-green-200 px-3 py-1 rounded-full text-sm">
                        {pref}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No preferences set</span>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-400 text-sm">Allergies to avoid:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.allergies?.length > 0 ? (
                    user.allergies.map((allergy) => (
                      <span key={allergy} className="bg-red-900 text-red-200 px-3 py-1 rounded-full text-sm">
                        {allergy}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No allergies recorded</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-3">🎯 Protein Goals</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Target:</span>
                <span className="font-bold">{proteinTarget}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Already Consumed:</span>
                <span className="font-bold text-cyan-400">{Math.round(consumedToday)}g</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700">
                <span className="text-gray-300">Still Needed:</span>
                <span className="font-bold text-green-400">{Math.round(proteinNeeded)}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center mt-8 animate-slide-in-up stagger-7">
        <button
          onClick={() => navigate("/logfood")}
          className="px-8 py-4 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition text-lg"
        >
          Continue to Log Food →
        </button>
      </div>
    </main>
  );
}

export default Suggestions;
