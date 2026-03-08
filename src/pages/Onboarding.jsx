import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { calculateBMI, getBMICategory, calculateTDEE, calculateMacros, calculateProteinTarget } from "../utils/fitnessCalculations";

function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activityLevel: "moderate",
    goal: "maintenance",
    allergies: [],
    preferences: [],
  });

  const [showAllergyInput, setShowAllergyInput] = useState(false);
  const [allergyInput, setAllergyInput] = useState("");
  const [preferenceInput, setPreferenceInput] = useState("");
  const [calculations, setCalculations] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addAllergy = () => {
    if (allergyInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput.trim()],
      }));
      setAllergyInput("");
    }
  };

  const removeAllergy = (index) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index),
    }));
  };

  const addPreference = (pref) => {
    if (!formData.preferences.includes(pref)) {
      setFormData((prev) => ({
        ...prev,
        preferences: [...prev.preferences, pref],
      }));
    }
  };

  const removePreference = (pref) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.filter((p) => p !== pref),
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.age || !formData.weight || !formData.height) {
        alert("Please fill in all basic information");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Calculate metrics
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseFloat(formData.age);

      const bmi = calculateBMI(weight, height);
      const bmiInfo = getBMICategory(bmi);
      const tdee = calculateTDEE(weight, height, age, formData.gender, formData.activityLevel);
      const macros = calculateMacros(tdee, formData.goal);
      const proteinTarget = calculateProteinTarget(weight, formData.goal);

      setCalculations({
        bmi,
        bmiInfo,
        tdee,
        macros,
        proteinTarget,
      });

      setStep(4);
    }
  };

  const handleComplete = () => {
    completeOnboarding({
      ...formData,
      calculations,
    });
    navigate("/suggestions");
  };

  const preferenceOptions = [
    "Chicken",
    "Fish",
    "Paneer",
    "Tofu",
    "Beef",
    "Vegetarian",
    "Vegan",
    "Low Carb",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            <span className="text-gray-400">Step {step} of 4</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold mb-6">Basic Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Age (years)</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="25"
                      className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="75"
                      className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="180"
                      className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Fitness Goals */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold mb-6">Your Fitness Goals</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Activity Level</label>
                  <div className="space-y-3">
                    {[
                      { value: "sedentary", label: "Sedentary - Little or no exercise" },
                      { value: "light", label: "Light - Exercise 1-3 days/week" },
                      { value: "moderate", label: "Moderate - Exercise 3-5 days/week" },
                      { value: "veryActive", label: "Very Active - Exercise 6-7 days/week" },
                      { value: "extreme", label: "Extreme - Training 2x per day" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center p-3 rounded-lg bg-slate-700 cursor-pointer hover:bg-slate-600 transition">
                        <input
                          type="radio"
                          name="activityLevel"
                          value={option.value}
                          checked={formData.activityLevel === option.value}
                          onChange={handleChange}
                          className="w-4 h-4 mr-3"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Primary Goal</label>
                  <div className="space-y-3">
                    {[
                      { value: "cutting", label: "Cutting - Lose fat & get lean" },
                      { value: "maintenance", label: "Maintenance - Stay where I am" },
                      { value: "bulking", label: "Bulking - Gain muscle & strength" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center p-3 rounded-lg bg-slate-700 cursor-pointer hover:bg-slate-600 transition">
                        <input
                          type="radio"
                          name="goal"
                          value={option.value}
                          checked={formData.goal === option.value}
                          onChange={handleChange}
                          className="w-4 h-4 mr-3"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Dietary Preferences */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold mb-6">Dietary Preferences</h3>

              <div className="space-y-6">
                {/* Allergies */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Food Allergies</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={allergyInput}
                      onChange={(e) => setAllergyInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addAllergy()}
                      placeholder="e.g., Peanuts"
                      className="flex-1 p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={addAllergy}
                      className="px-4 py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-600 transition"
                    >
                      Add
                    </button>
                  </div>

                  {formData.allergies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.allergies.map((allergy, idx) => (
                        <span
                          key={idx}
                          className="bg-red-900 text-red-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {allergy}
                          <button
                            type="button"
                            onClick={() => removeAllergy(idx)}
                            className="font-bold cursor-pointer hover:text-red-100"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preferences */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Food Preferences</label>
                  <p className="text-sm text-gray-400 mb-3">Select your preferred protein sources:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {preferenceOptions.map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() =>
                          formData.preferences.includes(pref)
                            ? removePreference(pref)
                            : addPreference(pref)
                        }
                        className={`p-3 rounded-lg font-medium transition ${
                          formData.preferences.includes(pref)
                            ? "bg-green-500 text-black"
                            : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {step === 4 && calculations && (
            <div>
              <h3 className="text-xl font-bold mb-6">Your Personalized Nutrition Plan</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">BMI</p>
                  <p className={`text-2xl font-bold ${calculations.bmiInfo.color}`}>
                    {calculations.bmi}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{calculations.bmiInfo.category}</p>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Daily Calories</p>
                  <p className="text-2xl font-bold text-orange-400">{calculations.tdee}</p>
                  <p className="text-xs text-gray-400 mt-1">TDEE</p>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Daily Protein</p>
                  <p className="text-2xl font-bold text-cyan-400">{calculations.proteinTarget}g</p>
                  <p className="text-xs text-gray-400 mt-1">Your target</p>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Macro Split</p>
                  <div className="space-y-1 mt-2 text-xs">
                    <p><span className="text-cyan-400">P:</span> {calculations.macros.protein}g</p>
                    <p><span className="text-yellow-400">C:</span> {calculations.macros.carbs}g</p>
                    <p><span className="text-red-400">F:</span> {calculations.macros.fats}g</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900 rounded-lg p-4 mb-6 border border-green-700">
                <p className="text-green-200 font-semibold">✓ All set! You're ready to start</p>
                <p className="text-sm text-green-300 mt-1">
                  Your meal suggestions will be customized based on your goals and preferences.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-3 rounded-lg bg-slate-700 font-semibold text-white hover:bg-slate-600 transition"
              >
                Back
              </button>
            )}

            {step < 4 && (
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 font-bold text-black hover:from-green-500 hover:to-green-700 transition"
              >
                Next
              </button>
            )}

            {step === 4 && (
              <button
                onClick={handleComplete}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 font-bold text-black hover:from-green-500 hover:to-green-700 transition"
              >
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
