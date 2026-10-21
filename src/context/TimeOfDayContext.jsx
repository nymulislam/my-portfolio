import { createContext, useContext, useEffect, useState, useMemo } from "react";

const TimeOfDayContext = createContext();

export const TimeOfDayProvider = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio_time_mood");
      if (stored) return stored;
    }
    return "evening"; // Matching user screenshot default
  });

  const getSystemPeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  };

  const activePeriod = useMemo(() => {
    if (selectedMood === "auto") {
      return getSystemPeriod();
    }
    return selectedMood;
  }, [selectedMood]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("mood-morning", "mood-afternoon", "mood-evening", "mood-night", "dark");
    root.classList.add(`mood-${activePeriod}`);

    if (activePeriod === "night") {
      root.classList.add("dark");
    }

    try {
      localStorage.setItem("portfolio_time_mood", selectedMood);
    } catch {
      // ignore in sandboxed environments
    }
  }, [activePeriod, selectedMood]);

  return (
    <TimeOfDayContext.Provider
      value={{
        selectedMood,
        setSelectedMood,
        activePeriod,
      }}
    >
      {children}
    </TimeOfDayContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTimeOfDay = () => {
  const context = useContext(TimeOfDayContext);
  if (!context) {
    throw new Error("useTimeOfDay must be used within a TimeOfDayProvider");
  }
  return context;
};
