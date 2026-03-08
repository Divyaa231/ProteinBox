// BMI Calculation
export const calculateBMI = (weight, height) => {
  // weight in kg, height in cm
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10;
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-400" };
  if (bmi < 25) return { category: "Normal Weight", color: "text-green-400" };
  if (bmi < 30) return { category: "Overweight", color: "text-yellow-400" };
  return { category: "Obese", color: "text-red-400" };
};

// TDEE (Total Daily Energy Expenditure) Calculation
export const calculateTDEE = (weight, height, age, gender, activityLevel) => {
  // Using Mifflin-St Jeor formula for BMR
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    veryActive: 1.725,
    extreme: 1.9,
  };

  const tdee = bmr * (activityMultipliers[activityLevel] || 1.55);
  return Math.round(tdee);
};

// Macro nutrient requirements
export const calculateMacros = (tdee, goal) => {
  let proteinPercentage = 0.3; // Default 30%
  let carbsPercentage = 0.4; // Default 40%
  let fatsPercentage = 0.3; // Default 30%

  if (goal === "bulking") {
    proteinPercentage = 0.3;
    carbsPercentage = 0.45;
    fatsPercentage = 0.25;
  } else if (goal === "cutting") {
    proteinPercentage = 0.35;
    carbsPercentage = 0.35;
    fatsPercentage = 0.3;
  } else if (goal === "maintenance") {
    proteinPercentage = 0.25;
    carbsPercentage = 0.45;
    fatsPercentage = 0.3;
  }

  return {
    protein: Math.round((tdee * proteinPercentage) / 4), // 1g protein = 4 calories
    carbs: Math.round((tdee * carbsPercentage) / 4), // 1g carbs = 4 calories
    fats: Math.round((tdee * fatsPercentage) / 9), // 1g fat = 9 calories
  };
};

// Ideal protein intake for fitness
export const calculateProteinTarget = (weight, goal) => {
  // grams per kg body weight
  const proteinRatios = {
    maintenance: 1.6,
    bulking: 2.0,
    cutting: 2.2, // Higher to preserve muscle during calorie deficit
  };

  const ratio = proteinRatios[goal] || 1.8;
  return Math.round(weight * ratio);
};

// Calorie deficit/surplus for weight loss/gain
export const calculateWeightChangeCalories = (weightChangeGoal) => {
  // 1 kg = 7700 calories
  // For safe weight loss/gain: 0.5-1 kg per week
  const caloriesPerKg = 7700;
  const caloriesPerWeek = (weightChangeGoal / 7) * caloriesPerKg;
  return Math.round(caloriesPerWeek / 7); // Daily deficit/surplus
};
