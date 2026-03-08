import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { calculateBMI, getBMICategory, calculateTDEE, calculateMacros, calculateProteinTarget } from "../utils/fitnessCalculations";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user || {});

  if (!user?.onboardingComplete) {
    return <div>Please complete onboarding first</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <div className="flex justify-between items-center mb-8 animate-slide-in-up">
          <div>
            <h1 className="text-4xl font-bold">{user.name}'s Profile</h1>
            <p className="text-gray-400 mt-2">Email: {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-in-up stagger-1">
          {/* Personal Info */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>

            {editMode ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-green-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-green-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-green-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-green-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-green-400 focus:outline-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setEditMode(false)}
                  className="w-full py-3 rounded-lg bg-green-500 text-black font-bold hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Age</p>
                  <p className="text-xl font-bold">{user.age} years</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Weight</p>
                  <p className="text-xl font-bold">{user.weight} kg</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Height</p>
                  <p className="text-xl font-bold">{user.height} cm</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Gender</p>
                  <p className="text-xl font-bold capitalize">{user.gender}</p>
                </div>

                <button
                  onClick={() => setEditMode(true)}
                  className="w-full py-3 rounded-lg bg-blue-500 text-black font-bold hover:bg-blue-600 transition"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Fitness Goals */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold mb-6">Fitness Goals</h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Primary Goal</p>
                <p className="text-xl font-bold capitalize text-green-400">{user.goal}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Activity Level</p>
                <p className="text-xl font-bold capitalize text-blue-400">{user.activityLevel}</p>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <p className="text-gray-300 text-sm mb-2">Health Status:</p>
                <div className="space-y-2">
                  <div className={`text-lg font-bold ${user.calculations?.bmiInfo.color}`}>
                    BMI: {user.calculations?.bmi}
                  </div>
                  <p className="text-gray-400 text-sm">{user.calculations?.bmiInfo.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-in-up stagger-2">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Daily Calories</h3>
            <p className="text-4xl font-bold text-orange-400">{user.calculations?.tdee}</p>
            <p className="text-sm text-gray-400 mt-2">TDEE (Total Daily Energy Expenditure)</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Daily Protein Target</h3>
            <p className="text-4xl font-bold text-cyan-400">{user.calculations?.proteinTarget}g</p>
            <p className="text-sm text-gray-400 mt-2">Based on your body weight</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Calorie Adjustment</h3>
            <div className="space-y-2 text-sm">
              {user.goal === "cutting" && <p className="text-red-400 font-bold">-300-500 kcal deficit</p>}
              {user.goal === "maintenance" && <p className="text-yellow-400 font-bold">Maintenance level</p>}
              {user.goal === "bulking" && <p className="text-green-400 font-bold">+300-500 kcal surplus</p>}
              <p className="text-gray-400">Adjust based on your goal</p>
            </div>
          </div>
        </div>

        {/* Macro Breakdown */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700 mb-8 animate-slide-in-up stagger-3">
          <h2 className="text-2xl font-semibold mb-6">Daily Macro Targets</h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <p className="text-cyan-400 text-5xl font-bold mb-2">{user.calculations?.macros?.protein}g</p>
              <p className="text-gray-400">Protein</p>
              <p className="text-sm text-gray-500 mt-2">(4 cal/g)</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <p className="text-yellow-400 text-5xl font-bold mb-2">{user.calculations?.macros?.carbs}g</p>
              <p className="text-gray-400">Carbohydrates</p>
              <p className="text-sm text-gray-500 mt-2">(4 cal/g)</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <p className="text-red-400 text-5xl font-bold mb-2">{user.calculations?.macros?.fats}g</p>
              <p className="text-gray-400">Fats</p>
              <p className="text-sm text-gray-500 mt-2">(9 cal/g)</p>
            </div>
          </div>
        </div>

        {/* Preferences & Allergies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in-up stagger-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold mb-6">Dietary Preferences</h2>
            {user.preferences && user.preferences.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {user.preferences.map((pref) => (
                  <span key={pref} className="bg-green-900 text-green-200 px-4 py-2 rounded-full text-sm font-medium">
                    {pref}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No preferences set</p>
            )}
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold mb-6">Food Allergies</h2>
            {user.allergies && user.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {user.allergies.map((allergy) => (
                  <span key={allergy} className="bg-red-900 text-red-200 px-4 py-2 rounded-full text-sm font-medium">
                    {allergy}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No allergies recorded</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
