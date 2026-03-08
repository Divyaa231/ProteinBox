import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: "Grilled Chicken Protein Box",
      restaurant: "FreshBox Kitchen",
      price: 299,
      protein: 64,
      calories: 480,
      carbs: 38,
      createdBy: "system",
    },
    {
      id: 2,
      name: "Paneer Power Bowl",
      restaurant: "FitMeals Hub",
      price: 249,
      protein: 48,
      calories: 420,
      carbs: 32,
      createdBy: "system",
    },
  ]);

  const [foodLog, setFoodLog] = useState([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedMeals = localStorage.getItem("meals");
    const savedFoodLog = localStorage.getItem("foodLog");

    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }

    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    }

    if (savedFoodLog) {
      setFoodLog(JSON.parse(savedFoodLog));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Save meals to localStorage
  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  // Save food log to localStorage
  useEffect(() => {
    localStorage.setItem("foodLog", JSON.stringify(foodLog));
  }, [foodLog]);

  const login = (email, password) => {
    // Mock authentication - in real app, verify with backend
    if (email && password) {
      const userData = {
        email,
        loginTime: new Date(),
      };
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const completeOnboarding = (profileData) => {
    const userData = {
      ...user,
      ...profileData,
      onboardingComplete: true,
      createdAt: new Date(),
    };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    setFoodLog([]);
  };

  const addCustomMeal = (mealData) => {
    const newMeal = {
      ...mealData,
      id: Math.max(...meals.map((m) => m.id), 0) + 1,
      createdBy: user?.email || "user",
      createdAt: new Date(),
    };
    setMeals([...meals, newMeal]);
    return newMeal;
  };

  const deleteMeal = (mealId) => {
    setMeals(meals.filter((m) => m.id !== mealId));
  };

  const addToFoodLog = (foodItem) => {
    const logEntry = {
      ...foodItem,
      id: Math.max(...foodLog.map((f) => f.id || 0), 0) + 1,
      date: new Date().toISOString().split("T")[0],
      timestamp: new Date(),
    };
    setFoodLog([...foodLog, logEntry]);
  };

  const removeFoodLog = (logId) => {
    setFoodLog(foodLog.filter((f) => f.id !== logId));
  };

  const getTodayFoodLog = () => {
    const today = new Date().toISOString().split("T")[0];
    return foodLog.filter((f) => f.date === today);
  };

  const getTodayProteinConsumed = () => {
    return getTodayFoodLog().reduce((sum, f) => sum + (f.protein || 0), 0);
  };

  const getMealsByPreferences = () => {
    if (!user?.preferences || user.preferences.length === 0) {
      return meals;
    }

    return meals.filter((meal) => {
      const hasAllergy = user.allergies?.some((allergy) =>
        meal.name.toLowerCase().includes(allergy.toLowerCase())
      );

      if (hasAllergy) return false;

      return user.preferences.some((pref) =>
        meal.name.toLowerCase().includes(pref.toLowerCase())
      );
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        meals,
        foodLog,
        login,
        completeOnboarding,
        logout,
        addCustomMeal,
        deleteMeal,
        addToFoodLog,
        removeFoodLog,
        getTodayFoodLog,
        getTodayProteinConsumed,
        getMealsByPreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
